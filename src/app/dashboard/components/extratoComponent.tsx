import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import EditarTransacaoModal from "./modaleditarComponent";
import ExcluirTransacaoModal from "./modalexcluirComponent";
import { Extrato } from "@/app/classes/Extrato";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TransacaoData {
  idTransacao: string;
  tipoTransacao: string;
  valor: number;
  data: string;
  hora: string;
  status: string;
}

const ExtratoComponent = () => {
  const [transacoes, setTransacoes] = useState<TransacaoData[]>([]);
  const [mesVigente, setMesVigente] = useState("");
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [extrato, setExtrato] = useState<Extrato | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setExtrato(new Extrato(user.uid));
    }
  }, []);

  useEffect(() => {
    async function fetchTransacoes() {
      if (extrato) {
        try {
          const transacoesData = await extrato.buscarExtrato();
          setTransacoes(transacoesData);
          setMesVigente(extrato.getMesVigente(transacoesData));
        } catch (error) {
          console.error("Erro ao buscar transações:", error);
          setTransacoes([]);
          setMesVigente("");
        }
      }
    }
    fetchTransacoes();
  }, [extrato]);

  const { entradas, saidas } = extrato ? extrato.calcularEntradaseSaidas(transacoes) : { entradas: 0, saidas: 0 };

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "R$",
        data: [entradas, saidas],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  const abrirModalEditar = () => setModalEditarAberto(true);
  const fecharModalEditar = () => setModalEditarAberto(false);

  const abrirModalExcluir = () => setModalExcluirAberto(true);
  const fecharModalExcluir = () => setModalExcluirAberto(false);

  return (
    <div className="extrato-card">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-12">
            <h5>Extrato</h5>
          </div>
          <div className="col-md-2 col-sm-12 text-end">
            <ul>
              <li>
                <span className="extrato-editar-icone" onClick={abrirModalEditar}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
              </li>
              <li>
                <span className="extrato-excluir-icone" onClick={abrirModalExcluir}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="extrato-item">
              <div className="extrato-header">Últimos 30 dias</div>
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="extrato-item">
              <div className="row">
              <div className="extrato-header">Últimas Transações</div>
              {transacoes.length > 0 ? (
                transacoes.map((transacao) => (
                  <div key={transacao.idTransacao} className="extrato-transacao row">
                    <div className="col-md-6 col-sm-12">
                      <div className="extrato-mes">{mesVigente}</div>
                      <div className="extrato-data">{`${transacao.data} - ${transacao.hora}`}</div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div
                        className={`extrato-valor ${
                          transacao.tipoTransacao === "deposito" ? "positivo" : "negativo"
                        }`}
                      >
                        R$ {transacao.valor.toFixed(2)}
                      </div>
                      <div className={`extrato-tipo-${transacao.tipoTransacao.toLowerCase()}`}>
                        {transacao.tipoTransacao}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p>Nenhuma transação encontrada.</p>
                </div>
              )}
              </div>
              </div>
          </div>
        </div>
        {modalEditarAberto && (<EditarTransacaoModal isOpen={modalEditarAberto} onClose={fecharModalEditar} />)}

      {modalExcluirAberto && (<ExcluirTransacaoModal isOpen={modalExcluirAberto} onClose={fecharModalExcluir} />)}
      </div>
    </div>
  );
};

export default ExtratoComponent;

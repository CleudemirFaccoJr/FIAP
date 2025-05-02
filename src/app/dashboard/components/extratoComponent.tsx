import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import EditarTransacaoModal from "./modaleditarComponent";
import ExcluirTransacaoModal from "./modalexcluirComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transacao {
  hora: string;
  data: string;
  valor?: number;
  tipo?: string;
  tipoTransacao?: string;
}

const calcularEntradaseSaidas = (
  transacoes: { data: string; valor?: number; tipo?: string }[]
) => {
  const hoje = new Date();
  const trintaDiasAtras = new Date(hoje);
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  let entradas = 0;
  let saidas = 0;

  transacoes.forEach((transacao) => {
    const [dia, mes, ano] = transacao.data.split("/");
    const dataTransacao = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10)
    );

    if (dataTransacao >= trintaDiasAtras && dataTransacao <= hoje) {
      if (transacao.tipo === "deposito") {
        entradas += transacao.valor ?? 0;
      } else if (transacao.tipo === "transferencia") {
        saidas += transacao.valor ?? 0;
      }
    }
  });

  return { entradas, saidas };
};

const ExtratoComponent = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [mesVigente, setMesVigente] = useState("");
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const { entradas, saidas } = calcularEntradaseSaidas(transacoes);

  const mesesPorExtenso = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

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

  const fetchTransacoes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      const db = getDatabase();
      const transacoesRef = ref(db, `transacoes`);
  
      try {
        const snapshot = await get(transacoesRef);
  
        if (snapshot.exists()) {
          const data = snapshot.val();
          const transacoesArray: Transacao[] = [];
          let mesVigenteEncontrado: string | null = null;
  
          Object.values(data).forEach((dias) => {
            Object.values(dias as Record<string, any>).forEach(
              (usuarios: Record<string, any>) => {
                if (usuarios && usuarios[userId]) {
                  Object.values(
                    usuarios[userId] as Record<string, any>
                  ).forEach((transacao: any) => {
                    // Filtrar transações por status "Ativa" ou "Editada"
                    if (
                      transacao.status === "Ativa" ||
                      transacao.status === "Editada"
                    ) {
                      // Ajustar o formato da data
                      if (transacao.data && transacao.data.includes("-")) {
                        const [dia, mes, ano] = transacao.data.split("-");
                        transacao.data = `${dia}/${mes}/${ano}`;
                      }
  
                      transacoesArray.push({
                        ...transacao,
                        tipo: transacao.tipoTransacao,
                      });
  
                      // Determinar o mês vigente
                      if (mesVigenteEncontrado === null && transacao.data) {
                        const [, mes] = transacao.data.split("/");
                        const numeroMes = parseInt(mes, 10);
                        if (!isNaN(numeroMes) && mesesPorExtenso[numeroMes - 1]) {
                          mesVigenteEncontrado = mesesPorExtenso[numeroMes - 1];
                          setMesVigente(mesVigenteEncontrado);
                        }
                      }
                    }
                  });
                }
              }
            );
          });
  
          setTransacoes(transacoesArray);
        } else {
          setTransacoes([]);
          setMesVigente("");
        }
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    } else {
      setTransacoes([]);
      setMesVigente("");
    }
  };
  

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const userId = getAuth().currentUser?.uid;

    if (!userId) {
        console.error("Usuário não autenticado ou ID ausente.");
    }


  const abrirModalEditar = () => setModalEditarAberto(true);
  const fecharModalEditar = () => setModalEditarAberto(false);

  const abrirModalExcluir = () => {
    console.log("Botão de excluir clicado!");
    setModalExcluirAberto(true);
  };
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
                <span className="extrato-editar-icone" onClick={abrirModalEditar}><FontAwesomeIcon icon={faPenToSquare} /></span>
              </li>
              <li>
                <span className="extrato-excluir-icone" onClick={abrirModalExcluir}><FontAwesomeIcon icon={faTrashCan} /></span>
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
                  transacoes.map((transacao, index) => (
                    <div key={index} className="extrato-transacao">
                      <div className="col-md-6 col-sm-12">
                        <div className="extrato-mes">{mesVigente}</div>
                        <div className="extrato-data">{`${transacao.data} - ${transacao.hora}`}</div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div
                          className={`extrato-valor ${
                            transacao.tipo === "deposito"
                              ? "positivo"
                              : "negativo"
                          }`}
                        >
                          R$ {(transacao.valor ?? 0).toFixed(2)}
                        </div>
                        <div
                          className={`extrato-tipo-${(
                            transacao.tipo ?? ""
                          ).toLowerCase()}`}
                        >
                          {transacao.tipo ?? "N/A"}
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
      </div>

      {modalEditarAberto && (
        <EditarTransacaoModal isOpen={modalEditarAberto} onClose={fecharModalEditar} />
      )}

      {modalExcluirAberto && (
        <ExcluirTransacaoModal isOpen={modalExcluirAberto} onClose={fecharModalExcluir} />
      )}
    </div>
  );
};

export default ExtratoComponent;
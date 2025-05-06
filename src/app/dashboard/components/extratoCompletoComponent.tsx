import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";
import { Extrato } from "@/app/classes/Extrato";

interface TransacaoData {
  idTransacao: string;
  tipoTransacao: string;
  valor: number;
  data: string;
  hora: string;
  status: string;
}

const ExtratoCompletoComponent = () => {
  const [transacoes, setTransacoes] = useState<{ transacao: TransacaoData; mes: string }[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
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
          const transacoesData = await extrato.buscarExtratoCompleto();
          setTransacoes(transacoesData);
        } catch (error) {
          console.error("Erro ao buscar transações:", error);
          setTransacoes([]);
        }
      }
    }
    fetchTransacoes();
  }, [extrato]);

  const handleMesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesSelecionado(event.target.value);
  };

  const transacoesFiltradas = mesSelecionado
    ? transacoes.filter((t) => t.mes === mesSelecionado)
    : transacoes;

  const depositos = transacoesFiltradas.filter(
    (t) => t.transacao.tipoTransacao === "deposito"
  );

  const transferencias = transacoesFiltradas.filter(
    (t) => t.transacao.tipoTransacao === "transferencia"
  );
  

  return (
    <div className="container">
      <div className="row align-items-center mb-4">
        <div className="col-md-8 saldo-header">
          <h4>Extrato Completo</h4>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={mesSelecionado} onChange={handleMesChange}>
            <option value="">Todos os meses</option>
            {[...new Set(transacoes.map((t) => t.mes))].map((mes) => (
              <option key={mes} value={mes}>
                {extrato ? extrato.formatarMesAno(mes) : mes}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5>Depósitos</h5>
            </div>
            <div className="card-body">
              {depositos.length === 0 ? (
                <p>Nenhum depósito encontrado.</p>
              ) : (
                depositos.map((t, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between textos-transacao">
                      <div>
                        <p><strong>Dia:</strong> {t.transacao.data}</p>
                        <p><strong>Hora:</strong> {t.transacao.hora}</p>
                        <p><strong>Status:</strong> {t.transacao.status}</p>
                      </div>
                      <div className="valor-transacao">
                        <p>R$ {t.transacao.valor.toFixed(2)}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h5>Transferências</h5>
            </div>
            <div className="card-body">
              {transferencias.length === 0 ? (
                <p>Nenhuma transferência encontrada.</p>
              ) : (
                transferencias.map((t, index) => (
                  <div key={index} className={`mb-3 ${t.transacao.status === "excluida" ? "transacao-excluida" : ""}`}>
                    <div className="d-flex justify-content-between textos-transacao">
                      <div>
                        <p><strong>Dia:</strong> {t.transacao.data}</p>
                        <p><strong>Hora:</strong> {t.transacao.hora}</p>
                        <p><strong>Status:</strong> {t.transacao.status}</p>
                      </div>
                      <div className="valor-transacao">
                        <p>R$ {t.transacao.valor.toFixed(2)}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtratoCompletoComponent;
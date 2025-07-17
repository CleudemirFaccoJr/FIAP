import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";
import { Extrato } from "@/app/classes/Extrato";
import { faArrowDown, faArrowUp, faPiggyBank, faMoneyBillTrendUp, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
  const [extrato, setExtrato] = useState<Extrato | null>(null);

  // Filtros
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [filtroValorMin, setFiltroValorMin] = useState("");
  const [filtroValorMax, setFiltroValorMax] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [buscaTexto, setBuscaTexto] = useState("");

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

  // 🔍 Aplicação dos filtros
  const transacoesFiltradas = transacoes
    .filter((t) => !mesSelecionado || t.mes === mesSelecionado)
    .filter((t) => !filtroTipo || t.transacao.tipoTransacao === filtroTipo)
    .filter((t) => !filtroStatus || t.transacao.status === filtroStatus)
    .filter((t) => {
      if (!filtroDataInicio && !filtroDataFim) return true;
      const data = new Date(t.transacao.data.split("/").reverse().join("-"));
      const inicio = filtroDataInicio ? new Date(filtroDataInicio) : null;
      const fim = filtroDataFim ? new Date(filtroDataFim) : null;
      return (!inicio || data >= inicio) && (!fim || data <= fim);
    })
    .filter((t) => {
      const valor = t.transacao.valor;
      const min = filtroValorMin ? parseFloat(filtroValorMin) : null;
      const max = filtroValorMax ? parseFloat(filtroValorMax) : null;
      return (!min || valor >= min) && (!max || valor <= max);
    })
    .filter((t) => {
      if (!buscaTexto) return true;
      const texto = buscaTexto.toLowerCase();
      return (
        t.transacao.tipoTransacao.toLowerCase().includes(texto) ||
        t.transacao.status.toLowerCase().includes(texto) ||
        t.transacao.data.includes(texto) ||
        t.transacao.hora.includes(texto)
      );
    });

  return (
    <div className="container extratoCompletoContainer">
      <div className="row align-items-center mb-4">
        <div className="col-md-12 saldo-header">
          <h4>Extrato Completo</h4>
        </div>
      </div>

      {/* Filtros avançados */}
      <div className="row mb-3">
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

      <div className="row mb-3 g-2">
        <div className="col-md-3">
          <input type="date" className="form-control" value={filtroDataInicio} onChange={(e) => setFiltroDataInicio(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" value={filtroDataFim} onChange={(e) => setFiltroDataFim(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Valor mínimo" value={filtroValorMin} onChange={(e) => setFiltroValorMin(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Valor máximo" value={filtroValorMax} onChange={(e) => setFiltroValorMax(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Buscar..." value={buscaTexto} onChange={(e) => setBuscaTexto(e.target.value)} />
        </div>
      </div>

      <div className="row mb-4 g-2">
        <div className="col-md-3">
          <select className="form-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos os tipos</option>
            <option value="deposito">Depósito</option>
            <option value="transferencia">Transferência</option>
            <option value="investimentos">Investimentos</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="ativa">Ativo</option>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
            <option value="excluida">Excluída</option>
          </select>
        </div>
      </div>

      {/* Transações */}
      <div className="row">
        <div className="col-md-12 mb-3">
          <ul className="transacoes-lista">
            {transacoesFiltradas.length === 0 ? (
              <li className="transacao-item">
                <div className="info">Nenhuma transação encontrada.</div>
              </li>
            ) : (
              transacoesFiltradas.map(({ transacao }, index) => (
                <li className="transacao-item" key={index}>
                  <div className="icone-tipo">
                  {transacao.tipoTransacao === "deposito" && <FontAwesomeIcon icon={faPiggyBank} color="#2ecc71" />}
                  {transacao.tipoTransacao === "transferencia" && <FontAwesomeIcon icon={faMoneyBillTransfer} color="#ff5031" />}
                  {transacao.tipoTransacao === "investimento" && <FontAwesomeIcon icon={faMoneyBillTrendUp} color="#2563eb" />}                  
                </div>

                  <div className="info">
                    <strong>
                      {transacao.tipoTransacao === "deposito" ? "Depósito" : transacao.tipoTransacao === "transferencia" ? "Transferência" : transacao.tipoTransacao === "investimento" ? "Investimento" : "Outro"}
                    </strong>
                    <span>
                      {transacao.descricao && transacao.descricao.trim() !== ""  ? transacao.descricao  : "Não possui descrição"}
                    </span>
                  </div>

                  <div className="data">
                    {transacao.data}
                    <br />
                    <small>{transacao.hora}</small>
                  </div>

                  <div className={`valor ${transacao.tipoTransacao}`}>
                    R$ {transacao.valor.toFixed(2)}
                  </div>

                  <div className={`status ${transacao.status.toLowerCase()}`}>
                    {transacao.status.toUpperCase()}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ExtratoCompletoComponent;
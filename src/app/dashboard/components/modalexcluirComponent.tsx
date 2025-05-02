import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { get, getDatabase, ref, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";

registerLocale("pt-BR", ptBR);

interface Transacao {
  idTransacao: string;
  valor?: number;
  tipoTransacao?: string;
  data: string;
  hora: string;
}

interface ExcluirTransacaoModalProps {
  onClose: () => void;
}

const ExcluirTransacaoModal: React.FC<ExcluirTransacaoModalProps> = ({
  onClose,
}) => {
  const [userIdAtual, setUserIdAtual] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date());
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | null>(null);
  const [mesSelecionado, setMesSelecionado] = useState<Date | null>(new Date());

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserIdAtual(user.uid);
    } else {
      console.error("Usuário não autenticado.");
    }
  }, []);

  useEffect(() => {
    const carregarTransacoes = async () => {
      if (!userIdAtual || !mesSelecionado) return;
  
      const db = getDatabase();
      const mesAnoFormatado = format(mesSelecionado, "MM-yyyy");
      const transacoesRef = ref(db, `transacoes/${mesAnoFormatado}`);
      const transacoesDoMes: Transacao[] = [];
  
      try {
        const snapshot = await get(transacoesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
  
          Object.entries(data).forEach(([_, diasTransacao]) => {
            if ((diasTransacao as Record<string, any>)[userIdAtual]) {
              const transacoesUsuario = (diasTransacao as Record<string, any>)[userIdAtual];
              Object.values(transacoesUsuario).forEach((transacao: any) => {
                // Filtrar apenas transações com status "Ativa" ou "Editada"
                if (transacao.status === "Ativa" || transacao.status === "Editada") {
                  transacoesDoMes.push(transacao as Transacao);
                }
              });
            }
          });
          setTransacoes(transacoesDoMes);
        } else {
          setTransacoes([]);
        }
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };
  
    carregarTransacoes();
  }, [userIdAtual, mesSelecionado]);
  

  const deletarTransacao = async () => {
    if (!userIdAtual || !transacaoSelecionada || !mesSelecionado) {
      console.error("Usuário não autenticado ou nenhuma transação selecionada.");
      return;
    }
  
    const db = getDatabase();
    const mesAnoFormatado = format(mesSelecionado, "MM-yyyy");
    const dataDia = transacaoSelecionada.data;
    const transacaoRef = ref(
      db,
      `transacoes/${mesAnoFormatado}/${dataDia}/${userIdAtual}/${transacaoSelecionada.idTransacao}`
    );
    const saldoRef = ref(db, `contas/${userIdAtual}/saldo/saldo`);
  
    try {
      // Alterar o status da transação para "Excluída"
      console.log("Atualizando status para 'Excluída':", transacaoRef.toString());
      await update(transacaoRef, { status: "Excluída" });
      console.log("Status atualizado com sucesso.");
  
      // Recalcular saldo apenas se a transação foi marcada como excluída
      const snapshot = await get(saldoRef);
      let saldoAtual = snapshot.exists() ? snapshot.val() : 0;
  
      if (isNaN(saldoAtual)) {
        console.error("Saldo atual inválido:", saldoAtual);
        saldoAtual = 0; // Valor padrão
      }
  
      let valorTransacao = transacaoSelecionada.valor || 0;
      if (isNaN(valorTransacao)) {
        console.error("Valor da transação inválido:", valorTransacao);
        valorTransacao = 0; // Valor padrão
      }
  
      // Ajuste do saldo com base no tipo de transação
      if (transacaoSelecionada.tipoTransacao === "deposito") {
        saldoAtual -= valorTransacao; // Subtrair do saldo
      } else if (transacaoSelecionada.tipoTransacao === "transferencia") {
        saldoAtual += valorTransacao; // Somar ao saldo
      }
  
      // Atualizar saldo no banco de dados
      await set(saldoRef, saldoAtual);
      console.log("Saldo atualizado:", saldoAtual);
  
      // Notificar componente pai sobre a alteração
      onClose();
      alert("Transação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status da transação ou saldo:", error);
    }
  };
  

  const handleMesChange = (date: Date | null) => {
    setMesSelecionado(date);
    setDataSelecionada(date);
    setTransacaoSelecionada(null);
  };

  const handleTransactionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const transacao = transacoes.find((t) => t.idTransacao === selectedId);
    setTransacaoSelecionada(transacao || null);
  };

  const legendaMesAno = mesSelecionado ? format(mesSelecionado, "MM/yyyy") : "Selecione o Mês";

  return (
    <div className="modal-overlay">
      <div className="conteudoModal">
        <h3>Excluir Transação</h3>
        <div className="mb-3">
          <label className="form-label">Selecione o Mês:</label>
          <div className="input-group">
            <DatePicker
              selected={dataSelecionada}
              onChange={handleMesChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              locale="pt-BR"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Selecionar Transação -{" "}
            <span className="badge text-bg-primary">({legendaMesAno})</span>
          </label>
          <select
            className="form-control"
            value={transacaoSelecionada?.idTransacao || ""}
            onChange={handleTransactionSelect}
            disabled={!mesSelecionado || transacoes.length === 0}
          >
            <option value="" disabled>
              Selecione uma transação
            </option>
            {transacoes.map((transacao) => (
              <option key={transacao.idTransacao} value={transacao.idTransacao}>
                R$ {transacao.valor?.toFixed(2)} ({transacao.tipoTransacao} - {transacao.data})
              </option>
            ))}
          </select>
          {transacoes.length === 0 && mesSelecionado && (
            <small className="form-text text-muted">
              Nenhuma transação encontrada para este mês.
            </small>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="botaoCancelar">
            Cancelar
          </button>
          <button
            className="botaoSalvar"
            onClick={deletarTransacao}
            disabled={!transacaoSelecionada}
          >
            Excluir Transação
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcluirTransacaoModal;

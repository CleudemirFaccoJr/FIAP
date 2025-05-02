import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { get, getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";

registerLocale("pt-BR", ptBR);

interface Transacao {
  valor?: number;
  tipoTransacao?: string;
  data: string;
  hora: string;
  idTransacao: string;
  historico?: Array<{
    dataModificacao: string;
    campoModificado: string;
    valorAnterior: any;
    valorAtualizado: any;
  }>;
}

interface EditarTransacaoProps {
  onClose: () => void;
}

const EditarTransacaoModal: React.FC<EditarTransacaoProps> = ({ onClose }) => {
  const [mesSelecionado, setmesSelecionado] = useState<Date | null>(null);
  const [transacoesMensais, settransacoesMensais] = useState<{ [key: string]: Transacao[]; }>({});
  const [idTransacaoSelecionada, setidTransacaoSelecionada] = useState< string | null >(null);
  const [transacaoSelecionada, settransacaoSelecionada] = useState<Transacao | null>(null);
  const [userIdAtual, setuserIdAtual] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setuserIdAtual(user.uid);
    } else {
      console.error("Usuário não autenticado.");
    }
  }, []);

  useEffect(() => {
    const carregarTransacaoMes = async () => {
      if (userIdAtual && mesSelecionado) {
        const formatacaoMesAnoparaBD = format(mesSelecionado, "MM-yyyy");
        const db = getDatabase();
        const transacoesRef = ref(db, `transacoes/${formatacaoMesAnoparaBD}`);
  
        try {
          const snapshot = await get(transacoesRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const transacoesEncontradas: Transacao[] = [];
  
            Object.entries(data).forEach(([_, diasTransacao]) => {
              if (
                diasTransacao &&
                (diasTransacao as Record<string, any>)[userIdAtual]
              ) {
                const transacoesdoUsuario = (
                  diasTransacao as Record<string, any>
                )[userIdAtual];
                Object.values(transacoesdoUsuario).forEach((transacao: any) => {
                  // Filtrar apenas transações com status "Ativa" ou "Editada"
                  if (transacao.status === "Ativa" || transacao.status === "Editada") {
                    transacoesEncontradas.push(transacao as Transacao);
                  }
                });
              }
            });
  
            settransacoesMensais({
              [formatacaoMesAnoparaBD]: transacoesEncontradas,
            });
          } else {
            settransacoesMensais({ [formatacaoMesAnoparaBD]: [] });
          }
        } catch (error) {
          console.error("Erro ao buscar transações do mês:", error);
        }
      } else {
        settransacoesMensais({});
      }
      setidTransacaoSelecionada(null);
      settransacaoSelecionada(null);
    };
  
    carregarTransacaoMes();
  }, [userIdAtual, mesSelecionado]);
  

  const handleMudancaMes = (date: Date) => {
    setmesSelecionado(date);
  };

  const handleTransactionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;
    setidTransacaoSelecionada(id);
    const currentMonthTransactions =
      transacoesMensais[format(mesSelecionado!, "MM-yyyy")] || [];
    const foundTransaction = currentMonthTransactions.find((transacao) => {
      return transacao.idTransacao === id;
    });
    settransacaoSelecionada(foundTransaction || null);
  };

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (transacaoSelecionada) {
      settransacaoSelecionada({
        ...transacaoSelecionada,
        valor: parseFloat(event.target.value) || 0,
      });
    }
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (transacaoSelecionada) {
      settransacaoSelecionada({
        ...transacaoSelecionada,
        tipoTransacao: event.target.value,
      });
    }
  };

  const atualizarTransacao = async () => {
    if (
      userIdAtual &&
      mesSelecionado &&
      transacaoSelecionada &&
      transacaoSelecionada.idTransacao
    ) {
      const mesAno = format(mesSelecionado, "MM-yyyy");
      const dataDia = transacaoSelecionada.data;
      const db = getDatabase();

      // Caminho completo com dia
      const transacaoRef = ref(
        db,
        `transacoes/${mesAno}/${dataDia}/${userIdAtual}/${transacaoSelecionada.idTransacao}`
      );
      const saldoRef = ref(db, `contas/${userIdAtual}/saldo`);

      try {
        // Recuperar dados anteriores da transação
        const snapshot = await get(transacaoRef);
        if (snapshot.exists()) {
          const dadosAnteriores = snapshot.val();
          const historicoAtual = dadosAnteriores.historico || [];

          // Recuperar saldo atual
          let saldoAtual = 0;
          const saldoSnapshot = await get(saldoRef);
          if (saldoSnapshot.exists()) {
            saldoAtual = parseFloat(saldoSnapshot.val()) || 0;
            console.log("Saldo atual:", saldoAtual);
          }

          // Reverter o efeito da transação anterior
          let novoSaldo = saldoAtual;
          if (dadosAnteriores.tipoTransacao === "deposito") {
            novoSaldo -= parseFloat(dadosAnteriores.valor) || 0;
          } else if (dadosAnteriores.tipoTransacao === "transferencia") {
            novoSaldo += parseFloat(dadosAnteriores.valor) || 0;
          }

          // Aplicar o efeito da nova transação
          if (transacaoSelecionada.tipoTransacao === "deposito") {
            novoSaldo += parseFloat(transacaoSelecionada.valor?.toString() || "0");
          } else if (transacaoSelecionada.tipoTransacao === "transferencia") {
            novoSaldo -= parseFloat(transacaoSelecionada.valor?.toString() || "0");
          }

          // Atualizar histórico
          const novoHistorico = [
            ...historicoAtual,
            {
              dataModificacao: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
              campoModificado: "tipoTransacao",
              tipoTransacaoAnterior: dadosAnteriores.tipoTransacao,
              tipoTransacaoAtual: transacaoSelecionada.tipoTransacao,
            },
            {
              dataModificacao: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
              campoModificado: "valor",
              valorAnterior: dadosAnteriores.valor,
              valorAtualizado: transacaoSelecionada.valor,
            },
          ];

          // Atualizar transação e saldo
          await update(transacaoRef, {
            ...transacaoSelecionada,
            historico: novoHistorico,
          });

          await update(saldoRef, { saldo: novoSaldo });

          console.log("Transação e saldo atualizados com sucesso!");
          onClose();
        } else {
          console.error("Transação não encontrada no caminho especificado:", transacaoRef.toString());
        }
      } catch (error) {
        console.error("Erro ao atualizar transação:", error);
      }
    } else {
      console.error("Dados incompletos para atualizar transação.");
    }
  };

  const currentMonthTransactions = mesSelecionado
    ? transacoesMensais[format(mesSelecionado, "MM-yyyy")] || []
    : [];

  const legendaMesAno = mesSelecionado
    ? format(mesSelecionado, "MM/yyyy")
    : "Selecione o Mês";

  return (
    <div className="modal-overlay">
      <div className="conteudoModal">
        <h3>Editar Transação</h3>
        <div className="mb-3">
          <label className="form-label">Selecionar Mês</label>
          <div className="input-group">
            <DatePicker
              locale="pt-BR"
              className="form-control"
              placeholderText="Selecione o Mês"
              selected={mesSelecionado}
              onChange={handleMudancaMes}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
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
            value={idTransacaoSelecionada || ""}
            onChange={handleTransactionSelect}
            disabled={!mesSelecionado || currentMonthTransactions.length === 0}
          >
            <option value="" disabled>
              Selecione uma transação
            </option>
            {currentMonthTransactions.map((transacao) => (
              <option key={transacao.idTransacao} value={transacao.idTransacao}>
                R$ {transacao.valor} ({transacao.tipoTransacao} - {transacao.data})
              </option>
            ))}
          </select>
          {currentMonthTransactions.length === 0 && mesSelecionado && (
            <small className="form-text text-muted">
              Nenhuma transação encontrada para este mês.
            </small>
          )}
        </div>

        {transacaoSelecionada && (
          <>
            <div className="mb-3">
              <label className="form-label">Novo Valor</label>
              <input
                className="form-control"
                type="number"
                value={transacaoSelecionada.valor || ""}
                onChange={handleValorChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-control"
                value={transacaoSelecionada.tipoTransacao}
                onChange={handleTipoChange}
              >
                <option value="deposito">Depósito</option>
                <option value="transferencia">Transferência</option>
              </select>
            </div>
          </>
        )}

        <div className="modal-footer">
          <button onClick={onClose} className="botaoCancelar">
            Cancelar
          </button>
          <button
            onClick={atualizarTransacao}
            disabled={!transacaoSelecionada}
            className="botaoSalvar"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarTransacaoModal;
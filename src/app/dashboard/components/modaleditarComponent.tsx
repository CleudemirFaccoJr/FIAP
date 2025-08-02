/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { get, getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";
import { Transacao } from "@/app/classes/Transacao";

registerLocale("pt-BR", ptBR);

interface TransacaoData {
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
  const [transacoesMensais, settransacoesMensais] = useState<{ [key: string]: TransacaoData[] }>({});
  const [idTransacaoSelecionada, setidTransacaoSelecionada] = useState<string | null>(null);
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
            const transacoesEncontradas: TransacaoData[] = [];

            Object.entries(data).forEach(([_, diasTransacao]) => {
              if (
                diasTransacao &&
                (diasTransacao as Record<string, any>)[userIdAtual]
              ) {
                const transacoesdoUsuario = (
                  diasTransacao as Record<string, any>
                )[userIdAtual];
                Object.values(transacoesdoUsuario).forEach((transacao: any) => {
                  if (transacao.status === "Ativa" || transacao.status === "Editada") {
                    transacoesEncontradas.push(transacao as TransacaoData);
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

  const handleMudancaMes = (date: Date | null) => {
    setmesSelecionado(date);
  };

  const handleTransactionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;
    setidTransacaoSelecionada(id);
    const currentMonthTransactions =
      transacoesMensais[format(mesSelecionado!, "MM-yyyy")] || [];
    const foundTransaction = currentMonthTransactions.find(
      (transacao) => transacao.idTransacao === id
    );
    if (foundTransaction && foundTransaction.tipoTransacao && foundTransaction.valor !== undefined) {
      const transacao = new Transacao(
        foundTransaction.tipoTransacao,
        foundTransaction.valor,
        userIdAtual || "",
        0, 
        0, 
        foundTransaction.idTransacao,
        foundTransaction.historico ? JSON.stringify(foundTransaction.historico) : "[]"
      );
      settransacaoSelecionada(transacao);
    } else {
      console.error("Transação inválida selecionada:", foundTransaction);
      settransacaoSelecionada(null);
    }
  };

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (transacaoSelecionada) {
      const novoValor = parseFloat(event.target.value) || 0;
      settransacaoSelecionada(
        new Transacao(
          transacaoSelecionada.tipo,
          novoValor,
          transacaoSelecionada.idconta,
          transacaoSelecionada.saldoAnterior,
          transacaoSelecionada.saldo,
          transacaoSelecionada.idTransacao ?? "",
          typeof transacaoSelecionada.historico === "string"
            ? transacaoSelecionada.historico
            : JSON.stringify(transacaoSelecionada.historico ?? [])
        )
      );
    }
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (transacaoSelecionada) {
      settransacaoSelecionada(
        new Transacao(
          event.target.value,
          transacaoSelecionada.valor,
          transacaoSelecionada.idconta,
          transacaoSelecionada.saldoAnterior,
          transacaoSelecionada.saldo,
          transacaoSelecionada.idTransacao ?? "",
          typeof transacaoSelecionada.historico === "string"
            ? transacaoSelecionada.historico
            : JSON.stringify(transacaoSelecionada.historico ?? [])
        )
      );
    }
  };

  const handleAtualizarTransacao = async () => {
    if (transacaoSelecionada && mesSelecionado) {
      try {
        await transacaoSelecionada.atualizarTransacao(mesSelecionado);
        console.log("Transação atualizada com sucesso!");
        onClose();
      } catch (error) {
        console.error("Erro ao atualizar transação:", error);
      }
    } else {
      console.error("Transação ou mês não selecionados:", {
        transacaoSelecionada,
        mesSelecionado,
      });
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
                value={transacaoSelecionada.tipo}
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
            onClick={handleAtualizarTransacao}
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
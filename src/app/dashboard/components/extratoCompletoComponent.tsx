import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import "../../../styles/dashboard.css";
import "../../../styles/style.css";

const ExtratoCompletoComponent = () => {
  const [transacoes, setTransacoes] = useState<{ [key: string]: any }[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const db = getDatabase();
      const transacoesRef = ref(db, `transacoes`);

      get(transacoesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const transacoesUsuario: { [key: string]: any }[] = [];

            Object.keys(data).forEach((mes) => {
              const dias = data[mes];
              Object.keys(dias).forEach((dia) => {
                const transacoesDia = dias[dia][userId];
                if (transacoesDia) {
                  Object.keys(transacoesDia).forEach((transacaoId) => {
                    transacoesUsuario.push({
                      ...transacoesDia[transacaoId],
                      mes,
                    });
                  });
                }
              });
            });

            setTransacoes(transacoesUsuario);
          } else {
            console.log("Nenhuma transação encontrada.");
          }
        })
        .catch((error) => console.error("Erro ao buscar transações:", error));
    }
  }, []);

  const handleMesChange = (event) => {
    setMesSelecionado(event.target.value); // Atualiza o mês selecionado
  };

  const formatarMesAno = (mesAno) => {
    if (!mesAno || !mesAno.includes("-")) return "Mês/Ano inválido";
    const [ano, mes] = mesAno.split("-");
    const nomesMeses = [
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
    return `${nomesMeses[parseInt(mes, 10) - 1]}/${ano}`;
  };
  


  // Filtra transações com base no mês selecionado
  const transacoesFiltradas = mesSelecionado
    ? transacoes.filter((transacao) => transacao.mes === mesSelecionado)
    : transacoes;

  const depositos = transacoesFiltradas.filter(
    (transacao) => transacao.tipoTransacao === "deposito"
  );

  const transferencias = transacoesFiltradas.filter(
    (transacao) => transacao.tipoTransacao === "transferencia"
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
            {[
              ...new Set(
                transacoes.map((transacao) => transacao.mes)
              ),
            ].map((mes) => (
              <option key={mes} value={mes}>
                {formatarMesAno(mes)}
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
                depositos.map((transacao, index) => (
                    <div key={index}>
                    <div className="d-flex justify-content-between textos-transacao">
                      <div>
                        <p><strong>Dia:</strong> {transacao.data ? transacao.data.split("-").join("/") : "Data inválida"}</p>
                        <p><strong>Hora:</strong> {transacao.hora}</p>
                        <p><strong>Status:</strong> {transacao.status}</p>
                      </div>
                      <div className="valor-transacao">
                        <p>R$ {transacao.valor.toFixed(2)}</p>
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
                transferencias.map((transacao, index) => (
                    <div key={index} className={`mb-3 ${transacao.status === "excluida" ? "transacao-excluida" : ""}`}>
                    <div className="d-flex justify-content-between textos-transacao">
                      <div>
                        <p><strong>Dia:</strong> {transacao.data ? transacao.data.split("-").join("/") : "Data inválida"}</p>
                        <p><strong>Hora:</strong> {transacao.hora}</p>
                        <p><strong>Status:</strong> {transacao.status}</p>
                      </div>
                      <div className="valor-transacao">
                        <p>R$ {transacao.valor.toFixed(2)}</p>
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

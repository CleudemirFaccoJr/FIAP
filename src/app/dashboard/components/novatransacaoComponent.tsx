import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { database } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import { Transacao } from "@/app/classes/Transacao";
import UploadAnexo from "./upload/UploadAnexo";

const NovaTransacaoComponent = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [idconta, setIdConta] = useState<string | null>(null);
  const [saldoAtual, setSaldoAtual] = useState<number>(0);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anexoUrl, setAnexoUrl] = useState<string | null>(null);


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setIdConta(user.uid);
      obterSaldo(user.uid);
    } else {
      alert("Usuário não está logado.");
    }
  }, []);

    // Sugestão automática de categoria baseada na descrição
    useEffect(() => {
      const texto = descricao.toLowerCase();

      if (texto === "") return;

      const palavrasSaude = [
        "remedio", "remédio", "medicamento", "farmacia", "farmácia",
        "consulta", "dentista", "hospital", "exame", "plano"
      ];

      const palavrasLazer = [
        "cinema", "show", "jantar", "teatro", "bar",
        "viagem", "hotel", "festa", "parque", "passeio"
      ];

      const palavrasTransporte = [
        "uber", "gasolina", "ônibus", "metro", "passagem",
        "pedágio", "combustivel", "taxi", "corrida", "carro"
      ];

      const palavrasInvestimento = [
        "tesouro", "cdb", "ações", "cripto", "fundos",
        "poupança", "bolsa", "btc", "etf", "investimento"
      ];

      const contem = (lista: string[]) => lista.some(palavra => texto.includes(palavra));

      if (contem(palavrasSaude)) {
        setCategoria("Saude");
      } else if (contem(palavrasLazer)) {
        setCategoria("Lazer");
      } else if (contem(palavrasTransporte)) {
        setCategoria("Transporte");
      } else if (contem(palavrasInvestimento)) {
        setCategoria("Investimento");
      } else {
        setCategoria("Outros");
      }
    }, [descricao]);


  // Função para obter o saldo da conta
  const obterSaldo = async (idconta: string) => {
    const contaRef = ref(database, `contas/${idconta}/saldo`);
    try {
      const snapshot = await get(contaRef);
      let saldoAtual = 0;
      if (snapshot.exists() && snapshot.val() !== null) {
        const saldoData = snapshot.val();
        if (saldoData && typeof saldoData.saldo === 'number') {
          saldoAtual = saldoData.saldo;
        } else if (saldoData && typeof saldoData.saldo === 'string') {
          const parsedSaldo = parseFloat(saldoData.saldo);
          saldoAtual = isNaN(parsedSaldo) ? 0 : parsedSaldo;
        } else {
          console.warn("O saldo no Firebase não está no formato esperado:", saldoData);
          saldoAtual = 0;
        }
      }
      setSaldoAtual(saldoAtual);
    } catch (error) {
      console.error("Erro ao obter saldo:", error);
      alert("Erro ao carregar o saldo. Tente novamente.");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!tipo || !valor || parseFloat(valor) <= 0) {
      alert("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    if (!idconta) {
      alert("Erro ao identificar a conta do usuário. Tente novamente.");
      return;
    }

    const valorNumerico = parseFloat(valor);

    if (tipo === "deposito" && valorNumerico <= 0) {
      alert("O valor do depósito não pode ser negativo. Por favor, insira um valor válido.");
      return;
    }

    if (valorNumerico > 100000) {
      alert("Transações acima de R$ 100.000,00 devem ser feitas manualmente. Por favor, entre em contato com o suporte.");
      return;  
    }

    if (isNaN(valorNumerico)) {
      alert("O valor inserido não é válido. Por favor, insira um número.");
      return;
    }

    let novoSaldo: number;
    if (tipo === "deposito") {
      novoSaldo = saldoAtual + valorNumerico;
    } else if (tipo === "transferencia") {
      novoSaldo = saldoAtual - valorNumerico;
    } else if (tipo === "pagamento") {
      novoSaldo = saldoAtual - valorNumerico;
    }else if (tipo === "investimento") {
      novoSaldo = saldoAtual - valorNumerico;
    }else {
      alert("Tipo de transação inválido.");
      return;
    }

    if (novoSaldo < 0 && tipo === "transferencia") {
      alert(`Sua conta está negativada, será usado seu cheque especial. Seu novo saldo é: ${novoSaldo.toFixed(2)}`);
    }

    const transacao = new Transacao(tipo, valorNumerico, idconta, saldoAtual, novoSaldo, descricao, categoria, anexoUrl );

    try {
      await transacao.registrar();
      alert("Transação concluída com sucesso!");
      setTipo("");
      setValor("");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Erro ao salvar a transação: ${errorMessage}. Tente novamente.`);
    }
  };

  return (
    <div className="nova-transacao-card">
      <h1 className="nova-transacao-titulo">Nova Transação</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              id="tipo"
              name="tipo"
              className="tipo-transacao-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecione o tipo de transação</option>
              <option value="deposito">Depósito</option>
              <option value="transferencia">Transferência</option>
              <option value="pagamento">Pagamento</option>
              <option value="investimento">Investimento</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="number"
              id="valor"
              name="valor"
              className="valor-input"
              placeholder="R$ 00.00"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <select
              id="categoria"
              name="categoria"
              className="tipo-transacao-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecione a categoria</option>
              <option value="Saude">Saúde</option>
              <option value="Lazer">Lazer</option>
              <option value="Investimento">Investimento</option>
              <option value="Transporte">Transporte</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              id="descricao"
              name="descricao"
              className="descricao-textarea"
              placeholder="Descrição da transação (opcional)"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <UploadAnexo
            onUploadSuccess={(url) => setAnexoUrl(url)}
            onRemoveSuccess={() => setAnexoUrl(null)}
            urlAtual={anexoUrl}
          />

          <button type="submit" className="concluir-button">Concluir Transação</button>
        </form>
    </div>
  );
};

export default NovaTransacaoComponent;

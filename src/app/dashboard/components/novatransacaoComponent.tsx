import { useState, useEffect } from "react";
import { database } from "../../../lib/firebase";
import { ref, set, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const NovaTransacaoComponent = () => {
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");
    const [idconta, setIdConta] = useState<string | null>(null);
    const [saldoAtual, setSaldoAtual] = useState<number>(0);
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

        if (isNaN(valorNumerico)) {
            alert("O valor inserido não é válido. Por favor, insira um número.");
            return;
        }

        let novoSaldo: number;
        if (tipo === "deposito") {
            novoSaldo = saldoAtual + valorNumerico;
        } else if (tipo === "transferencia") {
            novoSaldo = saldoAtual - valorNumerico;
        } else {
            alert("Tipo de transação inválido.");
            return;
        }

        if (novoSaldo < 0 && tipo === "transferencia") {
            alert(`Sua conta está negativada, será usado seu cheque especial. Seu novo saldo é: ${novoSaldo.toFixed(2)}`);
        }

        // Registra a transação
        const dataAtual = new Date();
        const mesVigente = `${String(dataAtual.getMonth() + 1).padStart(2, "0")}-${dataAtual.getFullYear()}`;
        const dataFormatada = `${String(dataAtual.getDate()).padStart(2, "0")}-${String(dataAtual.getMonth() + 1).padStart(2, "0")}-${dataAtual.getFullYear()}`;
        const timestamp = dataAtual.getTime();
        const idTransacao = `${timestamp}`;

        const transacoesRef = ref(database, `transacoes/${mesVigente}/${dataFormatada}/${idconta}/${timestamp}`);

        try {
            // Salvar a transação no Firebase
            await set(transacoesRef, {
                idTransacao,
                tipoTransacao: tipo,
                valor: valorNumerico,
                saldoAnterior: saldoAtual,
                saldo: novoSaldo,
                data: dataFormatada,
                hora: `${String(dataAtual.getHours()).padStart(2, "0")}:${String(dataAtual.getMinutes()).padStart(2, "0")}:${String(dataAtual.getSeconds()).padStart(2, "0")}`,
                status: "Ativa",
            });

            // Atualizar o saldo da conta no Firebase
            const contaRef = ref(database, `contas/${idconta}/saldo`);
            await update(contaRef, { saldo: novoSaldo });

            alert("Transação concluída com sucesso!");
            setTipo("");
            setValor("");
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error instanceof Error) {
                    alert(`Erro ao salvar a transação: ${error.message}. Tente novamente.`);
                } else {
                    alert("Erro desconhecido ao salvar a transação. Tente novamente.");
                }
            } else {
                alert("Erro desconhecido ao salvar a transação. Tente novamente.");
            }
            alert(`Erro ao salvar a transação: ${error.message}. Tente novamente.`);
        }
    };

    return (
        <div className="nova-transacao-card">
            <h1 className="nova-transacao-titulo">Nova Transação</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select id="tipo" name="tipo" className="tipo-transacao-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="">Selecione o tipo de transação</option>
                        <option value="deposito">Depósito</option>
                        <option value="transferencia">Transferência</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" id="valor" name="valor" className="valor-input" placeholder="R$ 00.00" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} required/>
                </div>
                <button type="submit" className="concluir-button"> Concluir Transação</button>
            </form>
        </div>
    );
};

export default NovaTransacaoComponent;
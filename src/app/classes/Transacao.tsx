import { database } from "../../lib/firebase";
import { ref, set, update } from "firebase/database";

export class Transacao {
  tipo: string;
  valor: number;
  idconta: string;
  saldoAnterior: number;
  saldo: number;
  data: string;
  hora: string;
  status: string;

  constructor(
    tipo: string,
    valor: number,
    idconta: string,
    saldoAnterior: number,
    saldo: number
  ) {
    this.tipo = tipo;
    this.valor = valor;
    this.idconta = idconta;
    this.saldoAnterior = saldoAnterior;
    this.saldo = saldo;
    
    const dataAtual = new Date();
    this.data = `${String(dataAtual.getDate()).padStart(2, "0")}-${String(
      dataAtual.getMonth() + 1
    ).padStart(2, "0")}-${dataAtual.getFullYear()}`;
    this.hora = `${String(dataAtual.getHours()).padStart(2, "0")}:${String(
      dataAtual.getMinutes()
    ).padStart(2, "0")}:${String(dataAtual.getSeconds()).padStart(2, "0")}`;
    this.status = "Ativa";
  }

  async registrar(): Promise<void> {
    const dataAtual = new Date();
    const mesVigente = `${String(dataAtual.getMonth() + 1).padStart(2, "0")}-${dataAtual.getFullYear()}`;
    const timestamp = dataAtual.getTime();
    const idTransacao = `${timestamp}`;
    const transacoesRef = ref(database, `transacoes/${mesVigente}/${this.data}/${this.idconta}/${timestamp}`);

    try {
      await set(transacoesRef, {
        idTransacao,
        tipoTransacao: this.tipo,
        valor: this.valor,
        saldoAnterior: this.saldoAnterior,
        saldo: this.saldo,
        data: this.data,
        hora: this.hora,
        status: this.status,
      });

      const contaRef = ref(database, `contas/${this.idconta}/saldo`);
      await update(contaRef, { saldo: this.saldo });

      console.log("Transação registrada com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar transação:", error);
      throw new Error("Erro ao registrar a transação. Tente novamente.");
    }
  }
}

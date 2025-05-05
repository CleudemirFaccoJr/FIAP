import { auth,database } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export class Usuario {
  nome: string;
  email: string;
  senha: string;

  constructor(nome: string, email: string, senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  // Cadastro de usuário com tratamento de erro
  async cadastrar(): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.senha
      );
      const userId = userCredential.user.uid;

      await set(ref(database, `contas/${userId}`), {
        idconta: userId,
        nomeUsuario: this.nome,
        emailUsuario: this.email,
      });

      window.alert("Sucesso! Sua conta foi cadastrada.");
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erro ao cadastrar o usuário. Tente novamente mais tarde."
      );
    }
  }

  // Login de usuário com tratamento de erro
  async login(): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.senha);
      const user = userCredential.user;
      return user;
    } catch (error) {
      let erroMessage = "Erro desconhecido. Tente novamente.";

      if (error instanceof Error && "code" in error) {
        switch (error.code) {
          case "auth/internal-error":
            erroMessage = "Ocorreu um erro interno. Tente novamente mais tarde.";
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
            erroMessage = "Este usuário não está cadastrado ou a senha está incorreta.";
            break;
          default:
            erroMessage = "Ocorreu um erro ao tentar fazer login.";
            break;
        }
      }

      throw new Error(erroMessage);
    }
  }
}

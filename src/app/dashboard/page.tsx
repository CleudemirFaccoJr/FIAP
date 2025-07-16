"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/dashboard.css";
import { useEffect, useState } from "react";
import SaldoComponent from "./components/saldoComponent";
import DashboardNavbar from "./components/dashboardnavbar";
import ExtratoComponent from "./components/extratoComponent";
import NovaTransacaoComponent from "./components/novatransacaoComponent";
import Servicos from "./components/servicosComponent";
import MeusCartoes from "./components/meuscartoesComponent";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import ExtratoCompletoComponent from "./components/extratoCompletoComponent";
import GraficoResumo from "./components/graficosComponent";

const formatarDataCompleta = () => {
  const agora = new Date();
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const diaSemana = diasDaSemana[agora.getDay()];
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();

  return `${diaSemana}, ${dia}/${mes}/${ano}`;
};

const Dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataCompleta, setDataCompleta] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [componenteAtivo, setComponenteAtivo] = useState<string>("");

  useEffect(() => {
    // Importa dinamicamente o arquivo JS do Bootstrap apenas no ambiente do navegador
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []); 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        if (user.displayName) {
          setPrimeiroNome(user.displayName.split(" ")[0]);
        }
      } else {
        setUserId(null);
        setPrimeiroNome("");
      }
      setLoading(false);
    });

    setDataCompleta(formatarDataCompleta());

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (userId && !primeiroNome) {
      const database = getDatabase();
      const userRef = ref(database, `contas/${userId}/nomeUsuario`);
      console.log("Buscando nome do usuário no Banco de Dados:", userRef);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const nomeUsuario = snapshot.val();
            setPrimeiroNome(nomeUsuario.split(" ")[0]);
          } else {
            console.log("Nome de usuário não encontrado no banco de dados.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar nome de usuário:", error);
        });
    }
  }, [userId, primeiroNome]);

  const renderComponente = () => {
    switch (componenteAtivo) {
      case "outros-servicos":
        return <Servicos onServicoSelecionado={setComponenteAtivo} />;
      case "cartoes-credito":
        return <MeusCartoes />;
      case "extrato-completo":
        return <ExtratoCompletoComponent />;
      case "home":
        return <div>&nbsp;</div>;
      default:
        return <div>&nbsp;</div>;
    }
  };

  if (loading) {
    return <div>Carregando informações do usuário...</div>;
  }

  if (userId === null) {
    return (
      <div>Usuário não autenticado. Redirecione para a página de login.</div>
    );
  }

  return (
    <main>
      <DashboardNavbar setComponenteAtivo={setComponenteAtivo} />
      <div className="container">
        <div className="row">
          <div className="dadosAcesso col-md-12">
            <h5 className="nomeUsuario">{primeiroNome || "Usuário"}</h5>
            <p className="diaSemana">{dataCompleta}</p>
          </div>
          {/* Aqui temos o componente de Saldo. Ele possui: Saldo, Entradas, Saidas e Investimentos */}
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <SaldoComponent userId={userId} />
            </div>
          </div>

          {/* Aqui temos o componente de Gráficos. Ele possui: Fluxo de Caixa, Evolução do Saldo e Gastos por Categoria */}
          <div className="row">
            <div className="col-md-12 col-sm-12 mb-3">
              <GraficoResumo userId={userId} />
            </div>
          </div>

          {/* Aqui temos o componente de Nova Transação e Extrato */}
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <NovaTransacaoComponent />
            </div>
            <div className="col-md-8 col-sm-12">
              <ExtratoComponent />
              <a href="#" className="extrato-link float-right" onClick={() => setComponenteAtivo("extrato-completo")}>Ver Extrato Completo</a>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="outrosServicos">{renderComponente()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

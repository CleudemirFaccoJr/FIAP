import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import "@/styles/style.css";
import "@/styles/dashboardnavbar.css";

interface DashboardNavbarProps {
  setComponenteAtivo: (tab: string) => void;
}

export default function DashboardNavbar({
  setComponenteAtivo,
}: DashboardNavbarProps) {
  const [userName, setUserName] = useState("Usuário");
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setComponenteAtivo(tab);
  };

  useEffect(() => {
    console.log("Iniciando listener de autenticação...");
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Estado de autenticação mudou:", user);
      if (user) {
        try {
          const userRef = ref(db, `contas/${user.uid}/nomeUsuario`);
          console.log("Buscando nome do usuário em:", userRef);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            console.log("Nome do usuário encontrado:", snapshot.val());
            setUserName(snapshot.val());
          } else {
            console.warn("Nome do usuário não encontrado no banco de dados.");
          }
        } catch (error) {
          console.error("Erro ao buscar o nome do usuário:", error);
        }
      } else {
        console.warn("Nenhum usuário autenticado.");
      }
    });

    return () => {
      console.log("Desinscrevendo listener de autenticação...");
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="dashboard-header p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Image src="/images/logo.png" alt="Logo ByteBank" width={145} height={36}/>
          <div className="user-info d-flex align-items-center">
            <span className="user-name me-3">{userName}</span>
            <a href="/minha-conta">
              <Image src="/icons/avatar.png" alt="Ícone de Usuário" width={36} height={36}/>
            </a>
          </div>
        </div>
      </header>

      <nav className="dashboard-menu navbar navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "home" ? "active" : ""}`} onClick={() => handleTabClick("home")}>Início</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "transferencias" ? "active" : ""}`} onClick={() => handleTabClick("transferencias")}>Transferências</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${ activeTab === "investimentos" ? "active" : "" }`} onClick={() => handleTabClick("investimentos")}>Investimentos</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${ activeTab === "outros-servicos" ? "active" : ""}`} onClick={() => handleTabClick("outros-servicos")}>Outros Serviços</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

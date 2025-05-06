"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import "@/styles/style.css";
import "@/styles/dashboardnavbar.css";

interface DashboardNavbarProps {
  setComponenteAtivo?: (tab: string) => void;
}

export default function DashboardNavbar({
  setComponenteAtivo,
}: DashboardNavbarProps) {
  const [userName, setUserName] = useState("Usuário");
  const [activeTab, setActiveTab] = useState("home");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab: string) => {
    if (pathname !== "/dashboard") {
      router.push("/dashboard");
      return;
    }
    setActiveTab(tab);
    if (setComponenteAtivo) {
      setComponenteAtivo(tab);
    }
  };

  const deslogar = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log("Usuário desconectado.");
        router.push("/");
      })
      .catch((error) => {
        console.error("Erro ao desconectar:", error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `contas/${user.uid}/nomeUsuario`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserName(snapshot.val());
          }
        } catch (error) {
          console.error("Erro ao buscar o nome do usuário:", error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="dashboard-header p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Image src="/images/logo.png" alt="Logo ByteBank" width={145} height={36} />
          <div className="dropdown">
            <div className="d-flex align-items-center dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
              <span className="user-name me-3">{userName}</span>
              <Image src="/icons/avatar.png" alt="Ícone de Usuário" width={36} height={36} />
            </div>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a className="dropdown-item" href="/minha-conta">Minha conta</a></li>
              <li><a className="dropdown-item" href="/configuracoes">Configurações</a></li>
              <li>
                <button className="dropdown-item" onClick={() => setShowLogoutModal(true)}>Sair</button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <nav className="dashboard-menu navbar navbar-expand-lg">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "home" ? "active" : ""}`} onClick={() => handleTabClick("home")} style={{ cursor: "pointer" }}>Início</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "transferencias" ? "active" : ""}`} onClick={() => handleTabClick("transferencias")} style={{ cursor: "pointer" }}>Transferências</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "investimentos" ? "active" : ""}`} onClick={() => handleTabClick("investimentos")} style={{ cursor: "pointer" }}>Investimentos</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === "outros-servicos" ? "active" : ""}`} onClick={() => handleTabClick("outros-servicos")} style={{ cursor: "pointer" }}>Outros Serviços</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Atenção</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)} ></button>
              </div>
              <div className="modal-body">
                <p>Você tem certeza que deseja sair?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Não</button>
                <button type="button" className="btn btn-success" onClick={deslogar}>Sim</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
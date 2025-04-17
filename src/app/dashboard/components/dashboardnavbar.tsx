'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/style.css';
import '@/styles/dashboardnavbar.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

export default function DashboardNavbar() {

  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    console.log('Iniciando listener de autenticação...');
    const auth = getAuth();
    const db = getDatabase();
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Estado de autenticação mudou:', user);
      if (user) {
        try {
          const userRef = ref(db, `contas/${user.uid}/nomeUsuario`);
          console.log('Buscando nome do usuário em:', userRef);
          const snapshot = await get(userRef);
  
          if (snapshot.exists()) {
            console.log('Nome do usuário encontrado:', snapshot.val());
            setUserName(snapshot.val());
          } else {
            console.warn('Nome do usuário não encontrado no banco de dados.');
          }
        } catch (error) {
          console.error('Erro ao buscar o nome do usuário:', error);
        }
      } else {
        console.warn('Nenhum usuário autenticado.');
      }
    });
  
    return () => {
      console.log('Desinscrevendo listener de autenticação...');
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="dashboard-header p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo ByteBank" width={145} height={36} priority />
          </div>
          <div className="user-info d-flex align-items-center">
            <span className="user-name me-3">{userName}</span>
            <a href="/minha-conta">
              <Image src="/icons/avatar.png" alt="Ícone de Usuário" width={36} height={36} priority />
            </a>
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
                <a className="nav-link active" href="/inicio"> Início </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/transferencias"> Transferências </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/investimentos"> Investimentos </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/outros-servicos"> Outros Serviços </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

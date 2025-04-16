'use client';

import React from 'react';
import Image from 'next/image';
import '@/styles/style.css';
import '@/styles/dashboardnavbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

export default function DashboardNavbar() {
  return (
    <>
      <header className="dashboard-header p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo ByteBank" width={145} height={36} priority />
          </div>
          <div className="user-info d-flex align-items-center">
            <span className="user-name me-3">Joana da Silva Oliveira</span>
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

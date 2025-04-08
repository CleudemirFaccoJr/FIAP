'use client';

import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DashboardPage() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand" href="#">ByteBank</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Visão Geral</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Transações</a>
            </li>
          </ul>
          <button className="btn btn-outline-light btn-sm">Sair</button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="p-4">
        <h2 className="mb-4">Painel Financeiro</h2>
        
        {/* Cards resumo */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-success">
              <div className="card-body">
                <h5 className="card-title">Entradas</h5>
                <p className="card-text text-success fw-bold">R$ 5.000,00</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-danger">
              <div className="card-body">
                <h5 className="card-title">Saídas</h5>
                <p className="card-text text-danger fw-bold">R$ 3.200,00</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-primary">
              <div className="card-body">
                <h5 className="card-title">Saldo</h5>
                <p className="card-text text-primary fw-bold">R$ 1.800,00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de transações (placeholder) */}
        <div className="mt-5">
          <h4>Últimas transações</h4>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>06/04/2025</td>
                <td>Salário</td>
                <td className="text-success">+R$ 3.000,00</td>
                <td>Entrada</td>
              </tr>
              <tr>
                <td>04/04/2025</td>
                <td>Mercado</td>
                <td className="text-danger">-R$ 350,00</td>
                <td>Saída</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

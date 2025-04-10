'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/style.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <html lang='pt-BR'>
      <body>
        <Navbar />
        <section className="banner">
          <div className="banner-content">
            <h1>Crie sua conta!</h1>
            <p>Experimente mais liberdade no controle da sua vida financeira.</p>
            <button>Abrir minha conta</button>
          </div>
          <div className="banner-image">
            <img src="/images/banner_bytebank.png" alt="Ilustração sobre controle financeiro" />
          </div>
        </section>
          <section className="vantagens py-5">
            <div className="container">
              <h2 className="mb-3">Vantagens do nosso banco</h2>
              <div className="linha-destaque mb-4"></div>
              <div className="row g-4">
                <div className="col-lg-3 col-md-6">
                  <div className = "card h-100 d-flex flex-column">
                    <div className="card-body">
                      <center><img src="/images/presente.png" alt="Conta e cartão gratuitos" className="mb-3"/></center>
                      <h5 className="card-title">Conta e cartão gratuitos</h5>
                      <p className="card-text">Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className = "card h-100 d-flex flex-column">
                    <div className="card-body">
                      <center><img src="/images/saque.png" alt="Saques sem custo" className="mb-3"/></center>
                      <h5 className="card-title">Saques sem custo</h5>
                      <p className="card-text">Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className = "card h-100 d-flex flex-column">
                    <div className="card-body">
                      <center><img src="/images/estrela.png" alt="Programa de pontos" className="mb-3"/></center>
                      <h5 className="card-title">Programa de pontos</h5>
                      <p className="card-text">Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className = "card h-100 d-flex flex-column">
                    <div className="card-body">
                      <center><img src="/images/dispositivos.png" alt="Seguro Dispositivos" className="mb-3"/></center>
                      <h5 className="card-title">Seguro Dispositivos</h5>
                      <p className="card-text">Seus dispositivos móveis protegidos por uma mensalidade simbólica.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        <Footer/>
      </body>
    </html>
  );
}

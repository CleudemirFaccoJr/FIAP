'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/footer.css';

import React from 'react';

export default function Footer() {
  return (
    <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h5>Serviços</h5>
        <ul className="list-unstyled">
          <li>Conta corrente</li>
          <li>Conta PJ</li>
          <li>Cartão de crédito</li>
        </ul>
      </div>
      
      <div className="col-md-4">
        <h5>Contato</h5>
        <ul className="list-unstyled">
          <li>0800 004 250 08</li>
          <li>meajuda@bytebank.com.br</li>
          <li>ouvidoria@bytebank.com.br</li>
        </ul>
      </div>
      
      <div className="col-md-4">
        <h5>Desenvolvido por Alura</h5>
        <img src="/images/logo_branco.png" alt="ByteBank Logo" className="mb-3"/>
        <div className="d-flex gap-3">
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" width={24} height={24} /></a>
          <a href="#"><img src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} /></a>
          <a href="#"><img src="/icons/youtube.svg" alt="YouTube" width={24} height={24} /></a>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
}

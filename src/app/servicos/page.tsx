'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ServicosPage() {
  return (
      <body>
        <Navbar />
        <div className="container py-5">
          <h1 className="text-center mb-4">Nossos Serviços</h1>
          <div className="text-center">
            <a href="#" className="btn btn-primary me-2">Abrir minha conta</a>
            <a href="#" className="btn btn-outline-secondary">Já tenho conta</a>
          </div>
        </div>
        <Footer/>
      </body>
  );
}
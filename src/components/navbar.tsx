'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">
          <Image
            src="/images/logo.png"
            alt="Logo ByteBank"
            width={145} 
            height={36}
            priority
          />
          </Link>
        <div className="d-flex align-items-center gap-3">
        <Link className="nav-link" href="/sobre">Sobre</Link>
        <Link className="nav-link" href="/servicos">Serviços</Link>

          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#abrirContaModal"
          >
            Abrir Minha Conta
          </button>

          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Já Tenho Conta
          </button>
        </div>
      </div>
    </nav>
  );
}

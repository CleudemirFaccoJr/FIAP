import { useState } from "react";
import Image from "next/image";

export default function AbrirContaModal() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <button className="btn btn-modalAbrirConta" onClick={toggleModal}>Abrir minha Conta</button>

      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-labelledby="abrirContaModalLabel" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="abrirContaModalLabel">Crie sua conta</h5>
                <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
              </div>
              <div className="modal-body mx-auto">
              <Image src="/images/abriConta.png" alt="Logo ByteBank" width={355} height={262} priority className="mb-3" />
                <p>Preencha os campos abaixo para criar sua conta corrente!</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" placeholder="Digite seu nome completo"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" placeholder="Digite sua senha"/>
                  </div>
                  <div className="mb-3">
                    <input type="checkbox" className="form-check-input" id="termos" />
                    <label className="form-check-label termostext" htmlFor="termos">Li e estou ciente quanto às condições de tratamento dos meus dados<br/> conforme descrito na Política de Privacidade do banco.</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btnCriarConta">Criar Conta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

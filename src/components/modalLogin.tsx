import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ModalLogin() {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);
    
    return (
        <>
          <button className="btn btn-modalLoginUsuario" onClick={toggleModal}>Já tenho conta</button>
    
          {showModal && (
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-labelledby="abrirContaModalLabel" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="abrirContaModalLabel">Entre na sua conta</h5>
                    <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body mx-auto">
                  <Image src="/images/ilustra_Cadastro.png" alt="Logo ByteBank" width={355} height={262} priority className="mb-3" />
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="senha" placeholder="Digite sua senha"/>
                      </div>
                      <div className="mb-3">
                        <Link href="/recuperar-senha" className="esqueciminhasenha">Esqueci minha senha</Link>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-acessar">Acessar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
}    
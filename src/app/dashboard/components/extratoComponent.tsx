import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ExtratoComponent = () => {
  return (
    <div className="extrato-card">
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 col-sm-12'><h5>Extrato</h5></div>
                <div className='col-md-2 col-sm-12 text-end'>
                    <ul>
                        <li><span className='extrato-editar-icone'><FontAwesomeIcon icon={faPenToSquare} /></span></li>
                        <li><span className='extrato-excluir-icone'><FontAwesomeIcon icon={faTrashCan} /></span></li>
                    </ul>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4 col-sm-12'>
                    <div className='extrato-item'>
                        <div className='extrato-header'>Últimos 30 dias</div>
                    </div>
                </div>
                <div className='col-md-8 col-sm-12'>
                    <div className='extrato-item'>
                        <div className='row'>
                        <div className='extrato-header'>Últimas Transações</div>
                            <div className='extrato-transacao'>
                                <div className='col-md-6 col-sm-12'>
                                    <div className='extrato-mes'>Novembro</div>
                                    <div className='extrato-data'>01/11/2023</div>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <div className='extrato-valor'>R$ 100,00</div>
                                    <div className='extrato-tipo-deposito'>Deposito</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4 col-sm-12'>
                    <p>Saldo em Conta</p>
                </div>
                <div className='col-md-8 col-sm-12 text-end'>
                    <Link href="/extrato" className='extrato-link'>Ver extrato completo</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ExtratoComponent;
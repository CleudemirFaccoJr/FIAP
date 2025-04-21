import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from "firebase/auth";

const ExtratoComponent = () => {
  const [transacoes, setTransacoes] = useState<{
      hora: string; data: string; valor?: number; tipo?: string 
}[]>([]);
  const [mesVigente, setMesVigente] = useState('');

  const mesesPorExtenso = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Função para buscar as transações do usuário logado
  const fetchTransacoes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      console.log('ID do usuário na funcionalidade de extrato:', userId);
  
      const db = getDatabase();
      const transacoesRef = ref(db, `transacoes`);
  
      try {
        const snapshot = await get(transacoesRef);
  
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Transações encontradas:', data);
  
          const transacoesArray: { data: string; hora: string; valor?: number; tipo?: string }[] = [];
          let currentMonth: number | null = null;
  
          Object.keys(data).forEach((anoMes) => {
            const dias = data[anoMes];
  
            Object.keys(dias).forEach((dia) => {
              const usuarios = dias[dia];
  
              if (usuarios[userId]) {
                const transacoesUsuario = usuarios[userId];
  
                Object.keys(transacoesUsuario).forEach((transacaoId) => {
                  const transacao = transacoesUsuario[transacaoId];

                  const dataOriginal = transacao.data ?? '';
                  const [ano, mes, dia] = dataOriginal.split('-');
                  const dataFormatada = `${dia}/${mes}/${ano}`;
                  const hora = transacao.hora ?? '00:00';
  
                  transacoesArray.push({
                    ...transacao,
                    data: dataFormatada,
                    tipo: transacao.tipoTransacao,
                    hora,
                  });
  
                  // Define o mês vigente se ainda não estiver definido
                  if (currentMonth === null) {
                    currentMonth = parseInt(mes, 10);
                    setMesVigente(mesesPorExtenso[currentMonth - 1]);
                  }
                });
              }
            });
          });
  
          setTransacoes(transacoesArray);
        } else {
          console.log('Não há transações para o usuário.');
        }
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    } else {
      console.log('Usuário não está logado.');
    }
  };
  

  // Carrega as transações ao montar o componente
  useEffect(() => {
    fetchTransacoes();
  }, []);

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
                {transacoes.length > 0 ? (
                  transacoes.map((transacao: { data: string; hora: string; valor?: number; tipo?: string }, index) => (
                    <div key={index} className='extrato-transacao'>
                      <div className='col-md-6 col-sm-12'>
                        <div className='extrato-mes'>{mesVigente}</div>
                        <div className='extrato-data'>{`${transacao.data} - ${transacao.hora}`}</div>
                      </div>
                      <div className='col-md-6 col-sm-12'>
                        <div className={`extrato-valor ${transacao.tipo === 'Deposito' ? 'positivo' : 'negativo'}`}>
                          R$ {(transacao.valor ?? 0).toFixed(2)}
                        </div>
                        <div className={`extrato-tipo-${(transacao.tipo ?? '').toLowerCase()}`}>{transacao.tipo ?? 'N/A'}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='col-12'><p>Nenhuma transação encontrada.</p></div>
                )}
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
};

export default ExtratoComponent;

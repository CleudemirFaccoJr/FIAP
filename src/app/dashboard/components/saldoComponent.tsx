import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, get } from 'firebase/database';

interface SaldoProps {
  userId: string;
}

const SaldoComponent: React.FC<SaldoProps> = ({ userId }) => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  useEffect(() => {
    const fetchSaldo = async () => {
      const db = getDatabase();
      const saldoRef = ref(db, `contas/${userId}/saldo`);
      const snapshot = await get(saldoRef);

      if (snapshot.exists()) {
        setSaldo(snapshot.val());
      } else {
        setSaldo(0);
      }
    };

    fetchSaldo();
  }, [userId]);

  const toggleMostrarSaldo = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  return (
    <div className="saldo-card">
      <div className="saldo-header">
        <h4>Saldo</h4>
        <span className="saldo-icone" onClick={toggleMostrarSaldo} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={mostrarSaldo ? faEye : faEyeSlash} />
        </span>
      </div>
      <div className="saldo-conteudo">
        <h2>R$ {mostrarSaldo && saldo !== null ? saldo.toFixed(2) : '*****'}</h2>
        <p>Conta Corrente</p>
      </div>
    </div>
  );
};

export default SaldoComponent;
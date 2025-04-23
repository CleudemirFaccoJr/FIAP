import React from "react";

interface ExcluirTransacaoModalProps {
  transacao: { id: number; name: string } | null;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ExcluirTransacaoModal: React.FC<ExcluirTransacaoModalProps> = ({
    transacao,
  onDelete,
  onClose,
}) => {
  if (!transacao) return null;

  const handleDelete = () => {
    if (transacao?.id) {
      onDelete(transacao.id);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Excluir Transação</h3>
        <p>Tem certeza de que deseja excluir a transação &quot;{transacao.name}&quot;?</p>
        <button onClick={handleDelete}>Excluir</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ExcluirTransacaoModal;

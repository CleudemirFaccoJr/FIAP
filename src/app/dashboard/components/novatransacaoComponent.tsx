const NovaTransacaoComponent = () => {
    return (
        <div className="nova-transacao-card">
            <h1 className="nova-transacao-titulo">Nova Transação</h1>
            <form>
                <div className="form-group">
                    <select id="tipo" name="tipo" className="tipo-transacao-select" required>
                        <option value="">Selecione o tipo de transação</option>
                        <option value="entrada">Depósito</option>
                        <option value="saida">Transfência</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" id="valor" name="valor" className="valor-input" placeholder="R$ 00,00" required />
                </div>
                <button type="submit" className="concluir-button">Concluir</button>
            </form>
        </div>
    );
}

export default NovaTransacaoComponent;
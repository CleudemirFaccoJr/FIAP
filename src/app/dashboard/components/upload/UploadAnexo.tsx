// src/components/Upload/UploadAnexo.tsx
import React, { useState } from "react";
import { enviarAnexo, removerAnexo } from "./uploadUtils";

type UploadAnexoProps = {
  onUploadSuccess: (url: string) => void;
  onRemoveSuccess: () => void;
  idUsuario: string;
  urlAtual?: string;
};

const UploadAnexo: React.FC<UploadAnexoProps> = ({
  onUploadSuccess,
  onRemoveSuccess,
  idUsuario,
  urlAtual = null,
}) => {
  const [uploadStatus, setUploadStatus] = useState<"enviado" | "erro" | null>(null);
  const [anexoUrl, setAnexoUrl] = useState<string | null>(urlAtual || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await enviarAnexo(file, idUsuario);
      setAnexoUrl(url);
      setUploadStatus("enviado");
      onUploadSuccess(url);
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadStatus("erro");
    }
  };

  const handleRemover = async () => {
    if (!anexoUrl) return;

    try {
      await removerAnexo(anexoUrl);
      setAnexoUrl(null);
      setUploadStatus(null);
      onRemoveSuccess();
    } catch (error) {
      alert("Erro ao remover o anexo.");
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="anexo">Anexo</label>
      <input
        type="file"
        id="anexo"
        className="form-control"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
      />

      {uploadStatus === "enviado" && (
        <p className="mensagem-sucesso">Arquivo enviado com sucesso!</p>
      )}
      {uploadStatus === "erro" && (
        <p className="mensagem-erro">Erro ao enviar o arquivo.</p>
      )}

      {anexoUrl && (
        <button type="button" onClick={handleRemover} className="remover-anexo-button">
          Remover Anexo
        </button>
      )}
    </div>
  );
};

export default UploadAnexo;

import React, { useCallback, useState } from "react";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { useItemProgressListener, useItemFinishListener, useUploader } from "@rpldy/uploady";
import type { PreviewComponentProps } from "@rpldy/upload-preview";

interface UploadAnexoProps {
  idUsuario: string;
  idTransacao: string;
  dataTransacao: string; // Format: DD-MM-YYYY
  onUploadSuccess?: (url: string) => void;
  onRemoveSuccess: () => void;
  urlAtual: string | null;
}

const PreviewComProgresso: React.FC<PreviewComponentProps> = ({ id, url }) => {
  const [progresso, setProgresso] = useState(0);

  useItemProgressListener((item) => {
    if (item.id === id) {
      setProgresso(item.completed);
    }
  });

  return (
    <div className="mt-2">
      {url && url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
        <img src={url} alt="Preview" style={{ maxWidth: "100px", opacity: progresso / 100 }} />
      ) : (
        <p>Arquivo enviado: {url ? url.split("/").pop() : ""}</p>
      )}
      <div className="progress mt-1">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progresso}%` }}
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progresso}%
        </div>
      </div>
    </div>
  );
};

const UploadAnexo: React.FC<UploadAnexoProps> = ({
  idUsuario,
  idTransacao,
  dataTransacao,
  onUploadSuccess,
  onRemoveSuccess 
}) => {

  useItemFinishListener((item) => {
    if (item.uploadResponse?.data?.url && onUploadSuccess) {
      onUploadSuccess(item.uploadResponse.data.url);
    } else if (item.uploadResponse?.response?.url && onUploadSuccess) {
      onUploadSuccess(item.uploadResponse.response.url);
    } else {
      console.warn("URL do anexo não encontrada na resposta do upload.", item.uploadResponse);
    }
  });

  const getPreviewProps = useCallback((item: { id: string }) => ({ id: item.id }), []);

  return (
    <> {/* Use React Fragment as Uploady is no longer here */}
      <UploadButton className="btn btn-primary">Anexar Arquivo</UploadButton>
      <UploadPreview
        PreviewComponent={PreviewComProgresso}
        previewComponentProps={getPreviewProps}
      />
    </>
  );
};

export default UploadAnexo;
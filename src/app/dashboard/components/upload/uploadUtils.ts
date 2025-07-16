export const enviarAnexo = async (
  arquivo: File,
  idUsuario: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("arquivo", arquivo);
  formData.append("idUsuario", idUsuario);

  const hoje = new Date().toISOString().slice(0, 10);
  formData.append("data", hoje);

  const response = await fetch("https://faccocreative.com.br/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Erro ao enviar anexo.");

  const data = await response.json();
  return data.url;
};

export const removerAnexo = async (url: string): Promise<void> => {
  const response = await fetch("https://seusite.com/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) throw new Error("Erro ao remover anexo.");
};

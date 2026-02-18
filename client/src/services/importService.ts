import { api } from "./api";

interface ImportResult {
  imported: number;
  errors: { index: number; message: string }[];
}

export async function importArticles(file: File): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/import/articles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

import { api } from "./api";
import type {
  Article,
  ArticleFormData,
  ArticleStats,
  PaginatedResponse,
} from "@/types";

export async function getStats(): Promise<ArticleStats> {
  const { data } = await api.get("/articles/stats");

  return data;
}

export async function createArticle(body: ArticleFormData): Promise<Article> {
  const { data } = await api.post("/articles", body);

  return data;
}

export async function getAllArticles(
  params?: Record<string, string>,
): Promise<PaginatedResponse<Article>> {
  const { data } = await api.get("/articles", { params });

  return data;
}

export async function deleteArticle(id: string): Promise<void> {
  await api.delete(`/articles/${id}`);
}

export async function updateArticleStatus(
  id: string,
  status: string,
): Promise<Article> {
  const { data } = await api.patch(`/articles/${id}/status`, { status });

  return data;
}

export async function getArticleById(id: string): Promise<Article> {
  const { data } = await api.get(`/articles/${id}`);

  return data;
}

export async function updateArticle(
  id: string,
  body: Partial<ArticleFormData>,
): Promise<Article> {
  const { data } = await api.put(`/articles/${id}`, body);

  return data;
}

export async function bulkUpdateArticleStatus(
  ids: string[],
  status: string,
): Promise<{ count: number }> {
  const { data } = await api.patch("/articles/bulk-status", { ids, status });

  return data;
}

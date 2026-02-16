import { api } from "./api";
import type { Article, ArticleStats, PaginatedResponse } from "@/types";

export async function getStats(): Promise<ArticleStats> {
  const { data } = await api.get("/articles/stats");

  return data;
}

export async function createArticle(body: {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categoryIds: string[];
  networkId: string;
  featured?: boolean;
}): Promise<Article> {
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

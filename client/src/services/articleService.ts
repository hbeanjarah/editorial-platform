import { api } from "./api";
import type { ArticleStats } from "@/types";

export async function getStats(): Promise<ArticleStats> {
  const { data } = await api.get("/articles/stats");

  return data;
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  getStats,
  getAllArticles,
  deleteArticle,
  updateArticleStatus,
  updateArticle,
  getArticleById,
} from "@/services/articleService";
import { queryKeys } from "@/lib/queryKeys";
import type { ArticleFormData } from "@/types";

export function useArticleStats() {
  return useQuery({
    queryKey: queryKeys.articles.stats(),
    queryFn: getStats,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useGetArticles(filters: Record<string, string> = {}) {
  return useQuery({
    queryKey: queryKeys.articles.all(filters),
    queryFn: () => getAllArticles(filters),
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all({}) });
    },
  });
}

export function useUpdateArticleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateArticleStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all({}) });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<ArticleFormData>;
    }) => updateArticle(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all({}) });
    },
  });
}

export function useGetArticleById(id: string) {
  return useQuery({
    queryKey: queryKeys.articles.detail(id),
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
}

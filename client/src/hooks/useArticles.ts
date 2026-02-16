import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  getStats,
  getAllArticles,
} from "@/services/articleService";
import { queryKeys } from "@/lib/queryKeys";

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

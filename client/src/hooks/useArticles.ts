import { useQuery } from "@tanstack/react-query";
import * as articleService from "@/services/articleService";
import { queryKeys } from "@/lib/queryKeys";

export function useArticleStats() {
  return useQuery({
    queryKey: queryKeys.articles.stats(),
    queryFn: articleService.getStats,
  });
}

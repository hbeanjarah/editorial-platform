import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importArticles } from "@/services/importService";

export function useImportArticles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

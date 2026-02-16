import { useNavigate } from "react-router";
import { useUpdateArticle } from "@/hooks/useArticles";
import ArticleForm from "@/components/articles/ArticleForm";
import ArticlePreview from "@/components/articles/ArticlePreview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import type { Article, ArticleFormData } from "@/types";
import { useAutoSave } from "@/hooks/useAutoSave";

export default function ArticleEditFormInner({
  article,
}: {
  article: Article;
}) {
  const navigate = useNavigate();
  const updateMutation = useUpdateArticle();

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    author: article.author,
    categoryIds: article.categories.map((c) => c.categoryId),
    networkId: article.networkId,
    featured: article.featured,
  });

  const autoSave = useCallback(() => {
    updateMutation.mutate(
      { id: article.id, body: formData },
      {
        onSuccess: () => setLastSaved(new Date()),
      },
    );
  }, [formData, article.id, updateMutation]);

  const handleSubmit = () => {
    updateMutation.mutate(
      { id: article.id, body: formData },
      {
        onSuccess: () => {
          toast.success("Article modifié");
          navigate("/articles");
        },
        onError: (err) => {
          const message =
            (err as AxiosError<{ error: string }>).response?.data?.error ??
            "Erreur lors de la modification";
          toast.error(message);
        },
      },
    );
  };

  useAutoSave(autoSave, formData); // Auto-save every 30 seconds if there are changes

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Modifier l'article</h1>
          {lastSaved && (
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sauvegardé à {lastSaved.toLocaleTimeString("fr-FR")}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/articles")}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="bg-brand hover:bg-brand-hover"
          >
            {updateMutation.isPending ? "Enregistrement." : "Enregistrer"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArticleForm formData={formData} onChange={setFormData} />
        <ArticlePreview formData={formData} />
      </div>
    </div>
  );
}

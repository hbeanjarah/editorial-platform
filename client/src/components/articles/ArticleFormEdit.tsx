import { useNavigate } from "react-router";
import { useUpdateArticle } from "@/hooks/useArticles";
import ArticleForm from "@/components/articles/ArticleForm";
import ArticlePreview from "@/components/articles/ArticlePreview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";
import type { Article, ArticleFormData } from "@/types";

export default function ArticleEditFormInner({
  article,
}: {
  article: Article;
}) {
  const navigate = useNavigate();
  const updateMutation = useUpdateArticle();

  const [formData, setFormData] = useState<ArticleFormData>({
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    author: article.author,
    categoryIds: article.categories.map((c) => c.categoryId),
    networkId: article.networkId,
    featured: article.featured,
  });

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Modifier l'article</h1>
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

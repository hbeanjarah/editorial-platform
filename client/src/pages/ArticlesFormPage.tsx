import ArticleForm from "@/components/articles/ArticleForm";
import ArticlePreview from "@/components/articles/ArticlePreview";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateArticle } from "@/hooks/useArticles";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export default function ArticleFormPage() {
  const { mutate: createArticleMutation, isPending: isCreatingArticle } =
    useCreateArticle();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    categoryIds: [] as string[],
    networkId: "",
    featured: false,
  });

  const handleSubmit = () => {
    createArticleMutation(formData, {
      onSuccess: () => {
        toast.success("Article créé");
        navigate("/articles");
      },
      onError: (err) => {
        const message =
          (err as AxiosError<{ error: string }>).response?.data?.error ??
          "Erreur lors de la création";
        toast.error(message);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nouvel article</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/articles")}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreatingArticle}
            className="bg-brand hover:bg-brand-hover"
          >
            {isCreatingArticle ? "Création" : "Publier"}
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

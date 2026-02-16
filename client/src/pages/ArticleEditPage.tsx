import { useParams } from "react-router";
import { useGetArticleById } from "@/hooks/useArticles";

import ArticleFormEdit from "@/components/articles/ArticleFormEdit";

export default function ArticleEditPage() {
  const { id } = useParams();
  const { data: article, isLoading } = useGetArticleById(id!);

  if (isLoading) return <p className="text-muted-foreground p-6">Chargement</p>;
  if (!article)
    return <p className="text-muted-foreground p-6">Article introuvable</p>;

  return <ArticleFormEdit article={article!} />;
}

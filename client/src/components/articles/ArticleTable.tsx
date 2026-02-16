import { useNavigate } from "react-router";
import { Pencil, Trash2, Star, Archive, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";
import { useDeleteArticle, useUpdateArticleStatus } from "@/hooks/useArticles";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { formatDate } from "@/lib/formatDate";

const statusLabel: Record<string, { text: string; class: string }> = {
  published: {
    text: "Publié",
    class: "bg-status-published/10 text-status-published",
  },
  draft: { text: "Brouillon", class: "bg-status-draft/10 text-status-draft" },
  archived: {
    text: "Archivé",
    class: "bg-status-archived/10 text-status-archived",
  },
};

export const ArticleStatus = {
  Draft: "draft",
  Published: "published",
  Archived: "archived",
} as const;

interface Props {
  articles: Article[];
}

export default function ArticleTable({ articles }: Props) {
  const navigate = useNavigate();

  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: updateStatus } = useUpdateArticleStatus();

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id, {
      onSuccess: () => toast.success("Article supprimé"),
      onError: (err) => {
        const message =
          (err as AxiosError<{ error: string }>).response?.data?.error ??
          "Erreur suppression";
        toast.error(message);
      },
    });
  };

  const handleChangeStatus = (id: string, status: string) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () =>
          toast.success(`Statut changé en
  ${statusLabel[status].text.toLowerCase()}`),
        onError: () => toast.error("Erreur changement de statut"),
      },
    );
  };

  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Aucun article trouvé
      </p>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 font-medium">Titre</th>
            <th className="text-left p-3 font-medium">Auteur</th>
            <th className="text-left p-3 font-medium">Statut</th>
            <th className="text-left p-3 font-medium">Réseau</th>
            <th className="text-left p-3 font-medium">Catégories</th>
            <th className="text-left p-3 font-medium">Date</th>
            <th className="text-right p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b hover:bg-muted/30">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{article.title}</span>
                  {article.featured && (
                    <Star
                      size={14}
                      className="text-status-featured fill-status-featured"
                    />
                  )}
                </div>
              </td>
              <td className="p-3 text-muted-foreground">{article.author}</td>
              <td className="p-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full
  ${statusLabel[article.status].class}`}
                >
                  {statusLabel[article.status].text}
                </span>
              </td>
              <td className="p-3 text-muted-foreground">
                {article.network.name}
              </td>
              <td className="p-3">
                <div className="flex gap-1">
                  {article.categories.map((ca) => (
                    <Badge
                      key={ca.categoryId}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: ca.category.color,
                        color: ca.category.color,
                      }}
                    >
                      {ca.category.name}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="p-3 text-muted-foreground">
                {formatDate(article.createdAt)}
              </td>
              <td className="p-3">
                <div className="flex gap-1 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => navigate(`/articles/${article.id}/edit`)}
                  >
                    <Pencil size={14} />
                  </Button>

                  {article.status === ArticleStatus.Draft && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeStatus(article.id, ArticleStatus.Published)
                      }
                    >
                      <Send size={14} />
                    </Button>
                  )}

                  {article.status === ArticleStatus.Published && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeStatus(article.id, ArticleStatus.Archived)
                      }
                    >
                      <Archive size={14} />
                    </Button>
                  )}

                  {article.status === ArticleStatus.Archived && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeStatus(article.id, ArticleStatus.Draft)
                      }
                    >
                      <RotateCcw size={14} />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

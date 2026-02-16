import { useNavigate } from "react-router";
import { Pencil, Trash2, Star, Archive, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";
import {
  useDeleteArticle,
  useUpdateArticle,
  useUpdateArticleStatus,
} from "@/hooks/useArticles";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { formatDate } from "@/lib/date";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmModal";

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
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export default function ArticleTable({
  articles,
  onSelectionChange,
  selectedIds = [],
}: Props) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const navigate = useNavigate();

  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: updateStatus } = useUpdateArticleStatus();
  const { mutate: featuredArticle } = useUpdateArticle();

  const allSelected =
    articles.length > 0 &&
    articles.every((a) => (selectedIds || []).includes(a.id));

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

  const handleFeaturedArticle = (article: Article) => {
    featuredArticle(
      { id: article.id, body: { featured: !article.featured } },
      {
        onSuccess: () =>
          toast.success(
            article.featured ? "Retiré mis en avant" : "Mis en avant",
          ),
        onError: () => toast.error("Erreur mise en avant"),
      },
    );
  };

  const selectAllArticles = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(articles.map((a) => a.id));
    }
  };

  const selectArticle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((s) => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Aucun article trouvé
      </p>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={selectAllArticles}
                  className="cursor-pointer"
                />
              </th>
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
                  <Checkbox
                    checked={(selectedIds || []).includes(article.id)}
                    onCheckedChange={() => selectArticle(article.id)}
                    className="cursor-pointer"
                  />
                </td>

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
                          handleChangeStatus(
                            article.id,
                            ArticleStatus.Published,
                          )
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
                      onClick={() => handleFeaturedArticle(article)}
                    >
                      <Star
                        size={14}
                        className={
                          article.featured
                            ? "text-status-featured fill-status-featured"
                            : "text-muted-foreground"
                        }
                      />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
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

      <ConfirmDialog
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onConfirm={() => {
          if (selectedArticle) handleDeleteArticle(selectedArticle.id);
          setSelectedArticle(null);
        }}
        description={`Supprimer l'article "${selectedArticle?.title}" ? Cette action est
  irréversible.`}
      />
    </>
  );
}

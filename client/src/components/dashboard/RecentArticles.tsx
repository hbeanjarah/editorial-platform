import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetArticles } from "@/hooks/useArticles";
import { formatDate } from "@/lib/formatDate";

const ARTICLE_LIMIT = 5;

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

export default function RecentArticles() {
  const { data, isLoading } = useGetArticles({
    status: "published",
    limit: ARTICLE_LIMIT.toString(),
  });
  const articles = data?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Articles récents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : articles.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun article publié</p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground">
                  {a.network.name} · {formatDate(a.createdAt)}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full
  whitespace-nowrap ${statusLabel[a.status].class}`}
              >
                {statusLabel[a.status].text}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

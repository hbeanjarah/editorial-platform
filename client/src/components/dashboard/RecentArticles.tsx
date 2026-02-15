import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const articles = [
  {
    title: "Refonte du parcours client B2B chez Renault",
    date: "14 fév. 2026",
    status: "published",
    network: "TARAM France",
  },
  {
    title: "Migration AWS vers GCP : retour d'expérience",
    date: "11 fév. 2026",
    status: "published",
    network: "TARAM Europe",
  },
  {
    title: "Pourquoi on a abandonné Figma pour Penpot",
    date: "7 fév. 2026",
    status: "published",
    network: "TARAM France",
  },
  {
    title: "RGPD 2026 : ce qui change pour les SaaS",
    date: "2 fév. 2026",
    status: "published",
    network: "TARAM International",
  },
  {
    title: "Notre stack technique après 3 ans de Next.js",
    date: "28 jan. 2026",
    status: "published",
    network: "TARAM Europe",
  },
];

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Articles récents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {articles.map((a) => (
          <div
            key={a.title}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{a.title}</p>
              <p className="text-xs text-muted-foreground">
                {a.network} · {a.date}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full
  whitespace-nowrap ${statusLabel[a.status].class}`}
            >
              {statusLabel[a.status].text}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

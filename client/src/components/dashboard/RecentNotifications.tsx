import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, XCircle } from "lucide-react";

const notifications = [
  {
    article: "Refonte du parcours client B2B chez Renault",
    recipients: 12,
    date: "14 fév. 2026",
    status: "sent",
  },
  {
    article: "Migration AWS vers GCP : retour d'expérience",
    recipients: 8,
    date: "11 fév. 2026",
    status: "sent",
  },
  {
    article: "RGPD 2026 : ce qui change pour les SaaS",
    recipients: 23,
    date: "2 fév. 2026",
    status: "failed",
  },
];

export default function RecentNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notifications récentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((n) => (
          <div key={n.article} className="flex items-center gap-3">
            <div className="rounded-lg bg-brand-accent/20 p-2">
              <Mail size={16} className="text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{n.article}</p>
              <p className="text-xs text-muted-foreground">
                {n.recipients} destinataires ·{n.date}
              </p>
            </div>
            {n.status === "sent" ? (
              <CheckCircle
                size={16}
                className="text-status-published shrink-0"
              />
            ) : (
              <XCircle size={16} className="text-destructive shrink-0" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDate } from "@/lib/date";

export default function NotificationHistory() {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Historique notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : !notifications || notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune notification</p>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Article</th>
                  <th className="text-left p-3 font-medium">Sujet</th>
                  <th className="text-left p-3 font-medium">Destinataires</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n) => (
                  <tr key={n.id} className="border-b">
                    <td className="p-3 font-medium">{n.article.title}</td>
                    <td className="p-3 text-muted-foreground">{n.subject}</td>
                    <td
                      className="p-3
  text-muted-foreground"
                    >
                      {n.recipients.split(",").length}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(n.sentAt)}
                    </td>
                    <td className="p-3">
                      {n.status === "sent" ? (
                        <div className="flex items-center gap-1 text-status-published">
                          <CheckCircle size={14} /> Envoyé
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-destructive">
                          <XCircle size={14} /> Échoué
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

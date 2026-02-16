import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/hooks/useNotification";
import { formatDate } from "@/lib/formatDate";
import { Mail, CheckCircle, XCircle } from "lucide-react";

export default function RecentNotifications() {
  const { data: notifications, isLoading } = useNotifications();
  const recent = notifications?.slice(0, 3) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notifications récentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : recent.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune notification</p>
        ) : (
          recent.map((n) => (
            <div key={n.id} className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-accent/20 p-2">
                <Mail size={16} className="text-brand" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {n.article.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {n.recipients.split(",").length} destinataires ·{" "}
                  {formatDate(n.sentAt)}
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
          ))
        )}
      </CardContent>
    </Card>
  );
}

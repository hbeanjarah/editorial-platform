import NotificationForm from "@/components/notifications/NotificationForm";
import NotificationHistory from "@/components/notifications/NotificationHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Envoyer</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationForm />
        </CardContent>
      </Card>
      <NotificationHistory />
    </div>
  );
}

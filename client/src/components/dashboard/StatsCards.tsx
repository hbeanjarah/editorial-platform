import { FileText, Send, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total articles",
    value: 37,
    icon: FileText,
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    label: "Publiés",
    value: 19,
    icon: Eye,
    color: "text-status-published",
    bg: "bg-status-published/10",
  },
  {
    label: "Brouillons",
    value: 11,
    icon: Send,
    color: "text-status-draft",
    bg: "bg-status-draft/10",
  },
  {
    label: "Mis en avant",
    value: 5,
    icon: Star,
    color: "text-status-featured",
    bg: "bg-status-featured/10",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-lg p-2.5 ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

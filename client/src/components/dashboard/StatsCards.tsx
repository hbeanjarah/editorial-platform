import { FileText, Send, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useArticleStats } from "@/hooks/useArticles";

export default function StatsCards() {
  const { data: statsData, isLoading } = useArticleStats();

  const cardStats = [
    {
      label: "Total articles",
      value: statsData?.total ?? 0,
      icon: FileText,
      color: "text-brand",
      bg: "bg-brand/10",
    },
    {
      label: "Publiés",
      value: statsData?.byStatus.published ?? 0,
      icon: Eye,
      color: "text-status-published",
      bg: "bg-status-published/10",
    },
    {
      label: "Brouillons",
      value: statsData?.byStatus.draft ?? 0,
      icon: Send,
      color: "text-status-draft",
      bg: "bg-status-draft/10",
    },
    {
      label: "Mis en avant",
      value: statsData?.featured ?? 0,
      icon: Star,
      color: "text-status-featured",
      bg: "bg-status-featured/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardStats.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-lg p-2.5 ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold">{isLoading ? "*" : value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

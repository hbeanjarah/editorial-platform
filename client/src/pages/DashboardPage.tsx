import StatsCards from "@/components/dashboard/StatsCards";
import CategoryChart from "@/components/dashboard/CategoryChart";
import RecentArticles from "@/components/dashboard/RecentArticles";
import RecentNotifications from "@/components/dashboard/RecentNotifications";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <RecentArticles />
      </div>
      <RecentNotifications />
    </div>
  );
}

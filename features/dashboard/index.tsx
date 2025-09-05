import { useAuthQuery } from "@/shared/hooks/useAuthQuery";
import { useGetTransactionsStats } from "../transactions/hooks/api";
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLoadingState } from "./components/loading";
import { DashboardErrorState } from "./components/error";
import { StatCard } from "./components/statsCard";
import { StatusBadge } from "./components/statusBadge";
import { TransactionChart } from "./components/transactionChart";
import { StatusDistributionChart } from "./components/statusDistributionChart";
import { TopProductsList } from "./components/topProductLIst";
import { RecentTransactionsTable } from "./components/recentTransacions";

// Format percentage
const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

export default function DashboardPage() {
  const { data: authData } = useAuthQuery();
  const { data: stats, isLoading, error } = useGetTransactionsStats();

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  if (error) {
    return <DashboardErrorState />;
  }

  if (!stats) {
    return (
      <DashboardErrorState message="Dashboard statistics are not available" />
    );
  }

  // Prepare chart data
  const hourlyChartData =
    stats.hourly_stats?.map((stat) => ({
      hour: `${stat.hour}:00`,
      transactions: stat.count,
      amount: stat.amount,
      success_rate: stat.success_rate,
    })) || [];

  const statusChartData = [
    {
      name: "Success",
      value: stats.success_count,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Pending",
      value: stats.pending_count,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Failed",
      value: stats.failed_count,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Error",
      value: stats.error_count,
      color: "hsl(var(--chart-4))",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {authData?.username || "User"}! Here's your transaction
          overview.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Transactions"
          value={stats.total_transactions.toLocaleString()}
          subtitle="All time"
          icon={<Activity className="w-6 h-6 text-chart-1" />}
        />
        <StatCard
          title="Total Revenue"
          value={stats.total_amount}
          subtitle="All time"
          icon={<DollarSign className="w-6 h-6 text-chart-2" />}
        />
        <StatCard
          title="Total Profit"
          value={stats.total_profit}
          subtitle="All time"
          icon={<TrendingUp className="w-6 h-6 text-chart-3" />}
        />
        <StatCard
          title="Success Rate"
          value={formatPercentage(stats.success_rate)}
          subtitle={`${stats.success_count} successful`}
          icon={<CheckCircle className="w-6 h-6 text-chart-4" />}
        />
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Today's Transactions"
          value={stats.today_transactions.toLocaleString()}
          icon={<Users className="w-6 h-6 text-chart-1" />}
        />
        <StatCard
          title="Today's Revenue"
          value={stats.today_amount}
          icon={<DollarSign className="w-6 h-6 text-chart-2" />}
        />
        <StatCard
          title="Today's Profit"
          value={stats.today_profit}
          icon={<TrendingUp className="w-6 h-6 text-chart-3" />}
        />
      </div>

      {/* Status Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Transaction Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="Success" count={stats.success_count} />
            <StatusBadge status="Pending" count={stats.pending_count} />
            <StatusBadge status="Failed" count={stats.failed_count} />
            <StatusBadge status="Error" count={stats.error_count} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <TransactionChart data={hourlyChartData} />
        <StatusDistributionChart data={statusChartData} />
        <TopProductsList products={stats.top_products || []} />
      </div>

      <RecentTransactionsTable transactions={stats.recent_transactions || []} />
    </div>
  );
}

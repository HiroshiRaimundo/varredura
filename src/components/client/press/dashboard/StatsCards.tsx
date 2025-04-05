
import React from 'react';
import { FileText, BarChart2, Eye, Clock } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

interface StatsCardsProps {
  totalReleases: number;
  publishedCount: number;
  totalViews: number;
  pendingCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalReleases,
  publishedCount,
  totalViews,
  pendingCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardMetricCard
        title="Total de Releases"
        value={totalReleases}
        icon={<FileText className="h-5 w-5 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Publicados"
        value={publishedCount}
        icon={<BarChart2 className="h-5 w-5 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Visualizações"
        value={totalViews}
        icon={<Eye className="h-5 w-5 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Pendentes"
        value={pendingCount}
        icon={<Clock className="h-5 w-5 text-muted-foreground" />}
      />
    </div>
  );
};

export default StatsCards;

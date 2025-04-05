
import React from "react";
import DashboardHeader from './dashboard/DashboardHeader';
import StatsCards from './dashboard/StatsCards';
import DashboardOverview from './dashboard/DashboardOverview';
import TabsSection from './dashboard/TabsSection';
import { useDashboardData } from './dashboard/hooks/useDashboardData';

interface PressDashboardProps {
  clientType?: string;
}

const PressDashboard: React.FC<PressDashboardProps> = ({ clientType = "press" }) => {
  const {
    releasesData,
    alertsData,
    publishedReleases,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab
  } = useDashboardData();

  // Calculate statistics for the dashboard
  const stats = {
    releases: releasesData.length,
    published: releasesData.filter(r => r.published).length,
    views: releasesData.reduce((sum, r) => sum + r.views, 0),
    pending: releasesData.filter(r => r.status === "pendente").length
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard de Comunicação" 
        description="Gerencie seus releases e monitore publicações"
      />
      
      <StatsCards 
        totalReleases={stats.releases}
        publishedCount={stats.published}
        totalViews={stats.views}
        pendingCount={stats.pending}
      />
      
      <DashboardOverview 
        releases={releasesData}
        alerts={alertsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TabsSection 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        publishedReleases={publishedReleases}
      />
    </div>
  );
};

export default PressDashboard;

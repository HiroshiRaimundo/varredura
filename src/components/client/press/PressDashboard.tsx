
import React, { useState } from 'react';
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";
import DashboardHeader from './dashboard/DashboardHeader';
import StatisticsCards from './dashboard/StatisticsCards';
import ChartsSection from './dashboard/ChartsSection';
import DashboardTabs from './dashboard/DashboardTabs';
import DashboardTip from './dashboard/DashboardTip';

interface PressDashboardProps {
  clientType: string;
  releases?: ReleaseMonitoringItem[];
}

// Mock data for the dashboard
const mockPublishedReleases = [
  {
    id: "1",
    releaseTitle: "Nova tecnologia ambiental lançada no mercado",
    websiteName: "Folha de São Paulo",
    publishedDate: "10/06/2023",
    publishedTime: "14:30",
    url: "https://exemplo.com/noticia1",
    isVerified: true,
    status: "published",
    clientType: "observatory"
  },
  {
    id: "2",
    releaseTitle: "Resultados do estudo sobre qualidade do ar divulgados",
    websiteName: "G1",
    publishedDate: "15/05/2023",
    publishedTime: "10:00",
    url: "https://exemplo.com/noticia2",
    isVerified: true,
    status: "published",
    clientType: "researcher"
  },
  {
    id: "3",
    releaseTitle: "Novo programa de monitoramento ambiental",
    websiteName: "Estadão",
    publishedDate: "20/06/2023",
    publishedTime: "09:00",
    url: "https://exemplo.com/noticia3",
    isVerified: true,
    status: "published",
    clientType: "institution"
  }
];

const recentActivity = [
  {
    id: "1",
    action: "Release aprovado",
    title: "Nova tecnologia sustentável",
    date: "Hoje, 14:30",
    status: "approved"
  },
  {
    id: "2",
    action: "Release publicado",
    title: "Resultados de pesquisa ambiental",
    date: "Ontem, 09:15",
    status: "published"
  },
  {
    id: "3",
    action: "Release enviado",
    title: "Comunicado sobre reciclagem",
    date: "10/06/2023, 11:45",
    status: "pending"
  }
];

const PressDashboard: React.FC<PressDashboardProps> = ({ clientType, releases = mockPublishedReleases }) => {
  const [timeRange, setTimeRange] = useState("last30days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isRefreshing={isRefreshing}
        refreshData={refreshData}
      />

      <StatisticsCards />

      <ChartsSection />

      <DashboardTabs releases={releases} recentActivity={recentActivity} />

      <DashboardTip />
    </div>
  );
};

export default PressDashboard;

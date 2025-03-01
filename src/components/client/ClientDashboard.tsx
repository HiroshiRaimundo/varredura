
import React, { useMemo } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { 
  getCategoryData, 
  getFrequencyData, 
  getRadarData, 
  getResponsibleData, 
  generateTrendData 
} from "../dashboard/DashboardUtils";
import DashboardControls from "../dashboard/DashboardControls";
import ClientHeader from "./ClientHeader";
import ClientLegend from "./ClientLegend";
import ObservatoryDashboard from "./dashboards/ObservatoryDashboard";
import ResearcherDashboard from "./dashboards/ResearcherDashboard";
import PoliticianDashboard from "./dashboards/PoliticianDashboard";
import InstitutionDashboard from "./dashboards/InstitutionDashboard";

interface ClientDashboardProps {
  clientType: "observatory" | "researcher" | "politician" | "institution";
  monitoringItems: MonitoringItem[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  clientType,
  monitoringItems,
  timeRange,
  setTimeRange,
  handleExport,
  isAuthenticated
}) => {
  // Generate data based on the selected time range
  const trendData = useMemo(() => 
    generateTrendData(monitoringItems, timeRange), 
    [monitoringItems, timeRange]
  );
  
  // Prepare data for additional charts based on monitoringItems
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  // Render the appropriate dashboard based on client type
  const renderDashboard = () => {
    switch (clientType) {
      case "observatory":
        return (
          <ObservatoryDashboard 
            trendData={trendData}
            categoryData={categoryData}
            frequencyData={frequencyData}
          />
        );
      
      case "researcher":
        return (
          <ResearcherDashboard 
            trendData={trendData}
            categoryData={categoryData}
            frequencyData={frequencyData}
            responsibleData={responsibleData}
            radarData={radarData}
          />
        );
      
      case "politician":
        return (
          <PoliticianDashboard
            trendData={trendData}
            frequencyData={frequencyData}
            radarData={radarData}
          />
        );
      
      case "institution":
        return (
          <InstitutionDashboard
            trendData={trendData}
            categoryData={categoryData}
            radarData={radarData}
            responsibleData={responsibleData}
          />
        );
      
      default:
        return (
          <ObservatoryDashboard 
            trendData={trendData}
            categoryData={categoryData}
            frequencyData={frequencyData}
          />
        );
    }
  };

  return (
    <div className="grid gap-6">
      <ClientHeader clientType={clientType} />

      <DashboardControls
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {renderDashboard()}

      <ClientLegend />
    </div>
  );
};

export default ClientDashboard;

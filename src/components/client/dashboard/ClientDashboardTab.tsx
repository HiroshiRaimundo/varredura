
import React from "react";
import ObservatoryDashboard from "../dashboards/ObservatoryDashboard";
import ResearcherDashboard from "../dashboards/ResearcherDashboard";
import PoliticianDashboard from "../dashboards/PoliticianDashboard";
import InstitutionDashboard from "../dashboards/InstitutionDashboard";
import JournalistDashboard from "../dashboards/JournalistDashboard";
import { ClientType } from "../ClientUtils";

interface ClientDashboardTabProps {
  clientType: ClientType;
  monitoringItems?: any[];
  timeRange?: string;
  setTimeRange?: (value: string) => void;
  handleExport?: () => void;
  isAuthenticated?: boolean;
}

const ClientDashboardTab: React.FC<ClientDashboardTabProps> = ({ 
  clientType,
  monitoringItems = [],
  timeRange = "mensal",
  setTimeRange = () => {},
  handleExport = () => {},
  isAuthenticated = false
}) => {
  // Create mock data for the dashboards to prevent prop errors
  const mockData = {
    trendData: [
      { name: "Jan", value: 10 },
      { name: "Feb", value: 20 },
      { name: "Mar", value: 15 }
    ],
    categoryData: [
      { name: "Category 1", value: 30 },
      { name: "Category 2", value: 40 },
      { name: "Category 3", value: 20 }
    ],
    frequencyData: [
      { name: "Daily", value: 25 },
      { name: "Weekly", value: 45 },
      { name: "Monthly", value: 30 }
    ],
    responsibleData: [
      { name: "Team A", value: 35 },
      { name: "Team B", value: 25 },
      { name: "Team C", value: 40 }
    ],
    radarData: [
      { subject: "Data 1", A: 80, B: 90, fullMark: 100 },
      { subject: "Data 2", A: 70, B: 60, fullMark: 100 },
      { subject: "Data 3", A: 50, B: 80, fullMark: 100 }
    ]
  };

  // Render appropriate dashboard based on client type
  const renderDashboard = () => {
    switch (clientType) {
      case "observatory":
        return <ObservatoryDashboard 
          trendData={mockData.trendData}
          categoryData={mockData.categoryData}
          frequencyData={mockData.frequencyData}
        />;
      case "researcher":
        return <ResearcherDashboard 
          trendData={mockData.trendData}
          categoryData={mockData.categoryData}
          frequencyData={mockData.frequencyData}
          responsibleData={mockData.responsibleData}
          radarData={mockData.radarData}
        />;
      case "politician":
        return <PoliticianDashboard 
          trendData={mockData.trendData}
          frequencyData={mockData.frequencyData}
          radarData={mockData.radarData}
        />;
      case "institution":
        return <InstitutionDashboard 
          trendData={mockData.trendData}
          categoryData={mockData.categoryData}
          radarData={mockData.radarData}
          responsibleData={mockData.responsibleData}
        />;
      case "journalist":
        return <JournalistDashboard 
          trendData={mockData.trendData}
          categoryData={mockData.categoryData}
          frequencyData={mockData.frequencyData}
          radarData={mockData.radarData}
        />;
      case "press":
        // For press client type, we'll reuse the JournalistDashboard
        return <JournalistDashboard 
          trendData={mockData.trendData}
          categoryData={mockData.categoryData}
          frequencyData={mockData.frequencyData}
          radarData={mockData.radarData}
        />;
      default:
        return <div>Dashboard not available for this client type</div>;
    }
  };

  return renderDashboard();
};

export default ClientDashboardTab;

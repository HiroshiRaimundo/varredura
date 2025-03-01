
import React from "react";
import ObservatoryDashboard from "../dashboards/ObservatoryDashboard";
import ResearcherDashboard from "../dashboards/ResearcherDashboard";
import PoliticianDashboard from "../dashboards/PoliticianDashboard";
import InstitutionDashboard from "../dashboards/InstitutionDashboard";
import JournalistDashboard from "../dashboards/JournalistDashboard";
import { ClientType } from "../ClientUtils";

interface ClientDashboardTabProps {
  clientType: ClientType;
}

const ClientDashboardTab: React.FC<ClientDashboardTabProps> = ({ clientType }) => {
  // Render appropriate dashboard based on client type
  const renderDashboard = () => {
    switch (clientType) {
      case "observatory":
        return <ObservatoryDashboard />;
      case "researcher":
        return <ResearcherDashboard />;
      case "politician":
        return <PoliticianDashboard />;
      case "institution":
        return <InstitutionDashboard />;
      case "journalist":
        return <JournalistDashboard />;
      case "press":
        // For press client type, we'll reuse the JournalistDashboard
        // This could be replaced with a dedicated PressDashboard in the future
        return <JournalistDashboard />;
      default:
        return <div>Dashboard not available for this client type</div>;
    }
  };

  return renderDashboard();
};

export default ClientDashboardTab;

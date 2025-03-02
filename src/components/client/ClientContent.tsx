
import React from "react";
import { ClientType } from "@/components/client/ClientTypes";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import LegislationAlerts from "./LegislationAlerts";
import AnalysisToolsSection from "./tools/AnalysisToolsSection";
import MonitoringTab from "./monitoring/MonitoringTab";
// Note: PressTab import was removed as it was causing errors

interface ClientContentProps {
  activeTab: string;
  clientType: ClientType;
}

const ClientContent: React.FC<ClientContentProps> = ({ activeTab, clientType }) => {
  console.log("ClientContent rendering with tab:", activeTab, "and client type:", clientType);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ClientDashboardTab clientType={clientType} />;
      case "alerts":
        return <LegislationAlerts clientType={clientType} />;
      case "monitoring":
        return <MonitoringTab clientType={clientType} />;
      case "tools":
        return <AnalysisToolsSection clientType={clientType} />;
      case "press":
        // Handle press tab without the import
        return <div className="space-y-6">
          <h2 className="text-2xl font-bold">Assessoria de Imprensa</h2>
          <p>Funcionalidade de Assessoria em desenvolvimento.</p>
        </div>;
      default:
        return <ClientDashboardTab clientType={clientType} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderTabContent()}
    </div>
  );
};

export default ClientContent;

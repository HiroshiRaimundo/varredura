
import React from "react";
import { ClientType } from "./ClientTypes";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import LegislationAlerts from "./LegislationAlerts";
import AnalysisToolsSection from "./tools/AnalysisToolsSection";
import MonitoringTab from "./monitoring/MonitoringTab";
import PressTab from "./PressTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";

interface ClientContentProps {
  activeTab: string;
  clientType: ClientType;
}

const ClientContent: React.FC<ClientContentProps> = ({ activeTab, clientType }) => {
  const handleDatasetDownload = () => {
    console.log("Download dataset");
  };

  const handleComparisonView = () => {
    console.log("View comparison");
  };

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsContent value="dashboard">
        <ClientDashboardTab clientType={clientType} />
      </TabsContent>
      
      <TabsContent value="alerts">
        {/* Passing empty props since LegislationAlerts doesn't use clientType */}
        <LegislationAlerts />
      </TabsContent>
      
      <TabsContent value="analysis">
        <AnalysisToolsSection 
          clientType={clientType} 
          onDatasetDownload={handleDatasetDownload}
          onComparisonView={handleComparisonView}
        />
      </TabsContent>
      
      <TabsContent value="monitoring">
        <MonitoringTab clientType={clientType} />
      </TabsContent>
      
      {clientType === "press" && (
        <TabsContent value="press">
          <PressTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ClientContent;

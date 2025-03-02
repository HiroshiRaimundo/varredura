
import React from "react";
import { ClientType } from "./ClientTypes";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import LegislationAlerts from "./LegislationAlerts";
import AnalysisToolsSection from "./tools/AnalysisToolsSection";
import MonitoringTab from "./monitoring/MonitoringTab";
import PressTab from "./PressTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LegislationAlert } from "@/hooks/monitoring/types";

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

  // Dummy alerts data that matches the LegislationAlert type
  const alerts: LegislationAlert[] = [
    { 
      id: "1", 
      title: "Nova legislação", 
      description: "Detalhes da legislação", 
      date: "2024-05-01", 
      isRead: false,
      url: "https://example.com/legislation/1"
    },
    { 
      id: "2", 
      title: "Atualização legal", 
      description: "Detalhes da atualização", 
      date: "2024-05-02", 
      isRead: true,
      url: "https://example.com/legislation/2"
    },
  ];

  const handleMarkAsRead = (id: string) => {
    console.log("Mark as read:", id);
  };

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsContent value="dashboard">
        <ClientDashboardTab clientType={clientType} />
      </TabsContent>
      
      <TabsContent value="alerts">
        <LegislationAlerts 
          alerts={alerts}
          onMarkAsRead={handleMarkAsRead}
          showAlerts={true}
        />
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
          <PressTab clientType={clientType} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ClientContent;

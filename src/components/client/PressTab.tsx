
import React from "react";
import { ClientType } from "../ClientTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PressDashboard from "./press/PressDashboard";
import ReleaseMonitoringDashboard from "./press/ReleaseMonitoringDashboard";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

// Sample data for demonstration
const sampleMonitoringResults: ReleaseMonitoringItem[] = [
  {
    id: "1",
    releaseTitle: "Novo Estudo Ambiental",
    websiteName: "Portal Ambiental",
    publishedDate: "2023-05-15",
    publishedTime: "14:30",
    url: "https://example.com/release1",
    isVerified: true
  },
  {
    id: "2",
    releaseTitle: "Relatório de Sustentabilidade",
    websiteName: "Jornal Verde",
    publishedDate: "2023-05-10",
    publishedTime: "09:15",
    url: "https://example.com/release2",
    isVerified: false
  }
];

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="media">Mídia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <PressDashboard clientType={clientType} />
        </TabsContent>
        
        <TabsContent value="media">
          <ReleaseMonitoringDashboard monitoringResults={sampleMonitoringResults} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;


import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PressReleaseDashboard from "./PressReleaseDashboard";
import ReleaseMonitoringDashboard from "./ReleaseMonitoringDashboard";
import PressReleaseForm from "./PressReleaseForm";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

// Dados simulados para monitoramento de releases
const mockReleases: ReleaseMonitoringItem[] = [
  {
    id: "1",
    releaseTitle: "Nova política ambiental para a Amazônia",
    title: "Nova política ambiental para a Amazônia",
    websiteName: "Portal Ambiental",
    publishedDate: "2023-04-15",
    publishedTime: "14:30",
    url: "https://example.com/release1",
    isVerified: true,
    status: "publicado"
  },
  {
    id: "2",
    releaseTitle: "Relatório sobre desmatamento na região Norte",
    title: "Relatório sobre desmatamento na região Norte",
    websiteName: "Jornal do Meio Ambiente",
    publishedDate: "2023-04-12",
    publishedTime: "09:45",
    url: "https://example.com/release2",
    isVerified: false,
    status: "pendente"
  }
];

const PressTab: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="new">Novo Release</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <PressReleaseDashboard />
        </TabsContent>
        
        <TabsContent value="new">
          <PressReleaseForm />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <ReleaseMonitoringDashboard releases={mockReleases} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;

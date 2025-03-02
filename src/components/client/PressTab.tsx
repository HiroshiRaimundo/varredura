
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import PressReleaseForm from "./press/PressReleaseForm";
import PressReleaseDashboard from "./press/PressReleaseDashboard";
import ReleaseMonitoringDashboard from "./press/ReleaseMonitoringDashboard";
import PressReleaseHelp from "./press/PressReleaseHelp";
import { ClientType } from "@/types/clientTypes";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Create mock data for monitoring results
  const mockMonitoringResults = {
    totalReleases: 28,
    publishedCount: 18,
    pendingCount: 6,
    rejectedCount: 4,
    byOutlet: [
      { name: "Jornal Nacional", count: 5 },
      { name: "Folha de São Paulo", count: 4 },
      { name: "G1", count: 7 },
      { name: "CNN Brasil", count: 2 }
    ],
    recentPublications: [
      { id: "1", title: "Lançamento de produto revoluciona mercado", outlet: "G1", date: "2023-06-01", url: "#" },
      { id: "2", title: "Empresa anuncia expansão internacional", outlet: "Folha de São Paulo", date: "2023-05-28", url: "#" },
      { id: "3", title: "Nova tecnologia promete transformar indústria", outlet: "CNN Brasil", date: "2023-05-25", url: "#" }
    ]
  };

  return (
    <div className="space-y-4">
      <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertTitle>Área de Assessoria de Imprensa</AlertTitle>
        <AlertDescription>
          Gerencie seus releases, monitore publicações e acompanhe o desempenho da sua comunicação.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="help">Ajuda</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <PressReleaseDashboard clientType={clientType} />
        </TabsContent>

        <TabsContent value="releases">
          <PressReleaseForm clientType={clientType} />
        </TabsContent>

        <TabsContent value="monitoring">
          <ReleaseMonitoringDashboard 
            clientType={clientType} 
            monitoringResults={mockMonitoringResults} 
          />
        </TabsContent>

        <TabsContent value="help">
          <PressReleaseHelp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;

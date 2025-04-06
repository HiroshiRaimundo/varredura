
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientType } from "@/types/clientTypes";
import { LegislationAlert } from "@/hooks/monitoring/types";
import ClientDashboardTab from "@/components/client/dashboard/ClientDashboardTab";
import MonitoringTab from "@/components/client/monitoring/MonitoringTab";
import ClientAlerts from "@/components/client/alerts/ClientAlerts";
import PressTab from "@/components/client/press/PressTab";
import AnalysisToolsSection from "@/components/client/tools/AnalysisToolsSection";
import AnalysisTab from "@/components/client/analysis/AnalysisTab";
import { getColorClasses } from "@/components/service/utils/colorUtils";

// Dados simulados para alertas de legislação
const mockAlerts: LegislationAlert[] = [
  {
    id: "1",
    title: "Nova Lei Florestal",
    description: "Nova legislação sobre preservação de áreas protegidas",
    date: "2023-04-15",
    isRead: false,
    url: "https://example.com/lei1",
    source: "Diário Oficial da União"
  },
  {
    id: "2",
    title: "Decreto sobre Fiscalização Ambiental",
    description: "Novas diretrizes para fiscalização de áreas protegidas",
    date: "2023-04-12",
    isRead: true,
    url: "https://example.com/decreto1",
    source: "Ministério do Meio Ambiente"
  }
];

// Adicionando interfaces para solucionar erros
interface ClientAlertsProps {
  clientType: ClientType;
  alerts?: LegislationAlert[];
}

interface ClientContentProps {
  clientType: ClientType;
}

const ClientContent: React.FC<ClientContentProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const colorClasses = getColorClasses(clientType);
  
  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 bg-transparent border-b w-full justify-start rounded-none">
          <TabsTrigger value="dashboard" className={`${activeTab === "dashboard" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="monitoring" className={`${activeTab === "monitoring" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
            Monitoramento
          </TabsTrigger>
          <TabsTrigger value="analysis" className={`${activeTab === "analysis" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
            Análise Avançada
          </TabsTrigger>
          <TabsTrigger value="alerts" className={`${activeTab === "alerts" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
            Alertas
          </TabsTrigger>
          {clientType === "press" && (
            <TabsTrigger value="releases" className={`${activeTab === "releases" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
              Releases
            </TabsTrigger>
          )}
          <TabsTrigger value="tools" className={`${activeTab === "tools" ? colorClasses.text + " border-b-2 " + colorClasses.border : ""}`}>
            Ferramentas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0">
          <ClientDashboardTab clientType={clientType} />
        </TabsContent>
        
        <TabsContent value="monitoring" className="mt-0">
          <MonitoringTab />
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-0">
          <AnalysisTab />
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-0">
          <ClientAlerts alerts={mockAlerts} clientType={clientType} />
        </TabsContent>
        
        {clientType === "press" && (
          <TabsContent value="releases" className="mt-0">
            <PressTab clientType={clientType} />
          </TabsContent>
        )}
        
        <TabsContent value="tools" className="mt-0">
          <AnalysisToolsSection 
            clientType={clientType} 
            onDatasetDownload={() => {}} 
            onComparisonView={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientContent;

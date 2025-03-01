
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import { LegislationAlert } from "@/hooks/monitoring/types";
import ClientAlerts from "./alerts/ClientAlerts";
import AnalysisToolsSection from "./tools/AnalysisToolsSection";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import MonitoringTab from "./monitoring/MonitoringTab";
import PressTab from "./press/PressTab";

interface ClientContentProps {
  clientType: ClientType;
  monitoringItems: any[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  form: any;
  handleAddMonitoring: (data: any) => void;
  legislationAlerts: LegislationAlert[];
  markAlertAsRead: (id: string) => void;
  unreadAlertCount: number;
  handleDatasetDownload: () => void;
  handleComparisonView: () => void;
  responsibleFilter: string;
  setResponsibleFilter: (filter: string) => void;
  getUniqueResponsibles: () => string[];
  isLoading: boolean;
}

const ClientContent: React.FC<ClientContentProps> = ({
  clientType,
  monitoringItems,
  timeRange,
  setTimeRange,
  handleExport,
  isAuthenticated,
  form,
  handleAddMonitoring,
  legislationAlerts,
  markAlertAsRead,
  unreadAlertCount,
  handleDatasetDownload,
  handleComparisonView,
  responsibleFilter,
  setResponsibleFilter,
  getUniqueResponsibles,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <ClientAlerts 
        clientType={clientType}
        legislationAlerts={legislationAlerts}
        markAlertAsRead={markAlertAsRead}
        unreadAlertCount={unreadAlertCount}
      />

      <AnalysisToolsSection 
        clientType={clientType}
        onDatasetDownload={handleDatasetDownload}
        onComparisonView={handleComparisonView}
      />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="press">Assessoria de Imprensa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <ClientDashboardTab 
            clientType={clientType}
            monitoringItems={monitoringItems}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
          />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <MonitoringTab
            clientType={clientType}
            monitoringItems={monitoringItems}
            form={form}
            handleAddMonitoring={handleAddMonitoring}
            isLoading={isLoading}
            responsibleFilter={responsibleFilter}
            setResponsibleFilter={setResponsibleFilter}
            getUniqueResponsibles={getUniqueResponsibles}
          />
        </TabsContent>
        
        <TabsContent value="press">
          <PressTab clientType={clientType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientContent;

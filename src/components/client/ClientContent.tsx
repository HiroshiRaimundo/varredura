import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientDashboard from "@/components/client/ClientDashboard";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import AlertButton from "./AlertButton";
import LegislationAlerts from "./LegislationAlerts";
import AnalysisToolsCard from "./AnalysisToolsCard";
import PressReleaseTab from "./PressReleaseTab";
import { LegislationAlert } from "@/hooks/monitoring/types";

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
  const [showAlerts, setShowAlerts] = useState(false);
  
  const showLegislationAlerts = ["politician", "researcher", "observatory"].includes(clientType || "");

  return (
    <div className="space-y-6">
      {showLegislationAlerts && (
        <AlertButton 
          unreadCount={unreadAlertCount} 
          onClick={() => setShowAlerts(!showAlerts)} 
        />
      )}

      {showLegislationAlerts && (
        <LegislationAlerts 
          alerts={legislationAlerts} 
          onMarkAsRead={markAlertAsRead} 
          showAlerts={showAlerts}
        />
      )}

      <AnalysisToolsCard 
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
          <ClientDashboard 
            clientType={clientType}
            monitoringItems={monitoringItems}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
          />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <div className="space-y-6">
            <MonitoringForm 
              form={form} 
              onSubmit={handleAddMonitoring}
              clientType={clientType}
            />
            
            <MonitoringList 
              items={monitoringItems} 
              onDelete={() => {}} // We'll pass this in the main component
              isLoading={isLoading}
              uniqueResponsibles={getUniqueResponsibles()}
              responsibleFilter={responsibleFilter}
              onFilterChange={setResponsibleFilter}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="press">
          <PressReleaseTab clientType={clientType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientContent;

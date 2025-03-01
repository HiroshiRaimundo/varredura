
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/monitoring-list";
import ResearchForm from "@/components/ResearchForm";
import ResearchList from "@/components/ResearchList";
import MapView from "@/components/MapView";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy } from "@/types/research";
import { generateTrendData } from "./DashboardUtils";

interface TabContentProps {
  isAuthenticated: boolean;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
  studies: ResearchStudy[];
  monitoringForm: any;
  studyForm: any;
  handleAddMonitoring: (data: Omit<MonitoringItem, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  setResponsibleFilter?: (responsible: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  isAuthenticated,
  timeRange,
  setTimeRange,
  handleExport,
  monitoringItems,
  studies,
  monitoringForm,
  studyForm,
  handleAddMonitoring,
  handleDeleteMonitoring,
  handleStudySubmit,
  handleDeleteStudy,
  isLoading,
  uniqueResponsibles = [],
  responsibleFilter = "",
  setResponsibleFilter = () => {}
}) => {
  // Gerar dados de tendência com base nos itens de monitoramento
  const trendData = generateTrendData(monitoringItems || [], timeRange);
  const safeMonitoringItems = monitoringItems || [];

  // Log para debugging
  console.log("TabContent rendering", { 
    isAuthenticated, 
    itemCount: safeMonitoringItems.length,
    hasMonitoringForm: !!monitoringForm,
    hasStudyForm: !!studyForm
  });

  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        {isAuthenticated && <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>}
        {isAuthenticated && <TabsTrigger value="research">Pesquisa</TabsTrigger>}
        <TabsTrigger value="map">Mapa Interativo</TabsTrigger>
      </TabsList>

      {/* Aba do Dashboard */}
      <TabsContent value="dashboard">
        <Dashboard 
          data={trendData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          handleExport={handleExport}
          isAuthenticated={isAuthenticated}
          monitoringItems={safeMonitoringItems}
        />
      </TabsContent>

      {/* Aba de Monitoramento */}
      {isAuthenticated && (
        <TabsContent value="monitoring">
          <div className="space-y-6">
            {monitoringForm ? (
              <>
                <MonitoringForm 
                  form={monitoringForm} 
                  onSubmit={handleAddMonitoring} 
                />
                <MonitoringList 
                  items={safeMonitoringItems} 
                  onDelete={handleDeleteMonitoring} 
                  isLoading={isLoading}
                  uniqueResponsibles={uniqueResponsibles}
                  responsibleFilter={responsibleFilter}
                  onFilterChange={setResponsibleFilter}
                />
              </>
            ) : (
              <div className="p-6 text-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Carregando formulário de monitoramento...</p>
              </div>
            )}
          </div>
        </TabsContent>
      )}

      {/* Aba de Pesquisa */}
      {isAuthenticated && (
        <TabsContent value="research">
          <div className="grid gap-6 md:grid-cols-2">
            {studyForm ? (
              <>
                <ResearchForm 
                  form={studyForm} 
                  onSubmit={handleStudySubmit} 
                />
                <ResearchList 
                  studies={studies || []} 
                  onDelete={handleDeleteStudy}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <div className="col-span-2 p-6 text-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Carregando formulário de pesquisa...</p>
              </div>
            )}
          </div>
        </TabsContent>
      )}

      {/* Aba do Mapa */}
      <TabsContent value="map">
        <MapView studies={studies || []} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;

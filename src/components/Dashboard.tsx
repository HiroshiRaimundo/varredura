
import React, { useMemo } from "react";
import { MonitoringItem } from "@/hooks/monitoring/types";
import AnalysisTools from "./AnalysisTools";
import DashboardControls from "./dashboard/DashboardControls";
import { DashboardChartsGrid } from "./dashboard/DashboardChartsGrid";
import { DashboardSecondaryCharts } from "./dashboard/DashboardSecondaryCharts";
import SystemUpdatesChart from "./dashboard/SystemUpdatesChart";
import { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData,
  getRadarData,
  generateTrendData
} from "./dashboard/DashboardUtils";

interface DashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
  showClientButton?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  // Gerar dados dinâmicos com base no período selecionado
  const trendData = useMemo(() => 
    generateTrendData(monitoringItems, timeRange), 
    [monitoringItems, timeRange]
  );
  
  // Preparar dados para gráficos adicionais baseados nos monitoringItems
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  
  // Garantir que o formato de dados retornado corresponda ao esperado pelos componentes
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  return (
    <div className="grid gap-6">
      {/* Filtros e Controles */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Gráficos Principais - Layout em Grid */}
      <DashboardChartsGrid 
        trendData={trendData}
        categoryData={categoryData}
        frequencyData={frequencyData}
      />

      {/* Gráficos Secundários - 2 em uma linha */}
      <DashboardSecondaryCharts 
        responsibleData={responsibleData}
        radarData={radarData}
      />

      {/* Atualizações do Sistema - Gráfico de Área */}
      <SystemUpdatesChart data={trendData} />

      {/* Ferramentas de Análise - apenas para administradores */}
      {isAuthenticated && <AnalysisTools items={monitoringItems} />}
    </div>
  );
};

export default Dashboard;

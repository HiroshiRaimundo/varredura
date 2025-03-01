
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { 
  getCategoryData, 
  getFrequencyData, 
  getRadarData, 
  getResponsibleData, 
  generateTrendData 
} from "../dashboard/DashboardUtils";
import StudiesChart from "../dashboard/StudiesChart";
import CategoryChart from "../dashboard/CategoryChart";
import FrequencyChart from "../dashboard/FrequencyChart";
import ResearchersChart from "../dashboard/ResearchersChart";
import SourceTypeChart from "../dashboard/SourceTypeChart";
import SystemUpdatesChart from "../dashboard/SystemUpdatesChart";
import DashboardControls from "../dashboard/DashboardControls";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BarChart3, PieChart, LineChart, Activity, Users, Layers } from "lucide-react";

interface ClientDashboardProps {
  clientType: "observatory" | "researcher" | "politician" | "institution";
  monitoringItems: MonitoringItem[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  clientType,
  monitoringItems,
  timeRange,
  setTimeRange,
  handleExport,
  isAuthenticated
}) => {
  const navigate = useNavigate();
  
  // Generate data based on the selected time range
  const trendData = React.useMemo(() => 
    generateTrendData(monitoringItems, timeRange), 
    [monitoringItems, timeRange]
  );
  
  // Prepare data for additional charts based on monitoringItems
  const categoryData = React.useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = React.useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = React.useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = React.useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  // Client-specific dashboard descriptions
  const getClientDescription = () => {
    switch (clientType) {
      case "observatory":
        return "Acesso a indicadores agregados e análises de tendências para monitoramento estratégico de políticas públicas e dados socioeconômicos regionais.";
      case "researcher":
        return "Visualização detalhada de dados para análises acadêmicas, com acesso a séries históricas e possibilidade de download para processamento complementar.";
      case "politician":
        return "Resumo executivo de indicadores-chave para tomada de decisão estratégica, com foco em tendências e impactos de políticas públicas.";
      case "institution":
        return "Monitoramento de dados institucionais para gestão de responsabilidades e acompanhamento de projetos por área de atuação.";
      default:
        return "";
    }
  };

  // Customize dashboard based on client type
  const renderDashboard = () => {
    switch (clientType) {
      case "observatory":
        return (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StudiesChart data={trendData} />
              <CategoryChart data={categoryData} />
              <FrequencyChart data={frequencyData} />
            </div>
            
            <SystemUpdatesChart data={trendData} />
          </div>
        );
      
      case "researcher":
        return (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryChart data={categoryData} />
              <SourceTypeChart data={radarData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FrequencyChart data={frequencyData} />
              <ResearchersChart data={responsibleData} />
            </div>
            
            <SystemUpdatesChart data={trendData} />
          </div>
        );
      
      case "politician":
        return (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StudiesChart data={trendData} />
              <FrequencyChart data={frequencyData} />
            </div>
            
            <SourceTypeChart data={radarData} />
          </div>
        );
      
      case "institution":
        return (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StudiesChart data={trendData} />
              <CategoryChart data={categoryData} />
              <SourceTypeChart data={radarData} />
            </div>
            
            <ResearchersChart data={responsibleData} />
          </div>
        );
      
      default:
        return (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StudiesChart data={trendData} />
              <CategoryChart data={categoryData} />
              <FrequencyChart data={frequencyData} />
            </div>
          </div>
        );
    }
  };

  // Get client type title for display
  const getClientTypeTitle = () => {
    switch (clientType) {
      case "observatory": return "Observatório";
      case "researcher": return "Pesquisador";
      case "politician": return "Político";
      case "institution": return "Instituição";
      default: return "Cliente";
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/client")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Dashboard {getClientTypeTitle()}</h1>
        </div>
      </div>

      <Card className="border-l-4" style={{ borderLeftColor: 
        clientType === "observatory" ? "#3b82f6" : 
        clientType === "researcher" ? "#10b981" : 
        clientType === "politician" ? "#8b5cf6" : 
        "#f59e0b" 
      }}>
        <CardContent className="pt-6">
          <p>{getClientDescription()}</p>
        </CardContent>
      </Card>

      <DashboardControls
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {renderDashboard()}

      <Card>
        <CardHeader>
          <CardTitle>Legendas e Instruções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Gráficos de Barras</p>
                <p className="text-sm text-muted-foreground">Mostram a distribuição de valores por categorias.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <PieChart className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Gráficos de Pizza</p>
                <p className="text-sm text-muted-foreground">Mostram a proporção de cada categoria no total.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <LineChart className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium">Gráficos de Linha</p>
                <p className="text-sm text-muted-foreground">Mostram tendências ao longo do tempo.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Activity className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium">Gráficos de Área</p>
                <p className="text-sm text-muted-foreground">Mostram volume de dados ao longo do tempo.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;

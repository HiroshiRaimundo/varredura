
import React from "react";
import CategoryChart from "@/components/dashboard/CategoryChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import ResearchersChart from "@/components/dashboard/ResearchersChart";
import SystemUpdatesChart from "@/components/dashboard/SystemUpdatesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResearcherDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
  responsibleData: any[];
  radarData: any[];
}

const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData,
  responsibleData,
  radarData
}) => {
  const handleDownloadDataset = () => {
    toast({
      title: "Dataset para pesquisa",
      description: "O dataset limpo e normalizado está sendo preparado para download."
    });
    // Simulate download preparation
    setTimeout(() => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent("date,category,value,region\n" + 
        trendData.map(item => `${item.name},estudos,${item.estudos},nacional`).join("\n")));
      element.setAttribute("download", "dados-pesquisa.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleTimePeriodComparison = () => {
    toast({
      title: "Análise temporal",
      description: "Comparação entre períodos será exibida em uma nova janela."
    });
  };

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ferramentas para Pesquisadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleDownloadDataset} className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Dataset Limpo (CSV)
              </Button>
              <Button onClick={handleTimePeriodComparison} variant="outline" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Comparação entre Períodos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Correlações e Tendências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2"><strong>Correlação forte (0.87):</strong> Entre frequência de monitoramento e qualidade de dados.</p>
              <p><strong>Tendência:</strong> Aumento de 32% em estudos cruzados entre diferentes fontes de dados.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
};

export default ResearcherDashboard;


import React from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import StudiesChart from "@/components/dashboard/StudiesChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SystemUpdatesChart from "@/components/dashboard/SystemUpdatesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ObservatoryDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
}

const ObservatoryDashboard: React.FC<ObservatoryDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData
}) => {
  const handleDownloadDataset = () => {
    toast({
      title: "Dataset disponível",
      description: "O dataset completo está sendo preparado para download."
    });
    // Simulate download preparation
    setTimeout(() => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(trendData, null, 2)));
      element.setAttribute("download", "dataset-completo.json");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleRegionalComparison = () => {
    toast({
      title: "Análise comparativa",
      description: "Comparação regional será disponibilizada no próximo release."
    });
  };

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ferramentas para Observatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleDownloadDataset} className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Baixar Dataset Completo
              </Button>
              <Button onClick={handleRegionalComparison} variant="outline" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Análise Comparativa Regional
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Correlações Identificadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2"><strong>Tendência detectada:</strong> Aumento de 27% em monitoramentos ambientais correlacionado com novas legislações.</p>
              <p><strong>Recomendação:</strong> Estabelecer alertas para indicadores de desmatamento e qualidade do ar.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StudiesChart data={trendData} />
        <CategoryChart data={categoryData} />
        <FrequencyChart data={frequencyData} />
      </div>
      
      <SystemUpdatesChart data={trendData} />
    </div>
  );
};

export default ObservatoryDashboard;

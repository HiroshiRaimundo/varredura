
import React from "react";
import StudiesChart from "@/components/dashboard/StudiesChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Newspaper, TrendingUp, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface JournalistDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
  radarData: any[];
}

const JournalistDashboard: React.FC<JournalistDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData,
  radarData
}) => {
  const handleStoryGenerator = () => {
    toast({
      title: "Sugestão de Pauta",
      description: "Baseado nos dados, 3 sugestões de pauta foram identificadas."
    });
  };

  const handleDownloadVisualizations = () => {
    toast({
      title: "Visualizações para Publicação",
      description: "Gráficos em formato de publicação estão sendo preparados."
    });
  };

  // Simulação de tendências para jornalistas
  const trends = [
    { id: 1, title: "Aumento de 52% em menções sobre mudanças climáticas", source: "Twitter, últimos 7 dias" },
    { id: 2, title: "Crescente interesse por energia renovável", source: "Buscas Google, último mês" },
    { id: 3, title: "Nova legislação ambiental gera debates polarizados", source: "Análise de comentários, portais de notícias" },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ferramentas para Jornalistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleStoryGenerator} className="flex items-center">
                <Newspaper className="h-4 w-4 mr-2" />
                Gerador de Pautas
              </Button>
              <Button onClick={handleDownloadVisualizations} variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Visualizações para Publicação
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Tendências Emergentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trends.map(trend => (
                <div key={trend.id} className="border-b pb-2">
                  <p className="text-sm font-medium">{trend.title}</p>
                  <p className="text-xs text-muted-foreground">Fonte: {trend.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Fontes Verificadas para Consulta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center p-2 border rounded">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Porta-voz do Ministério do Meio Ambiente</span>
            </div>
            <div className="flex items-center p-2 border rounded">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Instituto Nacional de Pesquisas Espaciais</span>
            </div>
            <div className="flex items-center p-2 border rounded">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">Associação de Agricultores</span>
            </div>
            <div className="flex items-center p-2 border rounded">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Departamento de Proteção Ambiental</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudiesChart data={trendData} />
        <CategoryChart data={categoryData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrequencyChart data={frequencyData} />
        <SourceTypeChart data={radarData} />
      </div>
    </div>
  );
};

export default JournalistDashboard;

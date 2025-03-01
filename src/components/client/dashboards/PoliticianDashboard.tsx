
import React from "react";
import StudiesChart from "@/components/dashboard/StudiesChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PoliticianDashboardProps {
  trendData: any[];
  frequencyData: any[];
  radarData: any[];
}

const PoliticianDashboard: React.FC<PoliticianDashboardProps> = ({
  trendData,
  frequencyData,
  radarData
}) => {
  const handlePolicyImpactView = () => {
    toast({
      title: "Indicadores de Impacto",
      description: "Visualização de impacto de políticas públicas será aberta."
    });
  };

  const handleLegislationAlerts = () => {
    toast({
      title: "Alertas de Legislação",
      description: "3 novas legislações foram detectadas no último período."
    });
  };

  // Simulação de alertas importantes
  const alerts = [
    { id: 1, title: "Nova Legislação", description: "Lei Nº 14.522/2023 sobre proteção ambiental", date: "10/06/2023" },
    { id: 2, title: "Indicador-chave alterado", description: "Índice de Desenvolvimento Humano atualizado", date: "15/05/2023" },
  ];

  return (
    <div className="grid gap-6">
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Alertas para Gestores Públicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="border-b pb-2">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Publicado em: {alert.date}</p>
              </div>
            ))}
            <div className="flex space-x-2 pt-2">
              <Button onClick={handleLegislationAlerts} variant="outline" size="sm" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Configurar Alertas
              </Button>
              <Button onClick={handlePolicyImpactView} size="sm" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Impacto de Políticas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudiesChart data={trendData} />
        <FrequencyChart data={frequencyData} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Impacto de Políticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Índice de Desenvolvimento Social</span>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">+4.2%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span>Efetividade de Programas Ambientais</span>
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">-1.5%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '48%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span>Satisfação com Serviços Públicos</span>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">+2.7%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <SourceTypeChart data={radarData} />
    </div>
  );
};

export default PoliticianDashboard;

import React, { useState } from "react";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download } from "lucide-react";

interface DashboardChartsGridProps {
  trendData: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
  }>;
  frequencyData: Array<{
    frequency: string;
    quantidade: number;
  }>;
}

export const DashboardChartsGrid: React.FC<DashboardChartsGridProps> = ({
  trendData,
  categoryData,
  frequencyData,
}) => {
  const [zoomedChart, setZoomedChart] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleZoom = (chartId: string) => {
    setZoomedChart(zoomedChart === chartId ? null : chartId);
  };

  const handleExportChart = (chartId: string) => {
    // Implementar exportação do gráfico específico
    console.log(`Exportando gráfico: ${chartId}`);
  };

  const renderChart = (chartId: string, component: React.ReactNode) => {
    const isZoomed = zoomedChart === chartId;
    
    return (
      <Card className={`transition-all duration-300 ${isZoomed ? 'col-span-3' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            {chartId === 'studies' && 'Estudos e Análises'}
            {chartId === 'category' && 'Categorias'}
            {chartId === 'frequency' && 'Frequência'}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom(chartId)}
            >
              {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportChart(chartId)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {component}
          {isZoomed && showDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Detalhes Adicionais</h4>
              {/* Adicionar detalhes específicos para cada tipo de gráfico */}
              {chartId === 'studies' && (
                <ul className="space-y-2">
                  <li>Total de estudos: {trendData.reduce((acc, curr) => acc + curr.estudos, 0)}</li>
                  <li>Média mensal: {(trendData.reduce((acc, curr) => acc + curr.estudos, 0) / trendData.length).toFixed(1)}</li>
                  <li>Tendência: {trendData[trendData.length - 1].estudos > trendData[0].estudos ? 'Crescente' : 'Decrescente'}</li>
                </ul>
              )}
              {/* Adicionar mais detalhes para outros tipos de gráficos */}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {renderChart('studies', <StudiesChart data={trendData} />)}
      {renderChart('category', <CategoryChart data={categoryData} />)}
      {renderChart('frequency', <FrequencyChart data={frequencyData} />)}
    </div>
  );
};

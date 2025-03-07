import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { MonitoringGroups } from "./groups/MonitoringGroups";
import { toast } from "sonner";

interface AnalyticsData {
  trends: any[];
  distribution: any[];
  sources: Array<{ id: string; name: string; type: string }>;
}

export const MonitoringAnalytics: React.FC = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    trends: [],
    distribution: [],
    sources: [
      { id: "1", name: "Portal Gov", type: "governo" },
      { id: "2", name: "G1", type: "noticias" },
      // Adicione mais fontes conforme necessário
    ]
  });

  const filterDataBySource = (data: any[]) => {
    if (selectedSources.length === 0) return data;
    return data.filter(item => 
      selectedSources.includes(item.sourceId) || 
      selectedSources.includes(item.source)
    );
  };

  const handleSourceSelect = (sources: string[]) => {
    setSelectedSources(sources);
    
    // Atualiza os dados filtrados
    const filteredTrends = filterDataBySource(analyticsData.trends);
    const filteredDistribution = filterDataBySource(analyticsData.distribution);
    
    // Atualiza o estado com os dados filtrados
    setAnalyticsData(prev => ({
      ...prev,
      filteredTrends,
      filteredDistribution
    }));
  };

  const handleMetricSelect = (metric: string) => {
    setSelectedMetrics(prev => {
      const newMetrics = prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric];
      return newMetrics;
    });
  };

  const getFilteredData = () => {
    const filteredTrends = filterDataBySource(analyticsData.trends);
    const filteredDistribution = filterDataBySource(analyticsData.distribution);

    return {
      trends: filteredTrends,
      distribution: filteredDistribution
    };
  };

  const { trends, distribution } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Análise de Monitoramento</h2>
          <p className="text-muted-foreground">
            Análise detalhada do monitoramento de todas as fontes
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleção de Fontes e Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          <MonitoringGroups
            sources={analyticsData.sources}
            selectedSources={selectedSources}
            onSourceSelect={handleSourceSelect}
          />
          
          <div className="mt-4 space-y-2">
            <div className="font-medium">Métricas para Análise</div>
            <div className="flex flex-wrap gap-2">
              {["updates", "alerts", "successRate", "avgTime"].map((metric) => (
                <Button
                  key={metric}
                  variant={selectedMetrics.includes(metric) ? "default" : "outline"}
                  onClick={() => handleMetricSelect(metric)}
                >
                  {metric}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (trends.reduce((acc, curr) => acc + curr.successRate, 0) /
                  trends.length) *
                  100
              )}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trends.reduce((acc, curr) => acc + curr.alerts, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                trends.reduce((acc, curr) => acc + curr.avgTime, 0) /
                  trends.length
              )}
              ms
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Atualizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trends.reduce((acc, curr) => acc + curr.updates, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendências ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={trends}
              xField="date"
              yFields={selectedMetrics.length > 0 ? selectedMetrics : ["updates", "alerts"]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={distribution}
              nameField="type"
              valueField="count"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada por Fonte</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-8">
              {selectedSources.map((sourceId) => {
                const sourceData = trends.filter(t => t.sourceId === sourceId);
                const source = analyticsData.sources.find(s => s.id === sourceId);
                
                return (
                  <div key={sourceId} className="space-y-4">
                    <h3 className="font-medium">{source?.name}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <LineChart
                        data={sourceData}
                        xField="date"
                        yFields={selectedMetrics.length > 0 ? selectedMetrics : ["updates", "alerts"]}
                        height={200}
                      />
                      <BarChart
                        data={sourceData}
                        xField="date"
                        yField="successRate"
                        height={200}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

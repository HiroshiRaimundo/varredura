import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { useMonitoringData } from "@/contexts/MonitoringDataContext";

interface AnalyticsData {
  timeRange: string;
  metrics: {
    totalMonitorings: number;
    activeMonitorings: number;
    successRate: number;
    averageUpdateTime: number;
    alertsGenerated: number;
  };
  trends: {
    date: string;
    updates: number;
    alerts: number;
  }[];
  distribution: {
    type: string;
    count: number;
  }[];
}

const generateMockData = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return {
    timeRange: "7d",
    metrics: {
      totalMonitorings: 150,
      activeMonitorings: 120,
      successRate: 98.5,
      averageUpdateTime: 45,
      alertsGenerated: 25
    },
    trends: dates.map(date => ({
      date,
      updates: Math.floor(Math.random() * 30) + 30,
      alerts: Math.floor(Math.random() * 5)
    })),
    distribution: [
      { type: "Governo", count: 45 },
      { type: "Notícias", count: 35 },
      { type: "Licitações", count: 40 },
      { type: "Diário Oficial", count: 30 }
    ]
  };
};

export const MonitoringAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [exportFormat, setExportFormat] = useState("csv");
  const { monitoringData } = useMonitoringData();

  // Usando a função de mock data
  const analyticsData: AnalyticsData = generateMockData();

  const handleExportData = () => {
    console.log(`Exportando dados em formato ${exportFormat}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Análise de Monitoramento</h2>
          <p className="text-muted-foreground">
            Análise estatística e tendências dos monitoramentos
          </p>
        </div>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Formato de Exportação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExportData}>
            Exportar Dados
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="content">Análise de Conteúdo</TabsTrigger>
          <TabsTrigger value="sentiment">Análise de Sentimento</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="metadata">Metadados</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Sucesso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.successRate}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.averageUpdateTime} min
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas Gerados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.alertsGenerated}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Atividade de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={analyticsData.trends}
                xField="date"
                yFields={["updates", "alerts"]}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive">
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monitoringData?.map(m => ({
                  date: new Date(m.metrics[0]?.timestamp || Date.now()).toLocaleDateString(),
                  value: m.metrics[0]?.value || 0
                })) || []}
                xField="date"
                yFields={["value"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Palavras-chave Mais Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { keyword: "licitação", count: 45 },
                        { keyword: "edital", count: 38 },
                        { keyword: "contrato", count: 32 }
                      ]}
                      xField="keyword"
                      yField="count"
                      height={300}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Tópicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { topic: "Administrativo", value: 40 },
                        { topic: "Financeiro", value: 30 },
                        { topic: "Técnico", value: 30 }
                      ]}
                      nameField="topic"
                      valueField="value"
                      height={300}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tendência de Sentimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={[
                        { date: "2024-03-01", positive: 75, negative: 25 },
                        { date: "2024-03-02", positive: 80, negative: 20 },
                        { date: "2024-03-03", positive: 85, negative: 15 }
                      ]}
                      xField="date"
                      yFields={["positive", "negative"]}
                      height={300}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Sentimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { sentiment: "Positivo", value: 60 },
                        { sentiment: "Neutro", value: 30 },
                        { sentiment: "Negativo", value: 10 }
                      ]}
                      nameField="sentiment"
                      valueField="value"
                      height={300}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tempo de Resposta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={monitoringData?.map(m => ({
                        date: new Date(m.metrics[1]?.timestamp || Date.now()).toLocaleDateString(),
                        responseTime: m.metrics[1]?.value || 0
                      })) || []}
                      xField="date"
                      yFields={["responseTime"]}
                      height={300}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { metric: "CPU", value: 45 },
                        { metric: "Memória", value: 65 },
                        { metric: "Disco", value: 30 },
                        { metric: "Rede", value: 80 }
                      ]}
                      xField="metric"
                      yField="value"
                      height={300}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Metadados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tipos de Arquivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { type: "HTML", value: 50 },
                        { type: "PDF", value: 30 },
                        { type: "DOC", value: 20 }
                      ]}
                      nameField="type"
                      valueField="value"
                      height={300}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tamanho dos Arquivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { range: "0-1MB", count: 45 },
                        { range: "1-5MB", count: 30 },
                        { range: "5-10MB", count: 15 },
                        { range: ">10MB", count: 10 }
                      ]}
                      xField="range"
                      yField="count"
                      height={300}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

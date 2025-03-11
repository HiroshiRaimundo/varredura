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
        <TabsList className="grid grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="sentiment">Análise de Sentimento</TabsTrigger>
          <TabsTrigger value="trends">Análise de Tendências</TabsTrigger>
          <TabsTrigger value="frequency">Análise de Frequência</TabsTrigger>
          <TabsTrigger value="links">Análise de Links</TabsTrigger>
          <TabsTrigger value="performance">Análise de Performance</TabsTrigger>
          <TabsTrigger value="availability">Análise de Disponibilidade</TabsTrigger>
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

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada do Conteúdo e Estrutura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura do Conteúdo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { type: "Texto", count: 65 },
                        { type: "Imagens", count: 20 },
                        { type: "Links", count: 10 },
                        { type: "Tabelas", count: 5 }
                      ]}
                      xField="type"
                      yFields={["count"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Elementos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { label: "Títulos", value: 30 },
                        { label: "Parágrafos", value: 45 },
                        { label: "Listas", value: 15 },
                        { label: "Outros", value: 10 }
                      ]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
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

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Sentimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { label: "Positivo", value: 45 },
                        { label: "Neutro", value: 35 },
                        { label: "Negativo", value: 20 }
                      ]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução do Sentimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={analyticsData.trends.map(t => ({
                        ...t,
                        sentiment: Math.random() * 100
                      }))}
                      xField="date"
                      yFields={["sentiment"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Identificação de Padrões Temporais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Padrões de Atualização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={analyticsData.trends}
                      xField="date"
                      yFields={["updates"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sazonalidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { period: "Manhã", count: 40 },
                        { period: "Tarde", count: 35 },
                        { period: "Noite", count: 25 }
                      ]}
                      xField="period"
                      yFields={["count"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Termos e Elementos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequência de Termos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { term: "Termo 1", frequency: 85 },
                        { term: "Termo 2", frequency: 65 },
                        { term: "Termo 3", frequency: 45 },
                        { term: "Termo 4", frequency: 35 }
                      ]}
                      xField="term"
                      yFields={["frequency"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Elementos Monitorados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { label: "URLs", value: 40 },
                        { label: "Textos", value: 30 },
                        { label: "Imagens", value: 20 },
                        { label: "Outros", value: 10 }
                      ]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Análise da Estrutura de Navegação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { label: "Internos", value: 60 },
                        { label: "Externos", value: 30 },
                        { label: "Quebrados", value: 10 }
                      ]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Profundidade de Navegação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { level: "Nível 1", count: 50 },
                        { level: "Nível 2", count: 30 },
                        { level: "Nível 3", count: 15 },
                        { level: "Nível 4+", count: 5 }
                      ]}
                      xField="level"
                      yFields={["count"]}
                      height={200}
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
              <CardTitle>Análise de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tempo de Resposta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={analyticsData.trends.map(t => ({
                        ...t,
                        responseTime: Math.random() * 1000
                      }))}
                      xField="date"
                      yFields={["responseTime"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recursos Consumidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { resource: "CPU", usage: 45 },
                        { resource: "Memória", usage: 60 },
                        { resource: "Banda", usage: 30 }
                      ]}
                      xField="resource"
                      yFields={["usage"]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Tempo de Atividade e Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-center mb-4">
                      99.9%
                    </div>
                    <LineChart
                      data={analyticsData.trends.map(t => ({
                        ...t,
                        uptime: 99.9 + (Math.random() * 0.1)
                      }))}
                      xField="date"
                      yFields={["uptime"]}
                      height={150}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tempo de Resposta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-center mb-4">
                      245ms
                    </div>
                    <LineChart
                      data={analyticsData.trends.map(t => ({
                        ...t,
                        response: 200 + (Math.random() * 100)
                      }))}
                      xField="date"
                      yFields={["response"]}
                      height={150}
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

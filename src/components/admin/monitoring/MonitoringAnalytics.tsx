import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface AnalyticsData {
  timeRange: string;
  metrics: {
    totalMonitorings: number;
    activeMonitorings: number;
    successRate: number;
    averageUpdateTime: number;
    alertsGenerated: number;
    lastUpdate: string;
  };
  trends: {
    date: string;
    updates: number;
    alerts: number;
    successRate: number;
    avgTime: number;
  }[];
  distribution: {
    type: string;
    count: number;
    avgSuccess: number;
    avgTime: number;
    active: number;
  }[];
  sources: {
    id: string;
    name: string;
    type: string;
  }[];
  updateHours: {
    hour: string;
    count: number;
  }[];
}

export const MonitoringAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedSource, setSelectedSource] = useState<string>("todos");
  const [drillDownLevel, setDrillDownLevel] = useState(0);

  // Dados mockados para exemplo
  const analyticsData: AnalyticsData = {
    timeRange: "7d",
    metrics: {
      totalMonitorings: 150,
      activeMonitorings: 120,
      successRate: 98.5,
      averageUpdateTime: 45,
      alertsGenerated: 25,
      lastUpdate: "2024-03-07T14:30:00"
    },
    trends: [
      { date: "2024-03-01", updates: 45, alerts: 3, successRate: 98, avgTime: 42 },
      { date: "2024-03-02", updates: 52, alerts: 5, successRate: 97, avgTime: 44 },
      { date: "2024-03-03", updates: 48, alerts: 2, successRate: 99, avgTime: 40 },
      { date: "2024-03-04", updates: 50, alerts: 4, successRate: 98, avgTime: 43 },
      { date: "2024-03-05", updates: 47, alerts: 3, successRate: 98, avgTime: 45 },
      { date: "2024-03-06", updates: 51, alerts: 4, successRate: 97, avgTime: 46 },
      { date: "2024-03-07", updates: 49, alerts: 4, successRate: 98, avgTime: 45 }
    ],
    distribution: [
      { type: "Governo", count: 45, avgSuccess: 98, avgTime: 43, active: 40 },
      { type: "Notícias", count: 35, avgSuccess: 97, avgTime: 38, active: 32 },
      { type: "Licitações", count: 40, avgSuccess: 99, avgTime: 41, active: 35 },
      { type: "Diário Oficial", count: 30, avgSuccess: 98, avgTime: 47, active: 28 }
    ],
    sources: [
      { id: "gov1", name: "Portal do Governo", type: "Governo" },
      { id: "news1", name: "Portal de Notícias", type: "Notícias" },
      { id: "bid1", name: "Portal de Licitações", type: "Licitações" }
    ],
    updateHours: [
      { hour: "00:00", count: 10 },
      { hour: "06:00", count: 25 },
      { hour: "12:00", count: 45 },
      { hour: "18:00", count: 30 }
    ]
  };

  const handleDrillDown = (category: string) => {
    setDrillDownLevel(prev => prev + 1);
    toast.info(`Detalhando dados para: ${category}`);
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
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Selecionar Fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as Fontes</SelectItem>
              {analyticsData.sources.map(source => (
                <SelectItem key={source.id} value={source.id}>
                  {source.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="tendencias">Tendências</TabsTrigger>
          <TabsTrigger value="distribuicao">Distribuição</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral">
          <div className="grid grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown('totalMonitorings')}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-sm">
                  Total de Fontes
                  <ChevronDown className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.totalMonitorings}
                </div>
                <p className="text-xs text-muted-foreground">
                  Fontes cadastradas para monitoramento
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown('activeMonitorings')}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-sm">
                  Fontes Ativas
                  <ChevronDown className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.activeMonitorings}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((analyticsData.metrics.activeMonitorings / analyticsData.metrics.totalMonitorings) * 100).toFixed(1)}% do total
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown('successRate')}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-sm">
                  Taxa de Sucesso
                  <ChevronDown className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.metrics.successRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Atualizações bem-sucedidas
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown('lastUpdate')}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-sm">
                  Última Atualização
                  <ChevronDown className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">
                  {new Date(analyticsData.metrics.lastUpdate).toLocaleTimeString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(analyticsData.metrics.lastUpdate).toLocaleDateString()}
                </p>
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

        <TabsContent value="tendencias">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Taxa de Sucesso ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={analyticsData.trends}
                  xField="date"
                  yFields={["successRate"]}
                  height={200}
                  tooltipTitle="Taxa de Sucesso"
                  tooltipFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tempo Médio de Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={analyticsData.trends}
                  xField="date"
                  yFields={["avgTime"]}
                  height={200}
                  tooltipTitle="Tempo Médio"
                  tooltipFormatter={(value) => `${value} min`}
                />
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Horários de Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={analyticsData.updateHours}
                  xField="hour"
                  yField="count"
                  height={200}
                  tooltipTitle="Atualizações"
                />
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Atividade de Monitoramento</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={analyticsData.trends}
                  xField="date"
                  yFields={["updates", "alerts"]}
                  height={200}
                  tooltipTitle="Quantidade"
                  tooltipFormatter={(value, name) => 
                    `${value} ${name === 'updates' ? 'atualizações' : 'alertas'}`
                  }
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribuicao">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Distribuição por Tipo</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <PieChart
                  data={analyticsData.distribution}
                  nameField="type"
                  valueField="count"
                  height={250}
                  tooltipTitle="Fontes"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={analyticsData.distribution}
                  xField="type"
                  yField="avgSuccess"
                  height={250}
                  tooltipTitle="Taxa de Sucesso"
                  tooltipFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tempo Médio por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={analyticsData.distribution}
                  xField="type"
                  yField="avgTime"
                  height={250}
                  tooltipTitle="Tempo Médio"
                  tooltipFormatter={(value) => `${value} min`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.distribution.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span>{item.active} de {item.count}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${(item.active / item.count) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

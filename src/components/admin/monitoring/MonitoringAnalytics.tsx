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

export const MonitoringAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [drillDownLevel, setDrillDownLevel] = useState(0);

  // Dados mockados para exemplo
  const analyticsData: AnalyticsData = {
    timeRange: "7d",
    metrics: {
      totalMonitorings: 150,
      activeMonitorings: 120,
      successRate: 98.5,
      averageUpdateTime: 45,
      alertsGenerated: 25
    },
    trends: [
      { date: "2024-03-01", updates: 45, alerts: 3 },
      { date: "2024-03-02", updates: 52, alerts: 5 },
      { date: "2024-03-03", updates: 48, alerts: 2 },
    ],
    distribution: [
      { type: "Governo", count: 45 },
      { type: "Notícias", count: 35 },
      { type: "Licitações", count: 40 },
      { type: "Diário Oficial", count: 30 }
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

      {/* Conteúdo Principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(analyticsData.metrics).map(([key, value]) => (
              <Card key={key} className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown(key)}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {key}
                    <ChevronDown className="w-4 h-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                    {key === 'successRate' && '%'}
                    {key === 'averageUpdateTime' && ' min'}
                  </div>
                </CardContent>
              </Card>
            ))}
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

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={analyticsData.trends}
                xField="date"
                yFields={["updates"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around">
              <div className="w-1/2">
                <PieChart
                  data={analyticsData.distribution}
                  nameField="type"
                  valueField="count"
                  height={300}
                />
              </div>
              <div className="w-1/2">
                <BarChart
                  data={analyticsData.distribution}
                  xField="type"
                  yField="count"
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Previsões</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Implementar visualizações de previsões */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, BarChart, PieChart, MapChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, ArrowUp, ArrowDown, Gauge } from "lucide-react";

interface RegionMetric {
  region: string;
  latency: number;
  availability: number;
  errorRate: number;
  requestCount: number;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

interface ComparisonMetric {
  current: number;
  previous: number;
  percentageChange: number;
}

interface AnalyticsData {
  timeRange: string;
  metrics: {
    totalMonitorings: number;
    activeMonitorings: number;
    successRate: ComparisonMetric;
    averageUpdateTime: ComparisonMetric;
    alertsGenerated: ComparisonMetric;
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
  regionMetrics: RegionMetric[];
  realtimeAlerts: Alert[];
}

export const MonitoringAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [exportFormat, setExportFormat] = useState("csv");

  // Dados mockados para exemplo
  const analyticsData: AnalyticsData = {
    timeRange: "7d",
    metrics: {
      totalMonitorings: 150,
      activeMonitorings: 120,
      successRate: {
        current: 98.5,
        previous: 97.2,
        percentageChange: 1.3
      },
      averageUpdateTime: {
        current: 45,
        previous: 50,
        percentageChange: -10
      },
      alertsGenerated: {
        current: 25,
        previous: 30,
        percentageChange: -16.7
      }
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
    ],
    regionMetrics: [
      { region: "São Paulo", latency: 120, availability: 99.9, errorRate: 0.1, requestCount: 15000 },
      { region: "Rio de Janeiro", latency: 150, availability: 99.7, errorRate: 0.3, requestCount: 12000 },
      { region: "Brasília", latency: 180, availability: 99.5, errorRate: 0.5, requestCount: 10000 },
      { region: "Salvador", latency: 200, availability: 99.3, errorRate: 0.7, requestCount: 8000 }
    ],
    realtimeAlerts: [
      {
        id: "1",
        type: "error",
        message: "Alto tempo de resposta detectado em São Paulo",
        timestamp: new Date().toISOString(),
        status: "active"
      },
      {
        id: "2",
        type: "warning",
        message: "Aumento no número de requisições em Brasília",
        timestamp: new Date().toISOString(),
        status: "active"
      },
      {
        id: "3",
        type: "info",
        message: "Manutenção programada em Rio de Janeiro",
        timestamp: new Date().toISOString(),
        status: "resolved"
      }
    ]
  };

  const handleExportData = () => {
    console.log(`Exportando dados em formato ${exportFormat}`);
  };

  const renderMetricComparison = (metric: ComparisonMetric, unit: string = '') => (
    <div className="flex items-center space-x-2">
      <div className="text-2xl font-bold">
        {metric.current}{unit}
      </div>
      <div className={`flex items-center ${metric.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {metric.percentageChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="text-sm">{Math.abs(metric.percentageChange)}%</span>
      </div>
    </div>
  );

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

      {/* Alertas em Tempo Real */}
      <div className="grid grid-cols-1 gap-4">
        {analyticsData.realtimeAlerts
          .filter(alert => alert.status === 'active')
          .map(alert => (
            <Alert key={alert.id} className={`
              ${alert.type === 'error' ? 'border-red-500 bg-red-50' : 
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 
                'border-blue-500 bg-blue-50'}
            `}>
              <Bell className="h-4 w-4" />
              <AlertTitle className="font-semibold">
                {alert.type === 'error' ? 'Erro Crítico' : 
                 alert.type === 'warning' ? 'Alerta' : 
                 'Informação'}
              </AlertTitle>
              <AlertDescription>
                {alert.message}
                <span className="ml-2 text-sm text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </AlertDescription>
            </Alert>
          ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="regions">Performance Regional</TabsTrigger>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Sucesso</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMetricComparison(analyticsData.metrics.successRate, '%')}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMetricComparison(analyticsData.metrics.averageUpdateTime, ' min')}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas Gerados</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMetricComparison(analyticsData.metrics.alertsGenerated)}
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

        <TabsContent value="regions">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Região</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-[400px]">
                    <MapChart
                      data={analyticsData.regionMetrics}
                      nameField="region"
                      valueField="latency"
                      height={400}
                    />
                  </div>
                  <div className="space-y-4">
                    {analyticsData.regionMetrics.map((metric) => (
                      <Card key={metric.region}>
                        <CardHeader>
                          <CardTitle className="text-lg">{metric.region}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Latência</p>
                              <p className="font-medium">{metric.latency}ms</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Disponibilidade</p>
                              <p className="font-medium">{metric.availability}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Taxa de Erro</p>
                              <p className="font-medium">{metric.errorRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Requisições</p>
                              <p className="font-medium">{metric.requestCount}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <CardTitle>Previsões de Atualização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Em desenvolvimento. Esta funcionalidade usará machine learning para prever
                padrões de atualização e momentos prováveis de mudanças.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

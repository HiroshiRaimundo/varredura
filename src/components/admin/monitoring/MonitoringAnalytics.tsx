import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ActiveMonitoring {
  id: string;
  name: string;
  type: string;
  metrics: string[];
  status: "active" | "inactive" | "analyzing";
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
}

export const MonitoringAnalytics: React.FC = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = useState("predictive");

  // Dados mockados para exemplo
  const sentimentData = [
    { period: "Semana 1", positive: 65, negative: 15, neutral: 20 },
    { period: "Semana 2", positive: 70, negative: 12, neutral: 18 },
    { period: "Semana 3", positive: 75, negative: 10, neutral: 15 },
    { period: "Semana 4", positive: 80, negative: 8, neutral: 12 },
  ];

  const contentAnalysisData = [
    { category: "Relevância", score: 85 },
    { category: "Precisão", score: 90 },
    { category: "Cobertura", score: 75 },
    { category: "Atualidade", score: 95 },
    { category: "Contexto", score: 80 },
  ];

  const crossAnalysisData = [
    { subject: "Relevância", A: 80, B: 90, C: 70 },
    { subject: "Sentimento", A: 85, B: 75, C: 88 },
    { subject: "Precisão", A: 90, B: 85, C: 92 },
    { subject: "Tendência", A: 70, B: 95, C: 85 },
    { subject: "Impacto", A: 88, B: 80, C: 78 },
  ];

  // Dados de alertas
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Aumento em Menções Negativas',
      description: 'Detectado um aumento de 25% nas menções negativas nas últimas 24 horas.',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'error',
      title: 'Falha na Coleta de Dados',
      description: 'A fonte "Portal XYZ" está inacessível nos últimos 30 minutos.',
      timestamp: new Date().toISOString()
    },
    {
      id: '3',
      type: 'info',
      title: 'Nova Tendência Identificada',
      description: 'Nova tendência positiva detectada relacionada ao termo "inovação".',
      timestamp: new Date().toISOString()
    }
  ];

  // Dados de métricas em tempo real
  const realtimeMetrics = [
    {
      name: 'Menções Totais',
      value: 1250,
      change: 15,
      trend: 'up'
    },
    {
      name: 'Sentimento Médio',
      value: 78,
      change: -2,
      trend: 'down'
    },
    {
      name: 'Engajamento',
      value: 92,
      change: 8,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alertas importantes */}
      <div className="grid gap-4 md:grid-cols-2">
        {alerts.map(alert => (
          <Alert key={alert.id} variant={alert.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription className="mt-2 flex justify-between items-center">
              <span>{alert.description}</span>
              <Badge variant="outline" className="ml-2">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </Badge>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Métricas em Tempo Real */}
      <div className="grid gap-4 md:grid-cols-3">
        {realtimeMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className={cn(
                "flex items-center space-x-1",
                metric.trend === 'up' ? "text-green-600" : "text-red-600"
              )}>
                {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuração da Análise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Período da Análise</h4>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="content">Análise de Conteúdo</TabsTrigger>
          <TabsTrigger value="cross">Análise Cruzada</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="#10b981" name="Positivo" />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negativo" />
                    <Line type="monotone" dataKey="neutral" stroke="#6366f1" name="Neutro" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Sentimento Geral</TableHead>
                    <TableHead>Palavras-chave Positivas</TableHead>
                    <TableHead>Palavras-chave Negativas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Portal Principal</TableCell>
                    <TableCell className="text-green-600">Positivo (85%)</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">excelente</Badge>
                        <Badge variant="outline">inovador</Badge>
                        <Badge variant="outline">eficiente</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">demorado</Badge>
                        <Badge variant="outline">complexo</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise Comparativa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={crossAnalysisData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Fonte A" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Radar name="Fonte B" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                    <Radar name="Fonte C" dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

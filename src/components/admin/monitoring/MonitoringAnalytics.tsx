import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface ActiveMonitoring {
  id: string;
  name: string;
  type: string;
  metrics: string[];
  status: "active" | "inactive" | "analyzing";
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

  // Simula busca de monitoramentos ativos
  useEffect(() => {
    // Aqui você faria uma chamada à API real
    const fetchActiveMonitorings = async () => {
      // Dados mockados - em produção viriam da API
      const monitorings = [
        {
          id: "1",
          name: "Portal Principal",
          type: "url",
          metrics: ["uptime", "responseTime", "contentAnalysis"],
          status: "active" as const
        },
        {
          id: "2",
          name: "Blog Corporativo",
          type: "url",
          metrics: ["uptime", "errorRate"],
          status: "active" as const
        },
        {
          id: "3",
          name: "API de Produtos",
          type: "api",
          metrics: ["uptime", "responseTime", "errorRate"],
          status: "active" as const
        }
      ];
      // setActiveMonitorings(monitorings);
    };

    fetchActiveMonitorings();
  }, []);

  // Dados mockados para exemplo - em produção viriam da API
  const predictiveData = [
    { time: "1h", actual: 250, predicted: 255 },
    { time: "2h", actual: 280, predicted: 275 },
    { time: "3h", actual: 260, predicted: 265 },
    { time: "4h", actual: 290, predicted: 285 },
    { time: "5h", actual: 270, predicted: 275 },
  ];

  const contentAnalysis = [
    { 
      source: "Portal Principal",
      keywords: ["tecnologia", "inovação", "desenvolvimento"],
      sentiment: "positivo",
      relevance: 0.85
    },
    {
      source: "Blog Corporativo",
      keywords: ["mercado", "tendências", "análise"],
      sentiment: "neutro",
      relevance: 0.75
    }
  ];

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração da Análise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Monitoramentos Disponíveis</h4>
            <div className="flex flex-wrap gap-2">
              {/* activeMonitorings.map((monitoring) => (
                <Badge
                  key={monitoring.id}
                  variant={selectedSources.includes(monitoring.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSourceToggle(monitoring.id)}
                >
                  {monitoring.name}
                  <div className="ml-2 text-xs opacity-70">
                    ({monitoring.metrics.length} métricas)
                  </div>
                </Badge>
              )) */}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Período de Análise</h4>
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

          {selectedSources.length === 0 ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione pelo menos um monitoramento para visualizar a análise preditiva
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Previsão de Comportamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictiveData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#6366f1"
                        name="Valor Real"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#10b981"
                        name="Previsão"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detecção de Anomalias</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monitoramento</TableHead>
                      <TableHead>Métrica</TableHead>
                      <TableHead>Valor Atual</TableHead>
                      <TableHead>Valor Esperado</TableHead>
                      <TableHead>Desvio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSources.map(sourceId => {
                      // const monitoring = activeMonitorings.find(m => m.id === sourceId);
                      return [
                        // monitoring?.metrics.map(metric => (
                        //   <TableRow key={`${sourceId}-${metric}`}>
                        //     <TableCell>{monitoring.name}</TableCell>
                        //     <TableCell>{metric}</TableCell>
                        //     <TableCell>350ms</TableCell>
                        //     <TableCell>250ms</TableCell>
                        //     <TableCell className="text-red-500">+40%</TableCell>
                        //   </TableRow>
                        // ))
                      ].flat()}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {/* !selectedSources.some(id => 
            activeMonitorings.find(m => m.id === id)?.metrics.includes("contentAnalysis")
          ) ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione um monitoramento que inclua análise de conteúdo
              </CardContent>
            </Card>
          ) : ( */}
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
          {/* )} */}
        </TabsContent>

        <TabsContent value="cross" className="space-y-4">
          {/* {selectedSources.length < 2 ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione pelo menos dois monitoramentos para realizar análise cruzada
              </CardContent>
            </Card>
          ) : ( */}
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
          {/* )} */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Plus, X } from "lucide-react";

interface AnalyticsProps {}

interface ActiveMonitoring {
  id: string;
  name: string;
  type: string;
  metrics: string[];
  status: "active" | "inactive" | "analyzing";
}

export const MonitoringAnalytics: React.FC<AnalyticsProps> = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = useState("predictive");
  const [activeMonitorings, setActiveMonitorings] = useState<ActiveMonitoring[]>([]);

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
      setActiveMonitorings(monitorings);
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
              {activeMonitorings.map((monitoring) => (
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
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Período de Análise</h4>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="content">Análise de Conteúdo</TabsTrigger>
          <TabsTrigger value="cross">Análise Cruzada</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-4">
          {selectedSources.length === 0 ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione pelo menos um monitoramento para visualizar a análise preditiva
              </CardContent>
            </Card>
          ) : (
            <>
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
                        const monitoring = activeMonitorings.find(m => m.id === sourceId);
                        return monitoring?.metrics.map(metric => (
                          <TableRow key={`${sourceId}-${metric}`}>
                            <TableCell>{monitoring.name}</TableCell>
                            <TableCell>{metric}</TableCell>
                            <TableCell>350ms</TableCell>
                            <TableCell>250ms</TableCell>
                            <TableCell className="text-red-500">+40%</TableCell>
                          </TableRow>
                        ));
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {!selectedSources.some(id => 
            activeMonitorings.find(m => m.id === id)?.metrics.includes("contentAnalysis")
          ) ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione um monitoramento que inclua análise de conteúdo
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Análise de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monitoramento</TableHead>
                      <TableHead>Palavras-chave</TableHead>
                      <TableHead>Sentimento</TableHead>
                      <TableHead>Relevância</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSources.map(sourceId => {
                      const monitoring = activeMonitorings.find(m => m.id === sourceId);
                      if (!monitoring?.metrics.includes("contentAnalysis")) return null;
                      
                      const analysis = contentAnalysis.find(a => a.source === monitoring.name);
                      if (!analysis) return null;

                      return (
                        <TableRow key={sourceId}>
                          <TableCell>{monitoring.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {analysis.keywords.map((keyword, idx) => (
                                <Badge key={idx} variant="outline">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{analysis.sentiment}</TableCell>
                          <TableCell>{(analysis.relevance * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cross" className="space-y-4">
          {selectedSources.length < 2 ? (
            <Card>
              <CardContent className="py-4 text-center text-muted-foreground">
                Selecione pelo menos dois monitoramentos para realizar análise cruzada
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Análise Cruzada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Métricas Disponíveis</h4>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma métrica" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(new Set(
                          selectedSources.flatMap(sourceId => 
                            activeMonitorings.find(m => m.id === sourceId)?.metrics || []
                          )
                        )).map(metric => (
                          <SelectItem key={metric} value={metric}>
                            {metric}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tipo de Comparação</h4>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trend">Tendência</SelectItem>
                        <SelectItem value="correlation">Correlação</SelectItem>
                        <SelectItem value="comparison">Comparação Direta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {/* Gráfico será preenchido com dados reais */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

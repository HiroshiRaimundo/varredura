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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração da Análise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Período da Análise</h4>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Análises</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Análise de Sentimento</Badge>
              <Badge variant="outline">Análise de Tendências</Badge>
              <Badge variant="outline">Análise de Frequência</Badge>
              <Badge variant="outline">Análise de Links</Badge>
              <Badge variant="outline">Análise da Estrutura de Navegação</Badge>
              <Badge variant="outline">Análise de Performance</Badge>
              <Badge variant="outline">Análise do Desempenho e Disponibilidade</Badge>
              <Badge variant="outline">Análise de Disponibilidade</Badge>
              <Badge variant="outline">Monitoramento de Uptime e Resposta</Badge>
              <Badge variant="outline">Análise de Metadados</Badge>
              <Badge variant="outline">Análise de Meta Informações</Badge>
              <Badge variant="outline">Análise de Dados Estruturados</Badge>
              <Badge variant="outline">Análise de Dados em Formatos Específicos</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-4 lg:grid-cols-4 overflow-auto">
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="content">Análise de Conteúdo</TabsTrigger>
          <TabsTrigger value="cross">Análise Cruzada</TabsTrigger>
          <TabsTrigger value="sentiment">Análise de Sentimento</TabsTrigger>
          <TabsTrigger value="trends">Análise de Tendências</TabsTrigger>
          <TabsTrigger value="frequency">Análise de Frequência</TabsTrigger>
          <TabsTrigger value="links">Análise de Links</TabsTrigger>
          <TabsTrigger value="navigation">Análise da Estrutura de Navegação</TabsTrigger>
          <TabsTrigger value="performance">Análise de Performance</TabsTrigger>
          <TabsTrigger value="availability">Análise de Disponibilidade</TabsTrigger>
          <TabsTrigger value="uptime">Monitoramento de Uptime e Resposta</TabsTrigger>
          <TabsTrigger value="metadata">Análise de Metadados</TabsTrigger>
          <TabsTrigger value="metainfo">Análise de Meta Informações</TabsTrigger>
          <TabsTrigger value="structured">Análise de Dados Estruturados</TabsTrigger>
          <TabsTrigger value="specificformats">Análise de Dados em Formatos Específicos</TabsTrigger>
          <TabsTrigger value="performance_availability">Análise do Desempenho e Disponibilidade</TabsTrigger>
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

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" fill="#10b981" name="Positivo" />
                    <Bar dataKey="negative" fill="#ef4444" name="Negativo" />
                    <Bar dataKey="neutral" fill="#6366f1" name="Neutro" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
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
                    <Line type="monotone" dataKey="positive" stroke="#10b981" name="Tendência Positiva" />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Tendência Negativa" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de frequência serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de links serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise da Estrutura de Navegação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise da estrutura de navegação serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de performance serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de disponibilidade serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uptime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Uptime e Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de monitoramento de uptime e resposta serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Metadados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de metadados serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metainfo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Meta Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de meta informações serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Dados Estruturados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de dados estruturados serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specificformats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Dados em Formatos Específicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise de dados em formatos específicos serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance_availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise do Desempenho e Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-muted-foreground">
                Dados de análise do desempenho e disponibilidade serão exibidos aqui com base no monitoramento selecionado.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

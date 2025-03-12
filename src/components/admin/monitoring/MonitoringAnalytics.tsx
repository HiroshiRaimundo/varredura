import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown, AlertTriangle, Search, Filter, Grid, List } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<'category' | 'type' | 'none'>('category');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 10;

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

  // Dados mockados para exemplo de temas
  const themes = [
    { id: '1', name: 'Site Principal', category: 'Sites', type: 'Performance' },
    { id: '2', name: 'Blog Corporativo', category: 'Sites', type: 'Conteúdo' },
    { id: '3', name: 'API de Produtos', category: 'APIs', type: 'Performance' },
    { id: '4', name: 'API de Usuários', category: 'APIs', type: 'Segurança' },
    { id: '5', name: 'Grupo de Redes Sociais', category: 'Grupos', type: 'Sentimento' },
    // ... mais temas
  ];

  // Filtragem e agrupamento de temas
  const filteredAndGroupedThemes = useMemo(() => {
    let filtered = themes;
    
    // Aplicar busca
    if (searchQuery) {
      filtered = filtered.filter(theme => 
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Agrupar resultados
    if (groupBy === 'none') {
      return { ungrouped: filtered };
    }

    return filtered.reduce((groups: { [key: string]: typeof themes }, theme) => {
      const key = groupBy === 'category' ? theme.category : theme.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(theme);
      return groups;
    }, {});
  }, [themes, searchQuery, groupBy]);

  // Paginação
  const totalPages = Math.ceil(Object.values(filteredAndGroupedThemes).flat().length / itemsPerPage);
  const paginatedThemes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const allThemes = Object.values(filteredAndGroupedThemes).flat();
    return allThemes.slice(start, start + itemsPerPage);
  }, [filteredAndGroupedThemes, currentPage]);

  return (
    <div className="space-y-6">
      {/* Barra de Ferramentas */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 items-center w-full md:w-auto">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>
            <div className="flex gap-4 items-center w-full md:w-auto">
              <Select 
                defaultValue={groupBy}
                onValueChange={(value: 'category' | 'type' | 'none') => {
                  setGroupBy(value);
                }}
              >
                <SelectTrigger className="w-[180px]" onClick={(e) => e.preventDefault()}>
                  <SelectValue placeholder="Agrupar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category" onSelect={(e) => e.preventDefault()}>Categoria</SelectItem>
                  <SelectItem value="type" onSelect={(e) => e.preventDefault()}>Tipo de Análise</SelectItem>
                  <SelectItem value="none" onSelect={(e) => e.preventDefault()}>Sem Agrupamento</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Lista de Temas */}
      <div className="space-y-6">
        {Object.entries(filteredAndGroupedThemes).map(([group, items]) => (
          <Card key={group}>
            <CardHeader>
              <CardTitle>{group === 'ungrouped' ? 'Todos os Temas' : group}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "grid gap-4",
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              )}>
                {items.map((theme) => (
                  <Card key={theme.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{theme.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{theme.category}</p>
                        </div>
                        <Badge>{theme.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                          <TabsTrigger value="metrics">Métricas</TabsTrigger>
                          <TabsTrigger value="details">Detalhes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Status</span>
                              <Badge variant="outline">Ativo</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Última Análise</span>
                              <span className="text-muted-foreground">2 min atrás</span>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="metrics">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Precisão</span>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">95%</span>
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Cobertura</span>
                              <div className="flex items-center gap-2">
                                <span className="text-amber-600">85%</span>
                                <TrendingDown className="w-4 h-4 text-amber-600" />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="details">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Última atualização: {new Date().toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="outline">API</Badge>
                              <Badge variant="outline">Performance</Badge>
                              <Badge variant="outline">Monitorado</Badge>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

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

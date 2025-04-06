
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { MonitoringAlert, ReleaseAnalysis } from "@/types/adminTypes";
import { AlertCircle, BarChart2, Clock, Filter, MapPin, Bell, Activity, Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for the dashboard
const mockReleaseStats = [
  { name: "Jan", approved: 45, rejected: 12, total: 57 },
  { name: "Fev", approved: 38, rejected: 18, total: 56 },
  { name: "Mar", approved: 52, rejected: 8, total: 60 },
  { name: "Abr", approved: 63, rejected: 15, total: 78 },
  { name: "Mai", approved: 42, rejected: 11, total: 53 },
  { name: "Jun", approved: 48, rejected: 9, total: 57 },
];

const mockClientPerformance = [
  { name: "Cliente A", approvalRate: 89, responseTime: 1.2, submissions: 45 },
  { name: "Cliente B", approvalRate: 65, responseTime: 3.6, submissions: 32 },
  { name: "Cliente C", approvalRate: 92, responseTime: 0.8, submissions: 28 },
  { name: "Cliente D", approvalRate: 74, responseTime: 2.1, submissions: 19 },
  { name: "Cliente E", approvalRate: 81, responseTime: 1.5, submissions: 15 },
];

const mockMonitoringAlerts: MonitoringAlert[] = [
  {
    id: "alert-1",
    type: "spike",
    severity: "high",
    source: "Twitter",
    message: "Aumento repentino de 300% nas menções ao Cliente A nos últimos 30 minutos",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    relatedReleaseId: "rel-123",
    isRead: false,
    isResolved: false
  },
  {
    id: "alert-2",
    type: "competitor",
    severity: "medium",
    source: "Blogs",
    message: "Competidor X mencionado junto à palavra-chave 'inovação sustentável' do Cliente B",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    relatedReleaseId: "rel-124",
    isRead: true,
    isResolved: false
  },
  {
    id: "alert-3",
    type: "unauthorized",
    severity: "medium",
    source: "blog-nao-autorizado.com.br",
    message: "Site não autorizado compartilhou conteúdo do release 'Lançamento Produto Z'",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    relatedReleaseId: "rel-125",
    isRead: false,
    isResolved: false
  },
  {
    id: "alert-4",
    type: "sentiment",
    severity: "high",
    source: "Fóruns de discussão",
    message: "Sentimento negativo detectado em 75% das menções ao 'Evento Y' do Cliente C",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    relatedReleaseId: "rel-126",
    isRead: false,
    isResolved: false
  }
];

const mockRegionMentions = [
  { name: "São Paulo", value: 420, sentiment: 0.65 },
  { name: "Rio de Janeiro", value: 240, sentiment: 0.48 },
  { name: "Belo Horizonte", value: 180, sentiment: 0.72 },
  { name: "Porto Alegre", value: 150, sentiment: 0.51 },
  { name: "Recife", value: 120, sentiment: 0.59 },
  { name: "Brasília", value: 110, sentiment: 0.43 },
  { name: "Salvador", value: 90, sentiment: 0.62 },
  { name: "Fortaleza", value: 80, sentiment: 0.55 },
];

const mockReleaseImpact = [
  { title: "Lançamento Produto X", mentions: 845, sentiment: 0.78, engagement: 32 },
  { title: "Parceria Estratégica", mentions: 623, sentiment: 0.82, engagement: 41 },
  { title: "Resultados Financeiros Q1", mentions: 412, sentiment: 0.45, engagement: 18 },
  { title: "Nova Política Ambiental", mentions: 356, sentiment: 0.91, engagement: 37 },
  { title: "Mudança na Liderança", mentions: 289, sentiment: 0.38, engagement: 24 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminMonitoringDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [alertFilter, setAlertFilter] = useState("all");
  const [filteredAlerts, setFilteredAlerts] = useState(mockMonitoringAlerts);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, these stats would be calculated from real data
  const kpis = {
    approvalRate: 82, // 82% of releases are approved
    responseTime: 1.8, // 1.8 hours on average
    impactScore: 420, // arbitrary score
    alertsTriggered: mockMonitoringAlerts.length
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      toast({
        title: "Dados atualizados",
        description: "Os dados de monitoramento foram atualizados com sucesso."
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleFilterAlerts = (type: string) => {
    setAlertFilter(type);
    if (type === "all") {
      setFilteredAlerts(mockMonitoringAlerts);
    } else {
      setFilteredAlerts(mockMonitoringAlerts.filter(alert => alert.type === type));
    }
  };

  const handleResolveAlert = (id: string) => {
    setFilteredAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, isResolved: true } : alert
      )
    );
    
    toast({
      title: "Alerta resolvido",
      description: "O alerta foi marcado como resolvido."
    });
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min atrás`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  };

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    const classes = {
      high: "bg-red-100 text-red-800 hover:bg-red-100",
      medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      low: "bg-blue-100 text-blue-800 hover:bg-blue-100"
    };
    
    const labels = {
      high: "Alta",
      medium: "Média",
      low: "Baixa"
    };
    
    return <Badge className={classes[severity]}>{labels[severity]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard de Monitoramento</h2>
          <p className="text-muted-foreground">
            Monitoramento em tempo real de releases, menções e alertas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleRefreshData}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <></>
            )}
            Atualizar dados
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{kpis.approvalRate}%</div>
              <p className="text-sm text-muted-foreground">Taxa de aprovação</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{kpis.responseTime}h</div>
              <p className="text-sm text-muted-foreground">Tempo médio de resposta</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{kpis.impactScore}</div>
              <p className="text-sm text-muted-foreground">Impacto estimado</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{kpis.alertsTriggered}</div>
              <p className="text-sm text-muted-foreground">Alertas ativos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="releases">Performance de Releases</TabsTrigger>
          <TabsTrigger value="geography">Mapa Geográfico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aprovação de Releases</CardTitle>
                <CardDescription>Taxa de aprovação e rejeição nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockReleaseStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" name="Aprovados" stackId="a" fill="#4ade80" />
                    <Bar dataKey="rejected" name="Rejeitados" stackId="a" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance por Cliente</CardTitle>
                <CardDescription>Taxa de aprovação e tempo de resposta</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockClientPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approvalRate" name="Taxa Aprovação (%)" fill="#60a5fa" />
                    <Bar dataKey="responseTime" name="Tempo Resposta (h)" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Impacto de Releases</CardTitle>
              <CardDescription>Menções, sentimento e engajamento dos top releases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockReleaseImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="mentions" name="Menções" fill="#8884d8" />
                    <Bar yAxisId="left" dataKey="engagement" name="Engajamento" fill="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="sentiment" name="Sentimento (0-1)" stroke="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Anomalias e alertas de monitoramento</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={alertFilter} onValueChange={handleFilterAlerts}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os alertas</SelectItem>
                  <SelectItem value="spike">Spikes de menções</SelectItem>
                  <SelectItem value="competitor">Menções de concorrentes</SelectItem>
                  <SelectItem value="unauthorized">Mídias não autorizadas</SelectItem>
                  <SelectItem value="sentiment">Sentimento negativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <Alert 
                  key={alert.id} 
                  className={`
                    ${alert.isResolved ? 'bg-gray-50' : alert.severity === 'high' ? 'bg-red-50' : 'bg-yellow-50'}
                    ${alert.isResolved ? 'border-gray-200' : alert.severity === 'high' ? 'border-red-200' : 'border-yellow-200'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${
                        alert.isResolved 
                          ? 'text-gray-400' 
                          : alert.severity === 'high' 
                            ? 'text-red-500' 
                            : 'text-yellow-500'
                      }`} />
                      <div>
                        <AlertTitle className={alert.isResolved ? 'text-gray-500' : ''}>
                          {alert.type === 'spike' ? 'Aumento repentino de menções' :
                           alert.type === 'competitor' ? 'Menção de concorrente' :
                           alert.type === 'unauthorized' ? 'Mídia não autorizada' :
                           'Alerta de sentimento negativo'}
                        </AlertTitle>
                        <AlertDescription className={alert.isResolved ? 'text-gray-400' : ''}>
                          {alert.message}
                        </AlertDescription>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="outline">{alert.source}</Badge>
                          {getSeverityBadge(alert.severity)}
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(alert.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {!alert.isResolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolver
                      </Button>
                    )}
                  </div>
                </Alert>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Nenhum alerta encontrado com os filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="releases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Correlação de Releases e Menções</CardTitle>
              <CardDescription>Impacto dos releases aprovados nas menções coletadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockReleaseStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="approved" name="Aprovados" stroke="#4ade80" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="total" name="Total Submissions" stroke="#f59e0b" yAxisId="right" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Sugestões baseadas em dados históricos:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Melhor momento para envio</p>
                          <p className="text-sm text-muted-foreground">
                            Releases enviados às quartas-feiras têm 30% mais engajamento.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Palavras-chave eficazes</p>
                          <p className="text-sm text-muted-foreground">
                            "Sustentabilidade" aumentou menções em 40% no último mês.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Clientes para treinamento</p>
                          <p className="text-sm text-muted-foreground">
                            Cliente Y tem 90% de reprovação - sugerido treinamento.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor - Origem das Menções</CardTitle>
              <CardDescription>Distribuição geográfica e sentimento das menções</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">Mapa interativo</p>
                <p className="text-muted-foreground mb-4">
                  Um mapa de calor interativo seria inserido aqui com dados reais.
                </p>
                <Button variant="outline">
                  Carregar Mapa Interativo
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Distribuição regional de menções</h3>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={mockRegionMentions}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockRegionMentions.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full lg:w-1/2">
                    <div className="h-[300px] overflow-y-auto p-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left pb-2">Região</th>
                            <th className="text-left pb-2">Menções</th>
                            <th className="text-left pb-2">Sentimento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRegionMentions.map((region) => (
                            <tr key={region.name} className="border-b">
                              <td className="py-2">{region.name}</td>
                              <td className="py-2">{region.value}</td>
                              <td className="py-2">
                                <div className="flex items-center">
                                  <div 
                                    className={`h-2 w-14 rounded-full ${
                                      region.sentiment > 0.7 
                                        ? 'bg-green-500' 
                                        : region.sentiment > 0.5 
                                          ? 'bg-yellow-500' 
                                          : 'bg-red-500'
                                    }`}
                                  ></div>
                                  <span className="ml-2">{region.sentiment.toFixed(2)}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMonitoringDashboard;

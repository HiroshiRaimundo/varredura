
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, AlertCircle, BarChart2, Calendar, Clock, PieChart, RefreshCw, CheckCircle } from "lucide-react";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";
import DashboardCard from './DashboardCard';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart as RePieChart } from 'recharts';

interface PressDashboardProps {
  clientType: string;
  releases?: ReleaseMonitoringItem[];
}

// Mock data for the dashboard
const mockPublishedReleases = [
  {
    id: "1",
    releaseTitle: "Nova tecnologia ambiental lançada no mercado",
    websiteName: "Folha de São Paulo",
    publishedDate: "10/06/2023",
    publishedTime: "14:30",
    url: "https://exemplo.com/noticia1",
    isVerified: true,
    status: "published",
    clientType: "observatory"
  },
  {
    id: "2",
    releaseTitle: "Resultados do estudo sobre qualidade do ar divulgados",
    websiteName: "G1",
    publishedDate: "15/05/2023",
    publishedTime: "10:00",
    url: "https://exemplo.com/noticia2",
    isVerified: true,
    status: "published",
    clientType: "researcher"
  },
  {
    id: "3",
    releaseTitle: "Novo programa de monitoramento ambiental",
    websiteName: "Estadão",
    publishedDate: "20/06/2023",
    publishedTime: "09:00",
    url: "https://exemplo.com/noticia3",
    isVerified: true,
    status: "published",
    clientType: "institution"
  }
];

const recentActivity = [
  {
    id: "1",
    action: "Release aprovado",
    title: "Nova tecnologia sustentável",
    date: "Hoje, 14:30",
    status: "approved"
  },
  {
    id: "2",
    action: "Release publicado",
    title: "Resultados de pesquisa ambiental",
    date: "Ontem, 09:15",
    status: "published"
  },
  {
    id: "3",
    action: "Release enviado",
    title: "Comunicado sobre reciclagem",
    date: "10/06/2023, 11:45",
    status: "pending"
  }
];

const chartData = [
  { name: 'Jan', value: 2 },
  { name: 'Fev', value: 3 },
  { name: 'Mar', value: 5 },
  { name: 'Abr', value: 4 },
  { name: 'Mai', value: 7 },
  { name: 'Jun', value: 6 },
];

const pieData = [
  { name: 'Publicados', value: 12, color: '#10B981' },
  { name: 'Aprovados', value: 5, color: '#3B82F6' },
  { name: 'Pendentes', value: 3, color: '#F59E0B' },
  { name: 'Rejeitados', value: 1, color: '#EF4444' },
];

const PressDashboard: React.FC<PressDashboardProps> = ({ clientType, releases = mockPublishedReleases }) => {
  const [timeRange, setTimeRange] = useState("last30days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard de Assessoria de Imprensa</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho dos seus releases e publicações na mídia
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={refreshData} 
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="last7days">Últimos 7 dias</option>
            <option value="last30days">Últimos 30 dias</option>
            <option value="last90days">Últimos 90 dias</option>
            <option value="thisyear">Este ano</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Releases"
          value="21"
          description="Total de releases enviados"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Publicados"
          value="12"
          description="Releases veiculados na mídia"
          icon={<ExternalLink className="h-4 w-4 text-green-500" />}
          trend={{ value: 20, isPositive: true }}
        />
        <DashboardCard
          title="Taxa de Aprovação"
          value="85%"
          description="Releases aprovados para envio"
          icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Tempo Médio"
          value="1.5 dias"
          description="Da aprovação à publicação"
          icon={<Clock className="h-4 w-4 text-orange-500" />}
          trend={{ value: 10, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Publicações por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Status dos Releases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="published">Publicados</TabsTrigger>
          <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
        </TabsList>

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Releases Publicados</CardTitle>
              <CardDescription>Todos os releases que foram publicados em veículos de mídia</CardDescription>
            </CardHeader>
            <CardContent>
              {releases.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Veículo</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead className="text-right">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {releases.map((release) => (
                        <TableRow key={release.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              {release.releaseTitle}
                            </div>
                          </TableCell>
                          <TableCell>{release.websiteName}</TableCell>
                          <TableCell>{release.publishedDate}</TableCell>
                          <TableCell>{release.publishedTime}</TableCell>
                          <TableCell className="text-right">
                            {release.url && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => window.open(release.url, '_blank')}
                                className="h-8 w-8 p-0"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Abrir link</span>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum release publicado encontrado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Histórico recente de ações e notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 border-b pb-4">
                    <div className={`rounded-full p-2 ${
                      activity.status === 'published' ? 'bg-green-100' : 
                      activity.status === 'approved' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'published' ? (
                        <ExternalLink className={`h-4 w-4 ${
                          activity.status === 'published' ? 'text-green-500' : 
                          activity.status === 'approved' ? 'text-blue-500' : 'text-yellow-500'
                        }`} />
                      ) : activity.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-700">Dica de Monitoramento</AlertTitle>
        <AlertDescription className="text-blue-600">
          Utilize o sistema de monitoramento para acompanhar publicações dos seus releases em tempo real. 
          Adicione os veículos-alvo para receber alertas quando seu conteúdo for publicado.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PressDashboard;

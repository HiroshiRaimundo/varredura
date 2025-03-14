import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  FileText, 
  MessageSquare,
  Share2,
  AlertCircle
} from "lucide-react";

interface DashboardMetric {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
}

const ClientFlowDashboard: React.FC = () => {
  const clientMetrics: DashboardMetric[] = [
    {
      title: "Total de Clientes",
      value: 248,
      change: "+12% este mês",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Monitoramentos Ativos",
      value: 1842,
      change: "+8% este mês",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Releases Publicados",
      value: 324,
      change: "+15% este mês",
      trend: "up",
      icon: <FileText className="h-4 w-4" />
    }
  ];

  const pressMetrics: DashboardMetric[] = [
    {
      title: "Contatos de Mídia",
      value: 156,
      change: "+5% este mês",
      trend: "up",
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      title: "Alcance na Mídia",
      value: "2.4M",
      change: "+18% este mês",
      trend: "up",
      icon: <Share2 className="h-4 w-4" />
    },
    {
      title: "Alertas Gerados",
      value: 89,
      change: "-2% este mês",
      trend: "down",
      icon: <AlertCircle className="h-4 w-4" />
    }
  ];

  const renderMetricCard = (metric: DashboardMetric) => (
    <Card key={metric.title}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          {metric.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        {metric.change && (
          <p className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {metric.change}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="clients">Fluxo de Clientes</TabsTrigger>
          <TabsTrigger value="press">Assessoria de Imprensa</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[...clientMetrics, ...pressMetrics].map(renderMetricCard)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Distribuição de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  Gráfico de distribuição de clientes por tipo
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Crescimento Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  Gráfico de crescimento mensal de clientes
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {clientMetrics.map(renderMetricCard)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade dos Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Observatório de Políticas</p>
                      <p className="text-sm text-muted-foreground">12 monitoramentos ativos</p>
                    </div>
                    <span className="text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Instituto de Pesquisa XYZ</p>
                      <p className="text-sm text-muted-foreground">8 monitoramentos ativos</p>
                    </div>
                    <span className="text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Assessoria Política ABC</p>
                      <p className="text-sm text-muted-foreground">15 monitoramentos ativos</p>
                    </div>
                    <span className="text-green-600">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Interações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Novo Monitoramento Criado</p>
                      <p className="text-sm text-muted-foreground">Por: Observatório de Políticas</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 1 hora</p>
                  </div>
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Release Aprovado</p>
                      <p className="text-sm text-muted-foreground">Por: Assessoria ABC</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 2 horas</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">Alerta de Menção</p>
                      <p className="text-sm text-muted-foreground">Para: Instituto XYZ</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 3 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="press">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {pressMetrics.map(renderMetricCard)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimos Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Análise do Cenário Político 2025</p>
                      <p className="text-sm text-muted-foreground">15 menções na mídia</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Publicado hoje</p>
                  </div>
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Relatório de Impacto Social</p>
                      <p className="text-sm text-muted-foreground">8 menções na mídia</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 2 dias</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">Pesquisa de Opinião Pública</p>
                      <p className="text-sm text-muted-foreground">12 menções na mídia</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 3 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cobertura de Mídia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Jornal Nacional</p>
                      <p className="text-sm text-muted-foreground">5 menções esta semana</p>
                    </div>
                    <span className="text-green-600">+2</span>
                  </div>
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Folha de São Paulo</p>
                      <p className="text-sm text-muted-foreground">8 menções esta semana</p>
                    </div>
                    <span className="text-green-600">+3</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">O Globo</p>
                      <p className="text-sm text-muted-foreground">6 menções esta semana</p>
                    </div>
                    <span className="text-green-600">+1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoramentos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Política Educacional</p>
                      <p className="text-sm text-muted-foreground">32 alertas esta semana</p>
                    </div>
                    <span className="text-green-600">Ativo</span>
                  </div>
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Reforma Tributária</p>
                      <p className="text-sm text-muted-foreground">28 alertas esta semana</p>
                    </div>
                    <span className="text-green-600">Ativo</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">Saúde Pública</p>
                      <p className="text-sm text-muted-foreground">45 alertas esta semana</p>
                    </div>
                    <span className="text-green-600">Ativo</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimos Alertas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Nova Legislação</p>
                      <p className="text-sm text-muted-foreground">Política Educacional</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 30min</p>
                  </div>
                  <div className="flex items-center gap-4 border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">Votação Importante</p>
                      <p className="text-sm text-muted-foreground">Reforma Tributária</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 1h</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">Menção na Mídia</p>
                      <p className="text-sm text-muted-foreground">Saúde Pública</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 2h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientFlowDashboard;

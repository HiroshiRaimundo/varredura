
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Users, FileText, Bell, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ReleaseStatusChart from "./ReleaseStatusChart";
import RecentAlerts from "./RecentAlerts";
import MonitoringStatusChart from "./MonitoringStatusChart";

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();

  const handleNewRelease = () => {
    const event = new CustomEvent("dashboard:tab:change", { detail: { tab: "releases", subTab: "create" } });
    window.dispatchEvent(event);
    toast({
      title: "Novo Release",
      description: "Redirecionando para criação de release",
    });
  };

  const handleNewMonitoring = () => {
    const event = new CustomEvent("dashboard:tab:change", { detail: { tab: "monitoring", subTab: "new" } });
    window.dispatchEvent(event);
    toast({
      title: "Novo Monitoramento",
      description: "Redirecionando para criação de monitoramento",
    });
  };

  const handleGenerateReport = () => {
    const event = new CustomEvent("dashboard:tab:change", { detail: { tab: "reports", subTab: "generate" } });
    window.dispatchEvent(event);
    toast({
      title: "Gerar Relatório",
      description: "Redirecionando para geração de relatório",
    });
  };

  const handleMediaAnalysis = () => {
    const event = new CustomEvent("dashboard:tab:change", { detail: { tab: "monitoring", subTab: "results" } });
    window.dispatchEvent(event);
    toast({
      title: "Análise de Mídia",
      description: "Redirecionando para análise de mídia",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total de Releases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 no último mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Monitoramentos Ativos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 no último mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 não lidos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Menções na Mídia</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +24% este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Status dos Releases</CardTitle>
            <CardDescription>
              Visão geral do status dos seus releases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReleaseStatusChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>
              Últimos 5 alertas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAlerts />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monitoramento de Termos</CardTitle>
            <CardDescription>
              Status dos seus monitoramentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonitoringStatusChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesse rapidamente as funcionalidades principais
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center" onClick={handleNewRelease}>
                <FileText className="h-6 w-6 mb-2" />
                <span>Novo Release</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" onClick={handleNewMonitoring}>
                <Eye className="h-6 w-6 mb-2" />
                <span>Novo Monitoramento</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" onClick={handleGenerateReport}>
                <BarChart className="h-6 w-6 mb-2" />
                <span>Gerar Relatório</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" onClick={handleMediaAnalysis}>
                <LineChart className="h-6 w-6 mb-2" />
                <span>Análise de Mídia</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;

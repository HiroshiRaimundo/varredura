import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitoringForm } from "./MonitoringForm";
import { MonitoringAnalytics } from "./MonitoringAnalytics";
import { MonitoringReports } from "./reports/MonitoringReports";
import { MonitoringOverview } from "./overview/MonitoringOverview";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface MonitoringSummary {
  total: number;
  active: number;
  inAnalysis: number;
  pendingAnalysis: number;
  lastUpdated: string;
}

export const AdminMonitoringDashboard: React.FC = () => {
  // Dados mockados para exemplo
  const summary: MonitoringSummary = {
    total: 25,
    active: 18,
    inAnalysis: 5,
    pendingAnalysis: 2,
    lastUpdated: new Date().toLocaleString()
  };

  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.includes("new") ? "new" : location.pathname.includes("analytics") ? "analytics" : location.pathname.includes("reports") ? "reports" : "overview";

  const handleTabChange = (value: string) => {
    if (value === "new") {
      navigate("/admin/monitoring/new", { replace: true });
    } else if (value === "analytics") {
      navigate("/admin/monitoring/analytics", { replace: true });
    } else if (value === "reports") {
      navigate("/admin/monitoring/reports", { replace: true });
    } else {
      navigate("/admin/monitoring", { replace: true });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Monitoramento</h2>
        <p className="text-muted-foreground">
          Gerencie e analise seus monitoramentos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Monitoramentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoramentos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.inAnalysis}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análises Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pendingAnalysis}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="new">Novo Monitoramento</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <MonitoringOverview />
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <MonitoringForm />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <MonitoringAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <MonitoringReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

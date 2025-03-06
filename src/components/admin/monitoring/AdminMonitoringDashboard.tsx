import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitoringList } from "./MonitoringList";
import { MonitoringForm } from "./MonitoringForm";
import { MonitoringStats } from "./MonitoringStats";
import { MonitoringSettings } from "./MonitoringSettings";

interface AdminMonitoringDashboardProps {
  defaultTab?: "overview" | "add" | "settings" | "reports";
}

const getTabFromPath = (path: string) => {
  if (path.includes("/add")) return "add";
  if (path.includes("/settings")) return "settings";
  if (path.includes("/reports")) return "reports";
  return "overview";
};

const AdminMonitoringDashboard: React.FC<AdminMonitoringDashboardProps> = ({ defaultTab = "overview" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));

  useEffect(() => {
    const currentTab = getTabFromPath(location.pathname);
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    const paths = {
      overview: "/admin/monitoring",
      add: "/admin/monitoring/add",
      settings: "/admin/monitoring/settings",
      reports: "/admin/monitoring/reports"
    };

    const newPath = paths[value as keyof typeof paths];
    if (newPath && newPath !== location.pathname) {
      navigate(newPath);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Central de Monitoramento</h2>
        <p className="text-muted-foreground">
          Gerencie todos os monitoramentos do sistema
        </p>
      </div>

      <MonitoringStats />

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="add">Novo Monitoramento</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramentos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios e Análises</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Componente de relatórios será implementado posteriormente */}
              <p>Em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { AdminMonitoringDashboard };

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { MonitoringList } from "./MonitoringList";
import { MonitoringForm } from "./MonitoringForm";
import { MonitoringStats } from "./MonitoringStats";
import { MonitoringSettings } from "./MonitoringSettings";
import { MonitoringAnalytics } from "./MonitoringAnalytics";
import { MonitoringReports } from "./MonitoringReports";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const AdminMonitoringDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/").pop() || "overview";
  const [activeTab, setActiveTab] = useState(path);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/monitoring/${value === "overview" ? "" : value}`);
  };

  const handleBackToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToAdmin}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold mb-2">Central de Monitoramento</h2>
          <p className="text-muted-foreground">
            Gerencie todos os monitoramentos do sistema
          </p>
        </div>
      </div>

      <MonitoringStats />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="add">Novo Monitoramento</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
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

        <TabsContent value="analytics">
          <MonitoringAnalytics />
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
              <MonitoringReports />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

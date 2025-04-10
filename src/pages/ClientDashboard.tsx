
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardOverview from "@/components/client/dashboard/DashboardOverview";
import ReleaseTab from "@/components/client/releases/ReleaseTab";
import MonitoringTab from "@/components/client/monitoring/MonitoringTab";
import ReportsTab from "@/components/client/reports/ReportsTab";
import AlertsTab from "@/components/client/alerts/AlertsTab";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Escutar eventos personalizados do dashboard para trocar de aba
    const handleTabChange = (event: CustomEvent<{ tab: string, subTab?: string }>) => {
      setActiveTab(event.detail.tab);
      
      // Se houver uma subaba especificada, podemos criar outro estado para ela
      // e passá-la para o componente apropriado
      if (event.detail.subTab) {
        // Aqui poderíamos armazenar a subaba em um estado se necessário
        console.log("Subaba solicitada:", event.detail.subTab);
      }
    };

    window.addEventListener("dashboard:tab:change", handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener("dashboard:tab:change", handleTabChange as EventListener);
    };
  }, []);

  if (!auth.isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => {}} 
            onLogoutClick={auth.handleLogout} 
          />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard do Cliente</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo à sua área de cliente. Gerencie seus releases, monitoramentos e relatórios.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="releases">Releases</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="releases">
              <ReleaseTab />
            </TabsContent>

            <TabsContent value="monitoring">
              <MonitoringTab />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientDashboard;

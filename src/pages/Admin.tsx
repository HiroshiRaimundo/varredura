
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useResearch } from "@/hooks/useResearch";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TabContent from "@/components/dashboard/TabContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReleaseManagement from "@/components/admin/ReleaseManagement";
import ClientDashboardControls from "@/components/admin/ClientDashboardControls";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("mensal");
  
  // Hooks personalizados
  const auth = useAuth();
  const monitoring = useMonitoring();
  const research = useResearch();

  // Verificar autenticação e redirecionar se não estiver autenticado
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    } else {
      // Carregar dados do Supabase ao iniciar, somente se estiver autenticado
      monitoring.fetchMonitoringItems();
      research.fetchResearchStudies();
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null; // Não renderizar nada se não estiver autenticado
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout} 
        />

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="releases">Gerenciar Releases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            {/* Novo componente de controle de dashboard para clientes */}
            <ClientDashboardControls 
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              handleExport={monitoring.handleExport}
            />
            
            {/* Dashboard e monitoramento existentes */}
            <TabContent 
              isAuthenticated={auth.isAuthenticated}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              handleExport={monitoring.handleExport}
              monitoringItems={monitoring.monitoringItems}
              studies={research.studies}
              monitoringForm={monitoring.form}
              studyForm={research.form}
              handleAddMonitoring={monitoring.handleAddMonitoring}
              handleDeleteMonitoring={monitoring.handleDeleteMonitoring}
              handleStudySubmit={research.handleStudySubmit}
              handleDeleteStudy={research.handleDeleteStudy}
              isLoading={monitoring.isLoading}
              uniqueResponsibles={monitoring.getUniqueResponsibles()}
              responsibleFilter={monitoring.responsibleFilter}
              setResponsibleFilter={monitoring.setResponsibleFilter}
            />
          </TabsContent>
          
          <TabsContent value="releases">
            <ReleaseManagement />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useResearch } from "@/hooks/useResearch";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TabContent from "@/components/dashboard/TabContent";

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
    }
    
    // Carregar dados do Supabase ao iniciar
    monitoring.fetchMonitoringItems();
    research.fetchResearchStudies();
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
      </div>

      <Footer />
    </div>
  );
};

export default Admin;

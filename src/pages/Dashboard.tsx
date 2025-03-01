
import React, { useState } from "react";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useResearch } from "@/hooks/useResearch";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/Dashboard";

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("mensal");
  
  // Hooks personalizados
  const monitoring = useMonitoring();
  const research = useResearch();

  // Carregar dados do Supabase ao iniciar
  React.useEffect(() => {
    monitoring.fetchMonitoringItems();
    research.fetchResearchStudies();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={false} 
          onLoginClick={() => window.location.href = "/login"} 
          onLogoutClick={() => {}} 
        />

        <div className="grid gap-6">
          <Dashboard 
            data={Array.from({ length: 12 }, (_, i) => ({
              name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
              estudos: 0,
              monitoramentos: 0,
              atualizacoes: 0
            }))}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={() => {}}
            isAuthenticated={false}
            monitoringItems={monitoring.monitoringItems}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;

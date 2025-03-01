
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("mensal");
  const auth = useAuth();
  const monitoring = useMonitoring();
  const navigate = useNavigate();

  // Gerar dados de exemplo
  const data = [
    { name: "Jan", estudos: 10, monitoramentos: 40, atualizacoes: 24 },
    { name: "Fev", estudos: 15, monitoramentos: 30, atualizacoes: 13 },
    { name: "Mar", estudos: 20, monitoramentos: 45, atualizacoes: 20 },
    { name: "Abr", estudos: 25, monitoramentos: 50, atualizacoes: 27 },
    { name: "Mai", estudos: 30, monitoramentos: 55, atualizacoes: 30 },
    { name: "Jun", estudos: 20, monitoramentos: 60, atualizacoes: 33 },
    { name: "Jul", estudos: 15, monitoramentos: 65, atualizacoes: 37 },
    { name: "Ago", estudos: 25, monitoramentos: 70, atualizacoes: 40 },
    { name: "Set", estudos: 30, monitoramentos: 75, atualizacoes: 44 },
    { name: "Out", estudos: 35, monitoramentos: 80, atualizacoes: 48 },
    { name: "Nov", estudos: 40, monitoramentos: 85, atualizacoes: 52 },
    { name: "Dez", estudos: 45, monitoramentos: 90, atualizacoes: 57 }
  ];

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated}
          onLoginClick={() => navigate('/login')}
          onLogoutClick={auth.handleLogout}
        />

        <Dashboard 
          data={data}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          handleExport={monitoring.handleExport}
          isAuthenticated={auth.isAuthenticated}
          monitoringItems={monitoring.monitoringItems}
          showClientButton={false}
        />
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;

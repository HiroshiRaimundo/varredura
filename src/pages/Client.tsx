
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientSelection from "@/components/client/ClientSelection";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import ClientContent from "@/components/client/ClientContent";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import { Button } from "@/components/ui/button";

const Client: React.FC = () => {
  const { clientType } = useParams<{ clientType?: string }>();
  const navigate = useNavigate();
  const monitoring = useMonitoring();
  const auth = useAuth();
  const [timeRange, setTimeRange] = useState("mensal");

  const validClientTypes = ["observatory", "researcher", "politician", "institution", "journalist"];
  const isValidClientType = clientType && validClientTypes.includes(clientType);

  useEffect(() => {
    if (clientType && !isValidClientType) {
      navigate("/client");
    }
  }, [clientType, isValidClientType, navigate]);

  useEffect(() => {
    monitoring.fetchMonitoringItems();
  }, []);

  const handleDatasetDownload = () => {
    toast({
      title: "Conjunto de dados pronto",
      description: "O dataset completo está sendo baixado."
    });
    
    // Simulate download preparation
    setTimeout(() => {
      const element = document.createElement("a");
      if (clientType === "researcher") {
        element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(
          convertToCSV(monitoring.allMonitoringItems)
        ));
        element.setAttribute("download", "dataset-pesquisa.csv");
      } else {
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(
          JSON.stringify(monitoring.allMonitoringItems, null, 2)
        ));
        element.setAttribute("download", "dataset-completo.json");
      }
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  const handleComparisonView = () => {
    toast({
      title: "Análise comparativa",
      description: "A visualização comparativa será disponibilizada em breve."
    });
  };

  // Helper function to convert data to CSV
  const convertToCSV = (items: any[]) => {
    const headers = Object.keys(items[0] || {}).filter(key => key !== 'id');
    const rows = items.map(item => headers.map(key => item[key]));
    return [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => navigate("/login")} 
            onLogoutClick={auth.handleLogout} 
          />

          {isValidClientType ? (
            <ClientContent 
              clientType={clientType as ClientType}
              monitoringItems={monitoring.monitoringItems}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              handleExport={monitoring.handleExport}
              isAuthenticated={auth.isAuthenticated}
              form={monitoring.form}
              handleAddMonitoring={monitoring.handleAddMonitoring}
              legislationAlerts={monitoring.legislationAlerts}
              markAlertAsRead={monitoring.markAlertAsRead}
              unreadAlertCount={monitoring.unreadAlertCount}
              handleDatasetDownload={handleDatasetDownload}
              handleComparisonView={handleComparisonView}
              responsibleFilter={monitoring.responsibleFilter}
              setResponsibleFilter={monitoring.setResponsibleFilter}
              getUniqueResponsibles={monitoring.getUniqueResponsibles}
              isLoading={monitoring.isLoading}
            />
          ) : (
            <ClientSelection />
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Client;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientDashboard from "@/components/client/ClientDashboard";
import ClientSelection from "@/components/client/ClientSelection";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useAuth } from "@/hooks/useAuth";

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
            <ClientDashboard 
              clientType={clientType as "observatory" | "researcher" | "politician" | "institution" | "journalist"}
              monitoringItems={monitoring.monitoringItems}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              handleExport={monitoring.handleExport}
              isAuthenticated={auth.isAuthenticated}
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


import React from "react";
import ClientDashboard from "@/components/client/ClientDashboard";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";

interface ClientDashboardTabProps {
  clientType: ClientType;
  monitoringItems: any[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
}

const ClientDashboardTab: React.FC<ClientDashboardTabProps> = ({
  clientType,
  monitoringItems,
  timeRange,
  setTimeRange,
  handleExport,
  isAuthenticated
}) => {
  return (
    <ClientDashboard
      clientType={clientType}
      monitoringItems={monitoringItems}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      handleExport={handleExport}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default ClientDashboardTab;

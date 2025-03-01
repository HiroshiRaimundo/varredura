
import React, { useState } from "react";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import AlertButton from "@/components/client/AlertButton";
import LegislationAlerts from "@/components/client/LegislationAlerts";
import { LegislationAlert } from "@/hooks/monitoring/types";

interface ClientAlertsProps {
  clientType: ClientType;
  legislationAlerts: LegislationAlert[];
  markAlertAsRead: (id: string) => void;
  unreadAlertCount: number;
}

const ClientAlerts: React.FC<ClientAlertsProps> = ({
  clientType,
  legislationAlerts,
  markAlertAsRead,
  unreadAlertCount
}) => {
  const [showAlerts, setShowAlerts] = useState(false);
  
  const showLegislationAlerts = ["politician", "researcher", "observatory"].includes(clientType);

  if (!showLegislationAlerts) {
    return null;
  }

  return (
    <>
      <AlertButton 
        unreadCount={unreadAlertCount} 
        onClick={() => setShowAlerts(!showAlerts)} 
      />
      
      <LegislationAlerts 
        alerts={legislationAlerts} 
        onMarkAsRead={markAlertAsRead} 
        showAlerts={showAlerts}
      />
    </>
  );
};

export default ClientAlerts;

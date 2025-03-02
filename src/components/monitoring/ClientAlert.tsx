
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ClientAlertProps {
  alertText: string | null;
}

const ClientAlert: React.FC<ClientAlertProps> = ({ alertText }) => {
  if (!alertText) return null;
  
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertDescription>{alertText}</AlertDescription>
    </Alert>
  );
};

export default ClientAlert;

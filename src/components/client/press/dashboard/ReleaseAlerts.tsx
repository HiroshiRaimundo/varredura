
import React from 'react';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ReleaseAlertsProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  hasApprovedReleases: boolean;
  hasRejectedReleases: boolean;
}

const ReleaseAlerts: React.FC<ReleaseAlertsProps> = ({ 
  showAlert, 
  setShowAlert, 
  hasApprovedReleases, 
  hasRejectedReleases 
}) => {
  if (!showAlert) return null;
  
  return (
    <>
      {hasApprovedReleases && (
        <Alert className="mb-4 bg-emerald-50 border-emerald-200">
          <AlertTriangle className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-emerald-700">Release aprovado!</AlertTitle>
          <AlertDescription className="text-emerald-600">
            Um ou mais releases foram aprovados e serão enviados para a imprensa. 
            Acompanhe o status na tabela abaixo.
          </AlertDescription>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 h-6 w-6 p-0" 
            onClick={() => setShowAlert(false)}
          >
            ×
          </Button>
        </Alert>
      )}

      {hasRejectedReleases && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-700">Release rejeitado</AlertTitle>
          <AlertDescription className="text-red-600">
            Um ou mais releases foram rejeitados. Entre em contato com a equipe para 
            fazer as alterações necessárias.
          </AlertDescription>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 h-6 w-6 p-0" 
            onClick={() => setShowAlert(false)}
          >
            ×
          </Button>
        </Alert>
      )}
    </>
  );
};

export default ReleaseAlerts;

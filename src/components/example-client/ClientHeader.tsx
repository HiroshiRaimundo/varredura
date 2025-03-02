
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { LucideIcon } from "lucide-react";

interface ClientHeaderProps {
  clientType: ClientType;
  getClientIcon: (type: ClientType) => React.ReactNode;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ clientType, getClientIcon }) => {
  const navigate = useNavigate();
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorClasses.light}`}>
          {getClientIcon(clientType)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Área do Cliente: {clientTypeDetails[clientType].title}</h1>
          <p className="text-muted-foreground">Modelo de exemplo para demonstração</p>
        </div>
      </div>
      <Button 
        onClick={() => navigate('/')} 
        variant="outline"
      >
        Voltar ao site
      </Button>
    </div>
  );
};

export default ClientHeader;

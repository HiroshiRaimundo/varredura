
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ClientHeaderProps {
  clientType: ClientType;
  getClientIcon: (type: ClientType) => React.ReactNode;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ clientType, getClientIcon }) => {
  const navigate = useNavigate();
  const colorClasses = getColorClasses(clientType);
  // Nome do cliente em vez de tipo de cliente
  const clientName = "Nome do Cliente"; // Isso seria dinâmico em uma implementação real

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorClasses.light}`}>
          {getClientIcon(clientType)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{clientName}</h1>
          <p className="text-muted-foreground">
            {clientTypeDetails[clientType].title} - Modelo de exemplo para demonstração
          </p>
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

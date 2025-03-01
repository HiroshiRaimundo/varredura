
import React from "react";
import { Button } from "@/components/ui/button";
import { ClientType } from "@/components/client/ClientTypes";

interface ClientHeaderProps {
  clientType: ClientType;
  unreadAlertCount: number;
  onAlertClick: () => void;
  onLogout: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  clientType,
  unreadAlertCount,
  onAlertClick,
  onLogout
}) => {
  const getClientTitle = (type: ClientType) => {
    switch (type) {
      case "observatory":
        return "Observatório";
      case "researcher":
        return "Pesquisador";
      case "politician":
        return "Político";
      case "institution":
        return "Instituição";
      case "journalist":
        return "Jornalista";
      case "press":
        return "Assessoria de Imprensa";
      default:
        return "Cliente";
    }
  };

  const getClientDescription = (type: ClientType) => {
    switch (type) {
      case "observatory":
        return "Acesso a dados e informações para observatórios e institutos de monitoramento.";
      case "researcher":
        return "Ferramentas de pesquisa e análise de dados para pesquisadores e acadêmicos.";
      case "politician":
        return "Monitoramento de legislação e informações relevantes para mandatos políticos.";
      case "institution":
        return "Gestão de informações e documentos para instituições governamentais e não-governamentais.";
      case "journalist":
        return "Acesso a dados e informações para jornalistas e veículos de comunicação.";
      case "press":
        return "Gerenciamento de releases e monitoramento de mídia para assessorias de imprensa.";
      default:
        return "Acesso a ferramentas e informações personalizadas.";
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{getClientTitle(clientType)}</h1>
        <p className="text-muted-foreground">
          {getClientDescription(clientType)}
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onAlertClick}
          className="relative"
        >
          Alertas
          {unreadAlertCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadAlertCount}
            </span>
          )}
        </Button>
        <Button 
          variant="destructive" 
          onClick={onLogout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default ClientHeader;

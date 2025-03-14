
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Client } from "@/services/clientService";

interface ClientStatusBadgesProps {
  clients: Client[];
}

const ClientStatusBadges: React.FC<ClientStatusBadgesProps> = ({ clients }) => {
  const activeClients = clients.filter(c => c.status === "active").length;
  const inactiveClients = clients.filter(c => c.status === "inactive").length;

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="text-green-500">
        <CheckCircle className="h-4 w-4 mr-1" />
        {activeClients} Ativos
      </Badge>
      <Badge variant="outline" className="text-red-500">
        <XCircle className="h-4 w-4 mr-1" />
        {inactiveClients} Inativos
      </Badge>
    </div>
  );
};

export default ClientStatusBadges;

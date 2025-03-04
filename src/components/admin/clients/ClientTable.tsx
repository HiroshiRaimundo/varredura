
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Key, CheckCircle, XCircle } from "lucide-react";
import { ServiceType } from "@/hooks/useClientAuth";
import { Client } from "@/services/clientService";

interface ClientTableProps {
  clients: Client[];
  onStatusToggle: (clientId: string) => void;
  onResetPassword: (clientId: string) => void;
  onEditClient: (clientId: string) => void;
  onDeleteClient: (clientId: string) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onStatusToggle,
  onResetPassword,
  onEditClient,
  onDeleteClient
}) => {
  const getServiceTypeLabel = (type: ServiceType) => {
    const labels = {
      [ServiceType.OBSERVATORY]: "Observatório",
      [ServiceType.PRESS]: "Assessoria de Imprensa",
      [ServiceType.RESEARCHER]: "Pesquisador",
      [ServiceType.POLITICIAN]: "Político",
      [ServiceType.INSTITUTION]: "Instituição",
      [ServiceType.JOURNALIST]: "Jornalista"
    };
    return labels[type];
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Expira em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Nenhum cliente cadastrado ainda.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{getServiceTypeLabel(client.serviceType)}</TableCell>
                <TableCell>
                  <Badge
                    variant={client.status === "active" ? "default" : "destructive"}
                    className="cursor-pointer"
                    onClick={() => onStatusToggle(client.id)}
                  >
                    {client.status === "active" ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ativo
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Inativo
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {client.expiresAt ? new Date(client.expiresAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onResetPassword(client.id)}
                      title="Redefinir senha"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditClient(client.id)}
                      title="Editar cliente"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteClient(client.id)}
                      title="Remover cliente"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;


import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Key, CheckCircle, XCircle, Search, ChevronDown, ChevronUp } from "lucide-react";
import { ServiceType } from "@/hooks/useClientAuth";
import { Client } from "@/services/clientService";
import { Input } from "@/components/ui/input";

interface ClientTableProps {
  clients: Client[];
  onStatusToggle: (clientId: string) => void;
  onResetPassword: (clientId: string) => void;
  onEditClient: (clientId: string) => void;
  onDeleteClient: (clientId: string) => void;
}

type SortField = 'name' | 'email' | 'serviceType' | 'status' | 'createdAt' | 'expiresAt';
type SortDirection = 'asc' | 'desc';

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onStatusToggle,
  onResetPassword,
  onEditClient,
  onDeleteClient
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? 
      <ChevronUp className="inline h-4 w-4 ml-1" /> : 
      <ChevronDown className="inline h-4 w-4 ml-1" />;
  };

  // Filter and sort clients
  const filteredClients = clients
    .filter(client => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        getServiceTypeLabel(client.serviceType).toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'serviceType':
          comparison = getServiceTypeLabel(a.serviceType).localeCompare(getServiceTypeLabel(b.serviceType));
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'expiresAt':
          const aTime = a.expiresAt ? new Date(a.expiresAt).getTime() : Infinity;
          const bTime = b.expiresAt ? new Date(b.expiresAt).getTime() : Infinity;
          comparison = aTime - bTime;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar clientes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Nome {renderSortIcon('name')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email {renderSortIcon('email')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('serviceType')}
              >
                Serviço {renderSortIcon('serviceType')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {renderSortIcon('status')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                Data de Criação {renderSortIcon('createdAt')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('expiresAt')}
              >
                Expira em {renderSortIcon('expiresAt')}
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "Nenhum cliente encontrado para esta pesquisa." : "Nenhum cliente cadastrado ainda."}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
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
    </div>
  );
};

export default ClientTable;

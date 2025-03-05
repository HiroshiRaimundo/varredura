import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClientAccount } from '@/types/adminTypes';
import { PlusCircle, Search, Edit, Trash, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from '@/lib/toast';

interface ClientListProps {
  clients: ClientAccount[];
  onAddClient: () => void;
  onEditClient: (client: ClientAccount) => void;
  onDeleteClient: (clientId: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  onAddClient,
  onEditClient,
  onDeleteClient,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'trial':
        return 'bg-blue-500';
      case 'suspended':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-500';
      case 'basic':
        return 'bg-blue-500';
      case 'premium':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleViewClient = (clientType: string) => {
    // Navegar para a página específica do tipo de cliente
    const clientPages: Record<string, string> = {
      'observatory': '/clients/observatory',
      'researcher': '/clients/researcher',
      'politician': '/clients/politician',
      'institution': '/clients/institution',
      'journalist': '/clients/journalist',
      'press': '/clients/press'
    };

    // Verificar se a página existe para o tipo de cliente
    if (clientPages[clientType]) {
      navigate(clientPages[clientType]);
    } else {
      // Se não existir, mostrar um toast de erro
      toast({
        title: "Página não encontrada",
        description: "A página deste tipo de cliente ainda não está disponível.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <Button onClick={onAddClient}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPlanColor(client.plan)}>
                    {client.plan}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(client.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewClient(client.type)}
                      title="Visualizar dashboard do cliente"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditClient(client)}
                      title="Editar cliente"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteClient(client.id)}
                      title="Excluir cliente"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientList;

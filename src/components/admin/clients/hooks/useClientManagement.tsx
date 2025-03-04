
import { useState, useCallback } from 'react';
import { Client, clientService } from '@/services/clientService';
import { ServiceType } from '@/hooks/useClientAuth';
import { toast } from '@/hooks/use-toast';
import { NewClientData } from '../AddClientDialog';

export const useClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [newClient, setNewClient] = useState<NewClientData>({
    name: "",
    email: "",
    serviceType: ServiceType.OBSERVATORY,
    status: "active"
  });

  const loadClients = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await clientService.getAll();
      setClients(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar clientes",
        description: "Não foi possível carregar a lista de clientes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const client = await clientService.create({
        ...newClient,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      setClients([...clients, client]);
      setIsAddDialogOpen(false);
      setNewClient({
        name: "",
        email: "",
        serviceType: ServiceType.OBSERVATORY,
        status: "active"
      });
      
      toast({
        title: "Cliente adicionado com sucesso",
        description: "As credenciais foram geradas e serão exibidas em seguida."
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar cliente",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao adicionar o cliente.",
        variant: "destructive"
      });
    }
  };

  const handleStatusToggle = async (clientId: string) => {
    try {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      const newStatus = client.status === "active" ? "inactive" : "active";
      const updatedClient = await clientService.updateStatus(clientId, newStatus);
      
      setClients(clients.map(c => c.id === clientId ? updatedClient : c));

      toast({
        title: "Status atualizado",
        description: `O cliente foi marcado como ${newStatus === "active" ? "ativo" : "inativo"}.`
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do cliente.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteClient = async () => {
    if (!selectedClientId) return;

    try {
      await clientService.delete(selectedClientId);
      setClients(clients.filter(client => client.id !== selectedClientId));
      setIsDeleteDialogOpen(false);
      setSelectedClientId(null);

      toast({
        title: "Cliente removido",
        description: "O cliente foi removido com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao remover cliente",
        description: "Não foi possível remover o cliente.",
        variant: "destructive"
      });
    }
  };

  const handleResetPassword = async (clientId: string) => {
    try {
      const newPassword = await clientService.resetPassword(clientId);
      setSelectedClientId(clientId);
      setGeneratedPassword(newPassword);

      toast({
        title: "Senha redefinida",
        description: "A nova senha será exibida em seguida."
      });
    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: "Não foi possível redefinir a senha do cliente.",
        variant: "destructive"
      });
    }
  };

  return {
    clients,
    isLoading,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedClientId,
    setSelectedClientId,
    selectedClient,
    setSelectedClient,
    generatedPassword,
    setGeneratedPassword,
    newClient,
    setNewClient,
    loadClients,
    handleAddClient,
    handleStatusToggle,
    handleDeleteClient,
    handleResetPassword
  };
};

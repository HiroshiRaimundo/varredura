import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientList from '@/components/admin/clients/ClientList';
import PaymentList from '@/components/admin/payments/PaymentList';
import PasswordResetList from '@/components/admin/password-reset/PasswordResetList';
import { ClientAccount, Payment, PasswordReset } from '@/types/adminTypes';
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AddClientDialog from "@/components/admin/clients/AddClientDialog";
import EditClientDialog from "@/components/admin/clients/EditClientDialog";
import DeleteClientDialog from "@/components/admin/clients/DeleteClientDialog";
import { Client, clientService } from "@/services/clientService";
import { ServiceType } from "@/hooks/useClientAuth";
import { NewClientData } from "@/components/admin/clients/AddClientDialog";

// Mock data - substituir por dados reais da API
const mockPayments: Payment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Cliente Teste',
    amount: 99.90,
    status: 'completed',
    method: 'credit_card',
    paymentMethod: 'credit_card',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
    planType: 'basic',
    description: 'Assinatura Mensal - Plano Básico'
  }
];

const mockResets: PasswordReset[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Cliente Teste',
    userEmail: 'cliente@teste.com',
    email: 'cliente@teste.com',
    requestDate: new Date().toISOString(),
    requestedAt: new Date().toISOString(),
    status: 'pending',
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    token: 'token123'
  }
];

const ClientManagement: React.FC = () => {
  // Create simplified hooks with only the properties we're actually using
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('clients');
  const [newClient, setNewClient] = useState<NewClientData>({
    name: "",
    email: "",
    serviceType: ServiceType.OBSERVATORY,
    status: "active"
  });

  // Load clients
  const loadClients = async () => {
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
  };

  // Handle status toggle
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

  // Handle add client
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
      setShowAddDialog(false);
      setNewClient({
        name: "",
        email: "",
        serviceType: ServiceType.OBSERVATORY,
        status: "active"
      });
      
      toast({
        title: "Cliente adicionado com sucesso",
        description: "As credenciais foram geradas."
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar cliente",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao adicionar o cliente.",
        variant: "destructive"
      });
    }
  };

  // Handle delete client
  const handleDeleteClient = async () => {
    if (!selectedClientId) return;

    try {
      await clientService.delete(selectedClientId);
      setClients(clients.filter(client => client.id !== selectedClientId));
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

  // Handle reset password
  const handleResetPassword = async (clientId: string) => {
    try {
      const newPassword = await clientService.resetPassword(clientId);
      
      toast({
        title: "Senha redefinida",
        description: `Nova senha gerada: ${newPassword}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: "Não foi possível redefinir a senha do cliente.",
        variant: "destructive"
      });
    }
  };

  // Add client
  const addClient = () => {
    setShowAddDialog(true);
  };

  // Edit client
  const editClient = async (clientId: string) => {
    try {
      const client = await clientService.getById(clientId);
      if (client) {
        setSelectedClient(client);
        setShowEditDialog(true);
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar cliente",
        description: "Não foi possível carregar os dados do cliente.",
        variant: "destructive"
      });
    }
  };

  // Delete client
  const deleteClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setShowDeleteDialog(true);
  };

  // Save client edit
  const handleSaveClientEdit = async () => {
    if (!selectedClient) return;
    
    try {
      await clientService.update(selectedClient.id, selectedClient);
      setShowEditDialog(false);
      loadClients();
      toast({
        title: "Cliente atualizado",
        description: "As informações do cliente foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar cliente",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao atualizar o cliente.",
        variant: "destructive"
      });
    }
  };

  // Handle client change
  const handleClientChange = (field: string, value: any) => {
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        [field]: value
      });
    }
  };

  // Export payments
  const exportPayments = () => {
    toast({
      title: "Exportando pagamentos",
      description: "Os dados de pagamento estão sendo preparados para download",
    });
    
    // Simulação de download após 1 segundo
    setTimeout(() => {
      const mockData = JSON.stringify(mockPayments, null, 2);
      const blob = new Blob([mockData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pagamentos-exportados.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // Confirm delete client
  const onConfirmDeleteClient = async () => {
    if (selectedClientId) {
      await handleDeleteClient();
      setShowDeleteDialog(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Here we handle the createdAt and expiresAt more safely
  const clientsForList: ClientAccount[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    type: client.serviceType, 
    status: client.status === "active" ? "active" : "inactive",
    plan: "basic",
    createdAt: typeof client.createdAt === 'string' ? client.createdAt : 
               client.createdAt instanceof Date ? client.createdAt.toISOString() : 
               new Date().toISOString(),
    trialEndsAt: client.expiresAt ? 
                 (typeof client.expiresAt === 'string' ? client.expiresAt : 
                  client.expiresAt instanceof Date ? client.expiresAt.toISOString() : 
                  undefined) : 
                 undefined,
  }));

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciamento de Clientes</CardTitle>
            <CardDescription>
              Gerencie clientes, pagamentos e solicitações de recuperação de senha.
            </CardDescription>
          </div>
          <Button onClick={addClient}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="payments">Pagamentos</TabsTrigger>
              <TabsTrigger value="resets">Recuperação de Senha</TabsTrigger>
            </TabsList>

            <TabsContent value="clients" className="mt-6">
              <ClientList
                clients={clientsForList}
                onAddClient={addClient}
                onEditClient={(client) => editClient(client.id)}
                onDeleteClient={(clientId) => deleteClient(clientId)}
              />
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <PaymentList
                payments={mockPayments}
                onExportPayments={exportPayments}
              />
            </TabsContent>

            <TabsContent value="resets" className="mt-6">
              <PasswordResetList
                resets={mockResets}
                onResetPassword={handleResetPassword}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddClientDialog
        isOpen={showAddDialog}
        onOpenChange={setShowAddDialog}
        newClient={newClient}
        onNewClientChange={setNewClient}
        onAddClient={handleAddClient}
      />

      <EditClientDialog
        isOpen={showEditDialog}
        onOpenChange={setShowEditDialog}
        client={selectedClient}
        onClientChange={handleClientChange}
        onSave={handleSaveClientEdit}
      />

      <DeleteClientDialog
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={onConfirmDeleteClient}
      />
    </div>
  );
};

export default ClientManagement;


import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientList from '@/components/admin/clients/ClientList';
import PaymentList from '@/components/admin/payments/PaymentList';
import PasswordResetList from '@/components/admin/password-reset/PasswordResetList';
import { ClientAccount, Payment, PasswordReset } from '@/types/adminTypes';
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { useClientManagement } from "@/components/admin/clients/hooks/useClientManagement";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AddClientDialog from "@/components/admin/clients/AddClientDialog";
import EditClientDialog from "@/components/admin/clients/EditClientDialog";
import DeleteClientDialog from "@/components/admin/clients/DeleteClientDialog";
import { Client, clientService } from "@/services/clientService";

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
  const {
    clients,
    isLoading,
    loadClients,
    handleStatusToggle,
    newClient,
    setNewClient,
    handleAddClient,
    handleDeleteClient,
    selectedClientId,
    setSelectedClientId,
    generatedPassword,
    setGeneratedPassword,
    handleResetPassword,
  } = useClientManagement();

  const [activeTab, setActiveTab] = useState('clients');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const addClient = () => {
    setShowAddDialog(true);
  };

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

  const deleteClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setShowDeleteDialog(true);
  };

  const resetPassword = async (clientId: string) => {
    await handleResetPassword(clientId);
    // Aqui você pode adicionar lógica para mostrar a senha gerada em um modal
    toast({
      title: "Senha redefinida",
      description: `Uma nova senha foi gerada para o cliente.`,
    });
  };

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

  const handleClientChange = (field: string, value: any) => {
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        [field]: value
      });
    }
  };

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

  const onConfirmDeleteClient = async () => {
    if (selectedClientId) {
      await handleDeleteClient();
      setShowDeleteDialog(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
          {activeTab === 'clients' && (
            <Button onClick={addClient}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cliente
            </Button>
          )}
          {activeTab === 'payments' && (
            <Button onClick={exportPayments} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Pagamentos
            </Button>
          )}
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
                clients={clients.map(client => ({
                  id: client.id,
                  name: client.name,
                  email: client.email,
                  type: client.serviceType, 
                  status: client.status === "active" ? "active" : "inactive",
                  plan: "basic",
                  createdAt: client.createdAt.toISOString(),
                  trialEndsAt: client.expiresAt?.toISOString(),
                }))}
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
                onResetPassword={resetPassword}
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

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import ClientTable from "@/components/admin/clients/ClientTable";
import AddClientDialog from "@/components/admin/clients/AddClientDialog";
import DeleteClientDialog from "@/components/admin/clients/DeleteClientDialog";
import PasswordDialog from "@/components/admin/clients/PasswordDialog";
import ClientStatusBadges from "@/components/admin/clients/ClientStatusBadges";
import EditClientDialog from "@/components/admin/clients/EditClientDialog";
import { useClientManagement } from "@/components/admin/clients/hooks/useClientManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientList from '@/components/admin/clients/ClientList';
import PaymentList from '@/components/admin/payments/PaymentList';
import PasswordResetList from '@/components/admin/password-reset/PasswordResetList';
import { ClientAccount, Payment, PasswordReset } from '@/types/adminTypes';

// Mock data - substituir por dados reais da API
const mockClients: ClientAccount[] = [
  {
    id: '1',
    name: 'Cliente Teste',
    email: 'cliente@teste.com',
    type: 'press',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    clientId: '1',
    amount: 99.90,
    status: 'completed',
    paymentMethod: 'credit_card',
    createdAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
    description: 'Assinatura Mensal - Plano Básico'
  }
];

const mockResets: PasswordReset[] = [
  {
    id: '1',
    clientId: '1',
    email: 'cliente@teste.com',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    token: 'token123',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }
];

const ClientManagement: React.FC = () => {
  const {
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
  } = useClientManagement();

  const [activeTab, setActiveTab] = useState('clients');

  const handleAddClient = () => {
    // Implementar lógica de adicionar cliente
    console.log('Adicionar novo cliente');
  };

  const handleEditClient = (client: ClientAccount) => {
    // Implementar lógica de editar cliente
    console.log('Editar cliente:', client);
  };

  const handleDeleteClient = (clientId: string) => {
    // Implementar lógica de deletar cliente
    console.log('Deletar cliente:', clientId);
  };

  const handleExportPayments = () => {
    // Implementar lógica de exportar pagamentos
    console.log('Exportar pagamentos');
  };

  const handleResetPassword = (resetId: string) => {
    // Implementar lógica de reset de senha
    console.log('Reset de senha:', resetId);
  };

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleEditClientFromTable = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setSelectedClientId(clientId);
      setIsEditDialogOpen(true);
    }
  };

  const handleClientFieldChange = (field: string, value: string) => {
    if (!selectedClient) return;
    setSelectedClient(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Senha copiada",
        description: "A senha foi copiada para a área de transferência."
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a senha automaticamente.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="resets">Recuperação de Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Clientes</CardTitle>
              <CardDescription>
                Gerencie os acessos dos clientes aos diferentes serviços da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <ClientStatusBadges clients={clients} />
                
                <AddClientDialog
                  isOpen={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                  newClient={newClient}
                  onNewClientChange={setNewClient}
                  onAddClient={handleAddClient}
                />
              </div>

              <ClientTable
                clients={clients}
                onStatusToggle={handleStatusToggle}
                onResetPassword={handleResetPassword}
                onEditClient={handleEditClientFromTable}
                onDeleteClient={(clientId) => {
                  setSelectedClientId(clientId);
                  setIsDeleteDialogOpen(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentList
            payments={mockPayments}
            onExportPayments={handleExportPayments}
          />
        </TabsContent>

        <TabsContent value="resets" className="mt-6">
          <PasswordResetList
            resets={mockResets}
            onResetPassword={handleResetPassword}
          />
        </TabsContent>
      </Tabs>

      <DeleteClientDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleDeleteClient}
      />

      <EditClientDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        client={selectedClient}
        onClientChange={handleClientFieldChange}
        onSave={handleSaveClientChanges}
      />

      <PasswordDialog
        password={generatedPassword}
        isOpen={!!generatedPassword}
        onOpenChange={(open) => !open && setGeneratedPassword("")}
        onCopyPassword={copyToClipboard}
      />
    </div>
  );
};

export default ClientManagement;

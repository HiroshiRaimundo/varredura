import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientList from '@/components/admin/clients/ClientList';
import PaymentList from '@/components/admin/payments/PaymentList';
import PasswordResetList from '@/components/admin/password-reset/PasswordResetList';
import { ClientAccount, Payment, PasswordReset } from '@/types/adminTypes';
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { useClientManagement } from "@/components/admin/clients/hooks/useClientManagement";

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
  } = useClientManagement();

  const [activeTab, setActiveTab] = useState('clients');
  const [selectedClient, setSelectedClient] = useState<ClientAccount | null>(null);

  const addClient = () => {
    console.log('Adicionar novo cliente');
  };

  const editClient = (client: ClientAccount) => {
    setSelectedClient(client);
    console.log('Editar cliente:', client);
  };

  const deleteClient = (clientId: string) => {
    console.log('Deletar cliente:', clientId);
  };

  const exportPayments = () => {
    console.log('Exportar pagamentos');
  };

  const resetPassword = (resetId: string) => {
    console.log('Reset de senha:', resetId);
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
        <CardHeader>
          <CardTitle>Gerenciamento de Clientes</CardTitle>
          <CardDescription>
            Gerencie clientes, pagamentos e solicitações de recuperação de senha.
          </CardDescription>
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
                clients={clients}
                onAddClient={addClient}
                onEditClient={editClient}
                onDeleteClient={deleteClient}
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
    </div>
  );
};

export default ClientManagement;

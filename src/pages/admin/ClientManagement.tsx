
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileText, Trash2, UserPlus, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { clientService, Client } from "@/services/clientService";
import AddClientDialog from "@/components/admin/clients/AddClientDialog";
import EditClientDialog from "@/components/admin/clients/EditClientDialog";
import DeleteClientDialog from "@/components/admin/clients/DeleteClientDialog";
import PasswordDialog from "@/components/admin/clients/PasswordDialog";
import { ServiceType } from "@/hooks/useClientAuth";
import { NewClientData } from "@/components/admin/clients/AddClientDialog";
import ClientTable from "@/components/admin/clients/ClientTable";

// Definição do tipo ClientAccount para a tabela
interface ClientAccount {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
  status: "active" | "inactive";
  createdAt: string | Date;
  expiresAt?: string | Date;
}

const ClientManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("clients");
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para o cliente que está sendo editado
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Estado para o cliente que está sendo excluído
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Estado para redefinição de senha
  const [resetPasswordClient, setResetPasswordClient] = useState<Client | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  
  // Estado para adicionar novo cliente
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState<NewClientData>({
    name: "",
    email: "",
    status: "active"
  });

  // Carregar dados dos clientes
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await clientService.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Falha ao carregar a lista de clientes.");
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de clientes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Funções para gerenciar clientes
  const addClient = () => {
    setNewClient({
      name: "",
      email: "",
      status: "active"
    });
    setIsAddDialogOpen(true);
  };

  const handleAddClient = async () => {
    try {
      // Validar dados do formulário
      if (!newClient.name.trim() || !newClient.email.trim()) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      // Adicionar cliente
      await clientService.create({
        name: newClient.name,
        email: newClient.email,
        status: newClient.status,
        serviceType: ServiceType.OBSERVATORY,
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      });

      // Atualizar lista de clientes
      await fetchClients();
      setIsAddDialogOpen(false);
      toast({
        title: "Cliente adicionado",
        description: "Cliente adicionado com sucesso.",
      });
    } catch (err) {
      console.error("Error adding client:", err);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o cliente.",
        variant: "destructive",
      });
    }
  };

  const editClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setEditingClient(client);
      setIsEditDialogOpen(true);
    }
  };

  const handleEditClient = async (updatedClient: Client) => {
    try {
      await clientService.update(updatedClient.id, updatedClient);
      await fetchClients();
      setIsEditDialogOpen(false);
      toast({
        title: "Cliente atualizado",
        description: "Dados do cliente atualizados com sucesso.",
      });
    } catch (err) {
      console.error("Error updating client:", err);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cliente.",
        variant: "destructive",
      });
    }
  };

  const deleteClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setDeletingClient(client);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDeleteClient = async () => {
    if (!deletingClient) return;
    
    try {
      await clientService.delete(deletingClient.id);
      await fetchClients();
      setIsDeleteDialogOpen(false);
      toast({
        title: "Cliente excluído",
        description: "Cliente excluído com sucesso.",
      });
    } catch (err) {
      console.error("Error deleting client:", err);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cliente.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setResetPasswordClient(client);
      setIsPasswordDialogOpen(true);
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    if (!resetPasswordClient) return;
    
    try {
      await clientService.resetPassword(resetPasswordClient.id);
      setIsPasswordDialogOpen(false);
      toast({
        title: "Senha redefinida",
        description: "A senha do cliente foi redefinida com sucesso.",
      });
    } catch (err) {
      console.error("Error resetting password:", err);
      toast({
        title: "Erro",
        description: "Não foi possível redefinir a senha.",
        variant: "destructive",
      });
    }
  };

  const toggleClientStatus = async (clientId: string) => {
    try {
      const client = clients.find((c) => c.id === clientId);
      if (!client) return;

      const newStatus = client.status === "active" ? "inactive" : "active";
      await clientService.update(client.id, { ...client, status: newStatus });
      await fetchClients();
      toast({
        title: "Status alterado",
        description: `Cliente ${newStatus === "active" ? "ativado" : "desativado"} com sucesso.`,
      });
    } catch (err) {
      console.error("Error toggling client status:", err);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do cliente.",
        variant: "destructive",
      });
    }
  };

  const exportPayments = () => {
    toast({
      title: "Exportando pagamentos",
      description: "Os dados de pagamento estão sendo exportados.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <BackToAdminButton />
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-xl">Carregando dados...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <BackToAdminButton />
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-red-500 text-xl">{error}</div>
          <Button onClick={fetchClients}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  // Convert all clients to ClientAccount type for the table
  const clientsForTable: ClientAccount[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    serviceType: client.serviceType,
    status: client.status,
    createdAt: client.createdAt instanceof Date ? client.createdAt : new Date(client.createdAt),
    expiresAt: client.expiresAt ? (client.expiresAt instanceof Date ? client.expiresAt : new Date(client.expiresAt)) : undefined
  }));

  return (
    <div className="container mx-auto py-6">
      <BackToAdminButton />
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Gerenciamento de Clientes</CardTitle>
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
            <TabsList className="mb-4">
              <TabsTrigger value="clients" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" /> Clientes
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" /> Pagamentos
              </TabsTrigger>
              <TabsTrigger value="recovery-requests" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" /> Recuperação de Senha
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              {clients.length > 0 ? (
                <ClientTable
                  clients={clientsForTable}
                  onStatusToggle={toggleClientStatus}
                  onResetPassword={resetPassword}
                  onEditClient={editClient}
                  onDeleteClient={deleteClient}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum cliente encontrado. Adicione seu primeiro cliente.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="payments">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Histórico de pagamentos estará disponível em breve.
                </p>
                <Button variant="outline" className="mt-4" onClick={exportPayments}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados de Pagamento
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="recovery-requests">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Não há solicitações de recuperação de senha no momento.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddClientDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newClient={newClient}
        onNewClientChange={setNewClient}
        onAddClient={handleAddClient}
      />

      {editingClient && (
        <EditClientDialog
          client={editingClient}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleEditClient}
        />
      )}

      {deletingClient && (
        <DeleteClientDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDelete={handleDeleteClient}
        />
      )}

      {resetPasswordClient && (
        <PasswordDialog
          isOpen={isPasswordDialogOpen}
          onOpenChange={setIsPasswordDialogOpen}
          onResetPassword={handleResetPassword}
        />
      )}
    </div>
  );
};

export default ClientManagement;

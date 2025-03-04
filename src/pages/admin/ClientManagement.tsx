
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ServiceType } from "@/hooks/useClientAuth";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { clientService, Client } from "@/services/clientService";

// Componentes refatorados
import ClientTable from "@/components/admin/clients/ClientTable";
import AddClientDialog from "@/components/admin/clients/AddClientDialog";
import DeleteClientDialog from "@/components/admin/clients/DeleteClientDialog";
import PasswordDialog from "@/components/admin/clients/PasswordDialog";
import ClientStatusBadges from "@/components/admin/clients/ClientStatusBadges";

const generatePassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    serviceType: ServiceType.OBSERVATORY,
    status: "active" as const
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Carregar clientes ao montar o componente
  useEffect(() => {
    loadClients();
  }, []);

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
      const password = generatePassword();
      setGeneratedPassword(password);
      
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

  const handleDeleteConfirmation = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsDeleteDialogOpen(true);
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
  
  const handleEditClient = (clientId: string) => {
    // Funcionalidade a ser implementada
    toast({
      title: "Edição de cliente",
      description: "Esta funcionalidade será implementada em breve."
    });
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
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteConfirmation}
          />
        </CardContent>
      </Card>

      {/* Diálogo de confirmação de exclusão */}
      <DeleteClientDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleDeleteClient}
      />

      {/* Diálogo de senha gerada */}
      {generatedPassword && (
        <PasswordDialog
          password={generatedPassword}
          isOpen={!!generatedPassword}
          onOpenChange={(open) => !open && setGeneratedPassword("")}
          onCopyPassword={copyToClipboard}
        />
      )}
    </div>
  );
};

export default ClientManagement;

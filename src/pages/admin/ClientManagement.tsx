
import React, { useEffect } from "react";
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

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleEditClient = (clientId: string) => {
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
            onDeleteClient={(clientId) => {
              setSelectedClientId(clientId);
              setIsDeleteDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

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

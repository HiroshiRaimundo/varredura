import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ServiceType } from "@/hooks/useClientAuth";
import { PlusCircle, Edit, Trash2, Key, CheckCircle, XCircle, Copy, AlertTriangle, Loader2 } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import { Badge } from "@/components/ui/badge";
import { clientService, Client } from "@/services/clientService";

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
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                {clients.filter(c => c.status === "active").length} Ativos
              </Badge>
              <Badge variant="outline" className="text-red-500">
                <XCircle className="h-4 w-4 mr-1" />
                {clients.filter(c => c.status === "inactive").length} Inativos
              </Badge>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do cliente para criar seu acesso.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nome *</Label>
                    <Input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Nome completo do cliente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Serviço *</Label>
                    <Select
                      value={newClient.serviceType}
                      onValueChange={(value) => setNewClient({ ...newClient, serviceType: value as ServiceType })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ServiceType.OBSERVATORY}>Observatório</SelectItem>
                        <SelectItem value={ServiceType.PRESS}>Assessoria de Imprensa</SelectItem>
                        <SelectItem value={ServiceType.RESEARCHER}>Pesquisador</SelectItem>
                        <SelectItem value={ServiceType.POLITICIAN}>Político</SelectItem>
                        <SelectItem value={ServiceType.INSTITUTION}>Instituição</SelectItem>
                        <SelectItem value={ServiceType.JOURNALIST}>Jornalista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddClient}>
                    Adicionar Cliente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Expira em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum cliente cadastrado ainda.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{getServiceTypeLabel(client.serviceType)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={client.status === "active" ? "default" : "destructive"}
                          className="cursor-pointer"
                          onClick={() => handleStatusToggle(client.id)}
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
                            onClick={() => handleResetPassword(client.id)}
                            title="Redefinir senha"
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Editar cliente"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteConfirmation(client.id)}
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
        </CardContent>
      </Card>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              Remover Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de senha gerada */}
      {generatedPassword && (
        <Dialog open={true} onOpenChange={() => setGeneratedPassword("")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Senha Gerada</DialogTitle>
              <DialogDescription>
                Guarde esta senha em um local seguro. Ela será necessária para o primeiro acesso do cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                <code className="text-lg font-mono">{generatedPassword}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedPassword)}
                  title="Copiar senha"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Recomende ao cliente que altere esta senha no primeiro acesso.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setGeneratedPassword("")}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientManagement; 
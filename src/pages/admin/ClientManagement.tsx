import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ServiceType } from "@/hooks/useClientAuth";
import { PlusCircle, Edit, Trash2, Key, CheckCircle, XCircle } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";

interface Client {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
  status: "active" | "inactive";
  createdAt: Date;
  expiresAt?: Date;
}

const generatePassword = () => {
  const length = 10;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    serviceType: ServiceType.OBSERVATORY,
    status: "active" as const
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleAddClient = () => {
    const password = generatePassword();
    setGeneratedPassword(password);
    
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias por padrão
    };

    setClients([...clients, client]);
    toast({
      title: "Cliente adicionado com sucesso",
      description: "As credenciais foram geradas e podem ser enviadas ao cliente."
    });
  };

  const handleStatusToggle = (clientId: string) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          status: client.status === "active" ? "inactive" : "active"
        };
      }
      return client;
    }));

    toast({
      title: "Status atualizado",
      description: "O status do cliente foi atualizado com sucesso."
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso."
    });
  };

  const handleResetPassword = (clientId: string) => {
    const newPassword = generatePassword();
    toast({
      title: "Senha redefinida",
      description: `Nova senha: ${newPassword}`
    });
  };

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
          <div className="flex justify-end mb-4">
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
                    <Label>Nome</Label>
                    <Input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Serviço</Label>
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
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.serviceType}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusToggle(client.id)}
                      >
                        {client.status === "active" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
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
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {generatedPassword && (
        <Dialog open={true} onOpenChange={() => setGeneratedPassword("")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Senha Gerada</DialogTitle>
              <DialogDescription>
                Guarde esta senha em um local seguro. Ela será necessária para o primeiro acesso do cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <code className="text-lg font-mono">{generatedPassword}</code>
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
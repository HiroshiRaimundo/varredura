import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validClients } from "@/components/client-login/ClientUtils";
import { toast } from "@/hooks/use-toast";
import { Search, RotateCw, Send, Key } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PasswordRecoveryAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [recoveryRequests, setRecoveryRequests] = useState([
    { id: "1", email: "usuario1@exemplo.com", requestDate: "2023-05-15", status: "completed" },
    { id: "2", email: "usuario2@exemplo.com", requestDate: "2023-05-18", status: "pending" },
    { id: "3", email: "usuario3@exemplo.com", requestDate: "2023-05-20", status: "pending" }
  ]);

  // Filter clients based on search term
  const filteredClients = validClients.filter(client => 
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select client for password reset
  const handleSelectClient = (clientEmail: string) => {
    setEmail(clientEmail);
    setSearchTerm("");
    // Generate a random password
    const randomPassword = Math.random().toString(36).slice(-8);
    setNewPassword(randomPassword);
  };

  // Reset password for client
  const handleResetPassword = () => {
    if (!email) {
      toast({
        title: "Erro",
        description: "Selecione um cliente para redefinir a senha.",
        variant: "destructive"
      });
      return;
    }

    setIsResetting(true);

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would update the password in the database
      console.log(`Password reset for ${email} to ${newPassword}`);
      
      toast({
        title: "Senha redefinida com sucesso",
        description: `A nova senha para ${email} é: ${newPassword}`,
      });
      
      setIsResetting(false);
      
      // Add to recovery requests
      const newRequest = {
        id: Date.now().toString(),
        email,
        requestDate: new Date().toISOString().split('T')[0],
        status: "completed"
      };
      
      setRecoveryRequests([newRequest, ...recoveryRequests]);
      
      // Clear form
      setEmail("");
      setNewPassword("");
    }, 1000);
  };

  // Handle individual recovery request
  const handleRecoveryRequest = (id: string) => {
    setRecoveryRequests(
      recoveryRequests.map(req => 
        req.id === id ? { ...req, status: "completed" } : req
      )
    );
    
    toast({
      title: "Solicitação processada",
      description: "A solicitação de recuperação de senha foi concluída."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Redefinição de Senha Manual</CardTitle>
          <CardDescription>
            Redefina a senha de um cliente diretamente pelo painel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente por email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {searchTerm && (
            <div className="border rounded-md mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <TableRow key={client.email}>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.type}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectClient(client.email)}
                          >
                            Selecionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                        Nenhum cliente encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="grid gap-4 mt-2">
            <div>
              <label className="text-sm font-medium">Email do Cliente</label>
              <Input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email do cliente"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Nova Senha</label>
              <div className="flex gap-2">
                <Input 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Nova senha"
                  type="text"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const randomPassword = Math.random().toString(36).slice(-8);
                    setNewPassword(randomPassword);
                  }}
                  title="Gerar senha aleatória"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleResetPassword} 
              disabled={!email || !newPassword || isResetting}
              className="w-full"
            >
              {isResetting ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Redefinindo...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Redefinir Senha
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Recuperação</CardTitle>
          <CardDescription>
            Gerencie solicitações de recuperação de senha feitas pelos clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Data da Solicitação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recoveryRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {request.status === "completed" ? "Concluído" : "Pendente"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRecoveryRequest(request.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Processar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {recoveryRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      Nenhuma solicitação de recuperação encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordRecoveryAdmin;

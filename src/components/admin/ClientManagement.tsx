
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Eye, Edit, UserPlus } from "lucide-react";
import { validClients } from "@/components/client-login/ClientUtils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Extended client type with additional fields for admin view
interface ExtendedClient {
  email: string;
  password: string;
  type: string;
  name?: string;
  paymentStatus?: 'paid' | 'pending' | 'overdue';
  lastLogin?: string;
  registrationDate?: string;
  subscriptionType?: string;
  notes?: string;
}

// Mock client data based on validClients with additional fields
const extendedClients: ExtendedClient[] = validClients.map(client => ({
  ...client,
  name: client.email.split('@')[0],
  paymentStatus: Math.random() > 0.7 ? 'overdue' : Math.random() > 0.4 ? 'pending' : 'paid',
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0],
  registrationDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString().split('T')[0],
  subscriptionType: ['Basic', 'Premium', 'Enterprise'][Math.floor(Math.random() * 3)],
  notes: `Client notes for ${client.email}`
}));

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<ExtendedClient[]>(extendedClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<ExtendedClient | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'details'>('table');

  // Form for client details edit
  const form = useForm<ExtendedClient>({
    defaultValues: {
      email: "",
      password: "",
      type: "",
      name: "",
      paymentStatus: "pending",
      subscriptionType: "",
      notes: ""
    }
  });

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.name && client.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // View client details
  const handleViewClient = (client: ExtendedClient) => {
    setSelectedClient(client);
    form.reset(client);
  };

  // Save client details
  const handleSaveClient = (data: ExtendedClient) => {
    if (selectedClient) {
      const updatedClients = clients.map(c => 
        c.email === selectedClient.email ? { ...c, ...data } : c
      );
      setClients(updatedClients);
      setSelectedClient(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Gerenciamento de Clientes</CardTitle>
          <Button variant="default" size="sm" className="text-xs">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por email, tipo ou nome..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="paid">Pagamento em Dia</TabsTrigger>
              <TabsTrigger value="pending">Pendente</TabsTrigger>
              <TabsTrigger value="overdue">Atrasado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ClientTable 
                clients={filteredClients} 
                onViewClient={handleViewClient} 
              />
            </TabsContent>
            
            <TabsContent value="paid">
              <ClientTable 
                clients={filteredClients.filter(c => c.paymentStatus === 'paid')} 
                onViewClient={handleViewClient} 
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <ClientTable 
                clients={filteredClients.filter(c => c.paymentStatus === 'pending')} 
                onViewClient={handleViewClient} 
              />
            </TabsContent>
            
            <TabsContent value="overdue">
              <ClientTable 
                clients={filteredClients.filter(c => c.paymentStatus === 'overdue')} 
                onViewClient={handleViewClient} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveClient)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Cliente</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status de Pagamento</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="paid">Pago</option>
                        <option value="pending">Pendente</option>
                        <option value="overdue">Atrasado</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subscriptionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Assinatura</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="Basic">Básico</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise">Empresarial</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedClient(null)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Component for displaying client data in a table
const ClientTable: React.FC<{ 
  clients: ExtendedClient[]; 
  onViewClient: (client: ExtendedClient) => void;
}> = ({ clients, onViewClient }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Acesso</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.email}>
                <TableCell className="font-medium">{client.email}</TableCell>
                <TableCell>{client.password}</TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      client.paymentStatus === 'paid' ? 'default' : 
                      client.paymentStatus === 'pending' ? 'outline' : 
                      'destructive'
                    }
                  >
                    {client.paymentStatus === 'paid' ? 'Pago' : 
                     client.paymentStatus === 'pending' ? 'Pendente' : 
                     'Atrasado'}
                  </Badge>
                </TableCell>
                <TableCell>{client.lastLogin}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onViewClient(client)}
                    className="h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientManagement;

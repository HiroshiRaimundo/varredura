
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserRound, LogIn, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
}

// Dados de exemplo para o dashboard
const mockData = [
  { name: 'Jan', desmatamento: 400, legislacao: 240, demografia: 240 },
  { name: 'Fev', desmatamento: 300, legislacao: 139, demografia: 221 },
  { name: 'Mar', desmatamento: 200, legislacao: 980, demografia: 229 },
  { name: 'Abr', desmatamento: 278, legislacao: 390, demografia: 200 },
  { name: 'Mai', desmatamento: 189, legislacao: 480, demografia: 218 },
];

const pieData = [
  { name: 'Amazônia', value: 400 },
  { name: 'Cerrado', value: 300 },
  { name: 'Mata Atlântica', value: 200 },
  { name: 'Caatinga', value: 150 },
];

const Index: React.FC = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [timeRange, setTimeRange] = useState("mensal");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const form = useForm<MonitoringItem>();
  const loginForm = useForm<{ email: string; password: string }>();

  const onSubmit = (data: MonitoringItem) => {
    setMonitoringItems([...monitoringItems, data]);
    form.reset();
    toast({
      title: "Item adicionado",
      description: `Monitoramento de ${data.name} foi configurado.`
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(monitoringItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'monitoramento-dados.json');
    linkElement.click();
  };

  const handleLogin = (data: { email: string; password: string }) => {
    // Verificar credenciais (odr@2025 / Ppgdas@2025)
    if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
      setIsAuthenticated(true);
      setIsLoginDialogOpen(false);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema de monitoramento."
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Observatório de Desenvolvimento Regional
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Monitoramento e Análise de Indicadores Regionais
            </p>
          </div>
          <div>
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <UserRound size={18} />
                <span className="hidden md:inline">Administrador</span>
                <LogOut size={18} />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsLoginDialogOpen(true)} className="flex items-center gap-2">
                <LogIn size={18} />
                <span className="hidden md:inline">Entrar</span>
              </Button>
            )}
          </div>
        </header>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            {isAuthenticated && <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>}
            <TabsTrigger value="map">Mapa Interativo</TabsTrigger>
          </TabsList>

          {/* Aba do Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              {/* Filtros e Controles */}
              <Card>
                <CardHeader>
                  <CardTitle>Controles do Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <select 
                    className="rounded-md border p-2"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="diario">Diário</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </select>
                  {isAuthenticated && <Button onClick={handleExport}>Exportar Dados</Button>}
                </CardContent>
              </Card>

              {/* Gráficos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico de Linhas - Tendências */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tendências de Monitoramento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="desmatamento" stroke="#8884d8" />
                          <Line type="monotone" dataKey="legislacao" stroke="#82ca9d" />
                          <Line type="monotone" dataKey="demografia" stroke="#ffc658" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Barras - Comparativo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Comparativo por Região</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="desmatamento" fill="#8884d8" />
                          <Bar dataKey="demografia" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Pizza - Distribuição */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Bioma</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                          />
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Cards de Métricas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold text-lg">Total Monitorado</h3>
                        <p className="text-3xl font-bold">{monitoringItems.length}</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold text-lg">Alertas Ativos</h3>
                        <p className="text-3xl font-bold">7</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold text-lg">Atualizações</h3>
                        <p className="text-3xl font-bold">24</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold text-lg">Fontes Ativas</h3>
                        <p className="text-3xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba de Monitoramento - Somente visível para usuários autenticados */}
          {isAuthenticated && (
            <TabsContent value="monitoring">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Monitoramento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Monitoramento</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL da Fonte</FormLabel>
                            <FormControl>
                              <Input placeholder="https://dados.gov.br/exemplo" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Desmatamento, Legislação, Demografia" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frequência de Atualização</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Diário, Semanal, Mensal" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Adicionar Monitoramento</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Lista de Monitoramentos */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Monitoramentos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringItems.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum item sendo monitorado ainda.
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {monitoringItems.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">Categoria: {item.category}</p>
                                <p className="text-sm text-muted-foreground">Fonte: {item.url}</p>
                                <p className="text-sm text-muted-foreground">Frequência: {item.frequency}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Aba do Mapa */}
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Visualização Geográfica</CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de Login */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Acesso ao Sistema</DialogTitle>
            <DialogDescription>
              Entre com suas credenciais para acessar funcionalidades de administração.
            </DialogDescription>
          </DialogHeader>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Entrar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

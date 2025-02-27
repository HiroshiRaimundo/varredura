
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserRound, LogIn, LogOut, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
}

interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "outro";
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

// Coordenadas de cidades do Amapá para uso na simulação de geocodificação
const amapaLocations = {
  "Macapá": [-51.0669, 0.0356],
  "Santana": [-51.1729, -0.0583],
  "Laranjal do Jari": [-52.5153, -0.8044],
  "Oiapoque": [-51.8333, 3.8333],
  "Porto Grande": [-51.4086, 0.7128],
  "Mazagão": [-51.2891, -0.1156],
  "Vitória do Jari": [-52.4247, -1.1275],
  "Tartarugalzinho": [-51.1492, 1.5064],
  "Amapá": [-51.0667, 2.0500],
  "Calçoene": [-50.9500, 2.5000],
  "Pedra Branca do Amapari": [-51.9472, 0.7772],
  "Serra do Navio": [-52.0042, 0.9014],
  "Cutias": [-50.8028, 0.9719],
  "Ferreira Gomes": [-51.1797, 0.8564],
  "Itaubal": [-50.6917, 0.6025],
  "Pracuúba": [-50.7892, 1.7417]
};

const Index: React.FC = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [timeRange, setTimeRange] = useState("mensal");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const form = useForm<MonitoringItem>();
  const loginForm = useForm<{ email: string; password: string }>();
  const studyForm = useForm<ResearchStudy>();

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

  // Função simulada de geocodificação - em uma aplicação real, usaria uma API de geocodificação
  const geocodeLocation = (location: string): [number, number] | null => {
    const normalizedLocation = location.trim().toLowerCase();
    
    // Verifica se a localização está nas cidades do Amapá
    for (const [city, coords] of Object.entries(amapaLocations)) {
      if (normalizedLocation.includes(city.toLowerCase())) {
        return coords as [number, number];
      }
    }
    
    // Se não encontrar, retorna coordenadas de Macapá como fallback
    return amapaLocations["Macapá"] as [number, number];
  };

  const handleStudySubmit = (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    // Geocodificar a localização para obter as coordenadas
    const coordinates = geocodeLocation(data.location);
    
    if (coordinates) {
      // Cria um novo estudo com ID único
      const newStudy: ResearchStudy = {
        ...data,
        id: Date.now().toString(),
        coordinates
      };
      
      setStudies(prev => [...prev, newStudy]);
      studyForm.reset();
      
      toast({
        title: "Estudo adicionado",
        description: `"${data.title}" foi adicionado ao mapa.`
      });
    } else {
      toast({
        title: "Erro de localização",
        description: "Não foi possível encontrar as coordenadas para a localização informada.",
        variant: "destructive"
      });
    }
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
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            {isAuthenticated && <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>}
            {isAuthenticated && <TabsTrigger value="research">Pesquisa</TabsTrigger>}
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

          {/* Nova Aba de Pesquisa - Somente visível para usuários autenticados */}
          {isAuthenticated && (
            <TabsContent value="research">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Formulário para adicionar estudos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Registrar Estudo Acadêmico</CardTitle>
                    <CardDescription>
                      Adicione informações sobre artigos, dissertações e teses para visualização no mapa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...studyForm}>
                      <form onSubmit={studyForm.handleSubmit(handleStudySubmit)} className="space-y-4">
                        <FormField
                          control={studyForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título do Estudo</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Análise dos impactos ambientais no Amapá" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={studyForm.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Autor</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome do autor principal" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={studyForm.control}
                          name="summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Resumo</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Breve resumo do estudo (até 300 caracteres)" 
                                  className="resize-none"
                                  maxLength={300}
                                  rows={4}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Máximo de 300 caracteres
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={studyForm.control}
                          name="repositoryUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link do Repositório</FormLabel>
                              <FormControl>
                                <Input placeholder="https://repositorio.exemplo.com/estudo" {...field} />
                              </FormControl>
                              <FormDescription>
                                URL onde o estudo completo pode ser acessado
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={studyForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Estudo</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  {...field}
                                >
                                  <option value="artigo">Artigo</option>
                                  <option value="dissertacao">Dissertação</option>
                                  <option value="tese">Tese</option>
                                  <option value="outro">Outro</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={studyForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Localização do Estudo</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="Ex: Macapá, Santana, Laranjal do Jari..." {...field} />
                                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Digite o nome do município no Amapá onde o estudo foi realizado
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">Adicionar ao Mapa</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {/* Lista de estudos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Estudos Registrados</CardTitle>
                    <CardDescription>
                      {studies.length} {studies.length === 1 ? 'estudo acadêmico' : 'estudos acadêmicos'} no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {studies.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                          Nenhum estudo acadêmico registrado ainda.
                        </p>
                      ) : (
                        studies.map((study) => (
                          <Card key={study.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{study.title}</h3>
                                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                    {study.type === 'artigo' ? 'Artigo' : 
                                     study.type === 'dissertacao' ? 'Dissertação' : 
                                     study.type === 'tese' ? 'Tese' : 'Outro'}
                                  </span>
                                </div>
                                <p className="text-sm">Autor: {study.author}</p>
                                <p className="text-sm">Localização: {study.location}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">{study.summary}</p>
                                {study.repositoryUrl && (
                                  <a 
                                    href={study.repositoryUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                                  >
                                    Ver repositório
                                  </a>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Aba do Mapa */}
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Visualização Geográfica</CardTitle>
                <CardDescription>
                  Mapa do Amapá com localização dos estudos registrados
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[600px]">
                <Map points={studies} />
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

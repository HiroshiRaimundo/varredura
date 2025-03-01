
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Check, ArrowRightCircle, Users, BarChart2, Leaf, FileText, PenTool,
  Bell, BarChart, PieChart
} from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const ExampleClient: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const typeParam = params.get('type') as ClientType | null;
  const [clientType, setClientType] = useState<ClientType>(
    typeParam && Object.keys(clientTypeDetails).includes(typeParam) 
      ? typeParam 
      : "observatory"
  );

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleLoginSubmit = (data: LoginFormValues) => {
    // For demonstration, any login works
    console.log("Login attempt with:", data);
    
    toast({
      title: "Login bem-sucedido",
      description: `Bem-vindo à área do cliente de exemplo (${clientTypeDetails[clientType].title})`,
    });
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu da área do cliente de exemplo."
    });
  };

  const getClientIcon = (type: ClientType) => {
    switch(type) {
      case "observatory": return <BarChart2 className="h-5 w-5" />;
      case "researcher": return <PenTool className="h-5 w-5" />;
      case "politician": return <FileText className="h-5 w-5" />;
      case "institution": return <Users className="h-5 w-5" />;
      case "journalist": return <FileText className="h-5 w-5" />;
      case "press": return <PenTool className="h-5 w-5" />;
      default: return <BarChart2 className="h-5 w-5" />;
    }
  };

  const colorClasses = getColorClasses(clientType);

  // Generate mock data for charts
  const generateMockData = () => {
    return {
      releaseStats: {
        published: Math.floor(Math.random() * 20) + 10,
        pending: Math.floor(Math.random() * 8) + 2,
        approved: Math.floor(Math.random() * 15) + 5,
        rejected: Math.floor(Math.random() * 5)
      },
      monthlyData: [65, 59, 80, 81, 56, 55, 40, 55, 60, 70, 45, 55],
      mediaOutlets: [
        { name: "Jornal Nacional", count: Math.floor(Math.random() * 10) + 3 },
        { name: "Folha de São Paulo", count: Math.floor(Math.random() * 10) + 2 },
        { name: "G1", count: Math.floor(Math.random() * 10) + 5 },
        { name: "Estado de São Paulo", count: Math.floor(Math.random() * 10) + 1 },
        { name: "UOL", count: Math.floor(Math.random() * 10) + 4 }
      ],
      recentReleases: [
        {
          id: "1",
          title: "Lançamento da nova pesquisa sobre saúde pública",
          date: "2024-05-12",
          status: "published"
        },
        {
          id: "2",
          title: "Dados sobre desenvolvimento sustentável",
          date: "2024-05-10",
          status: "pending"
        },
        {
          id: "3",
          title: "Relatório de impacto social 2024",
          date: "2024-05-08",
          status: "approved"
        }
      ]
    };
  };

  const mockData = generateMockData();

  // Render different content based on client type
  const renderPressContent = () => {
    return (
      <div>
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                      <FileText className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                    <div className="text-2xl font-bold">{mockData.releaseStats.published}</div>
                    <p className="text-sm text-muted-foreground">Releases Publicados</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                      <Bell className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                    <div className="text-2xl font-bold">{mockData.releaseStats.pending}</div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                      <Check className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                    <div className="text-2xl font-bold">{mockData.releaseStats.approved}</div>
                    <p className="text-sm text-muted-foreground">Aprovados</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                      <BarChart className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                    <div className="text-2xl font-bold">{mockData.mediaOutlets.length}</div>
                    <p className="text-sm text-muted-foreground">Veículos Alcançados</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Releases por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="w-full h-full flex items-end justify-around p-4">
                      {mockData.monthlyData.map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className={`${colorClasses.bg} rounded-t-sm w-6`}
                            style={{ height: `${value}px` }}
                          ></div>
                          <span className="text-xs mt-1">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição por Veículos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="relative w-full h-full flex justify-center items-center">
                      <div className="absolute text-center">
                        <PieChart className={`h-10 w-10 ${colorClasses.text} mx-auto`} />
                        <div className="mt-2 text-sm font-medium">Veículos</div>
                      </div>
                      {mockData.mediaOutlets.slice(0, 5).map((outlet, idx) => (
                        <div 
                          key={idx}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-sm"
                          style={{ 
                            transform: `rotate(${idx * 72}deg) translateY(-70px) rotate(-${idx * 72}deg)`,
                            opacity: 0.8
                          }}
                        >
                          <div className={`py-1 px-2 rounded-full ${colorClasses.light} ${colorClasses.text}`}>
                            {outlet.name}: {outlet.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Releases Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentReleases.map(release => (
                    <div key={release.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">{release.title}</h4>
                        <p className="text-sm text-muted-foreground">{release.date}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                          ${release.status === 'published' ? 'bg-green-100 text-green-800' : 
                          release.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                          {release.status === 'published' ? 'Publicado' : 
                           release.status === 'pending' ? 'Pendente' : 'Aprovado'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-amber-50 border-amber-200">
              <AlertTitle className="text-amber-800">Dica de Assessoria</AlertTitle>
              <AlertDescription className="text-amber-700">
                Releases com títulos mais curtos têm 30% mais chances de serem publicados. 
                Tente manter seus títulos com menos de 60 caracteres.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeTab === "releases" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Release</CardTitle>
                <CardDescription>
                  Preencha os dados para criar um novo release para envio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Título do Release</label>
                      <Input placeholder="Digite o título do release" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cliente</label>
                      <Input defaultValue="Observatório Nacional" readOnly />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conteúdo</label>
                    <textarea className="w-full min-h-[200px] p-2 border rounded-md" placeholder="Digite o conteúdo do release"></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Veículo Alvo</label>
                      <Input placeholder="Ex: G1, Folha de SP" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data de Publicação</label>
                      <Input type="date" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className={colorClasses.bg}>
                      Enviar para Aprovação
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jornalistas e Veículos</CardTitle>
                <CardDescription>
                  Contatos de jornalistas e veículos para distribuição de releases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">Nome</th>
                        <th className="p-2 text-left">Veículo</th>
                        <th className="p-2 text-left">Contato</th>
                        <th className="p-2 text-left">Área</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Ana Silva</td>
                        <td className="p-2">Folha de SP</td>
                        <td className="p-2">ana.silva@folha.com</td>
                        <td className="p-2">Política</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Carlos Santos</td>
                        <td className="p-2">G1</td>
                        <td className="p-2">carlos.santos@g1.com</td>
                        <td className="p-2">Economia</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Maria Oliveira</td>
                        <td className="p-2">UOL</td>
                        <td className="p-2">maria.oliveira@uol.com</td>
                        <td className="p-2">Saúde</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={isLoggedIn}
        onLoginClick={() => {}}
        onLogoutClick={handleLogout}
      />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {!isLoggedIn ? (
            <div className="flex justify-center my-12">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Acesso à Área do Cliente (Exemplo)</CardTitle>
                  <CardDescription>
                    Este é um modelo de acesso para demonstração.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                    <p>Para este exemplo, você pode usar qualquer email e senha. Selecione o tipo de cliente desejado:</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={clientType === type ? "default" : "outline"}
                        className={clientType === type ? colorClasses.bg : ""}
                        onClick={() => setClientType(type)}
                      >
                        {getClientIcon(type)}
                        <span className="ml-2">{clientTypeDetails[type].title}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="exemplo@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
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
                              <Input type="password" placeholder="Sua senha" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className={`w-full ${colorClasses.bg}`}>
                        Entrar
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                
                <CardFooter className="flex flex-col">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    <a href="#" className="text-primary hover:underline">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${colorClasses.light}`}>
                    {getClientIcon(clientType)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Área do Cliente: {clientTypeDetails[clientType].title}</h1>
                    <p className="text-muted-foreground">Modelo de exemplo para demonstração</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline"
                >
                  Voltar ao site
                </Button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-border overflow-x-auto">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "dashboard"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("monitoring")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "monitoring"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Monitoramento
                </button>
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "analysis"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Análise
                </button>
                {clientType === "press" && (
                  <button
                    onClick={() => setActiveTab("releases")}
                    className={`px-4 py-2 font-medium ${
                      activeTab === "releases"
                        ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                        : "text-muted-foreground"
                    }`}
                  >
                    Releases
                  </button>
                )}
              </div>
              
              {/* Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  {clientType === "press" ? (
                    // Render press office content
                    renderPressContent()
                  ) : (
                    // Render default content for other client types
                    <Card>
                      <CardHeader>
                        <CardTitle className={colorClasses.text}>
                          {activeTab === "dashboard" && "Dashboard de Visão Geral"}
                          {activeTab === "monitoring" && "Monitoramento de Dados"}
                          {activeTab === "analysis" && "Ferramentas de Análise"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="text-center">
                          <div className={`mx-auto w-16 h-16 ${colorClasses.light} rounded-full flex items-center justify-center mb-4`}>
                            {activeTab === "dashboard" && <BarChart2 className={`h-8 w-8 ${colorClasses.text}`} />}
                            {activeTab === "monitoring" && <Leaf className={`h-8 w-8 ${colorClasses.text}`} />}
                            {activeTab === "analysis" && <ArrowRightCircle className={`h-8 w-8 ${colorClasses.text}`} />}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Conteúdo do {clientTypeDetails[clientType].title}</h3>
                          <p className="text-muted-foreground">
                            Esta é uma visualização de demonstração da área do cliente. <br />
                            Em um ambiente real, você veria os dados de {clientTypeDetails[clientType].shortDescription}.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Plano:</span>
                          <span className="font-medium">{clientTypeDetails[clientType].title}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Próxima cobrança:</span>
                          <span className="font-medium">15/06/2024</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recursos Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {clientTypeDetails[clientType].features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 ${colorClasses.text} mt-1`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExampleClient;

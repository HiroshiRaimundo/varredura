
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, LogIn, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";

interface LoginFormValues {
  email: string;
  password: string;
}

interface SuccessCase {
  clientName: string;
  metric: string;
  value: string;
}

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "sso">("email");
  
  // Rotação de casos de sucesso
  const successCases: SuccessCase[] = [
    { clientName: "Corporação XYZ", metric: "monitorou", value: "5.000 menções este mês" },
    { clientName: "Ecotech Brasil", metric: "identificou", value: "27 oportunidades de mídia" },
    { clientName: "Instituto Verde Amazônia", metric: "economizou", value: "140 horas de análise manual" },
    { clientName: "Empresa ABC", metric: "aumentou", value: "32% de visibilidade na imprensa" }
  ];
  
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  
  // Alternar caso de sucesso a cada 5 segundos
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaseIndex((prevIndex) => (prevIndex + 1) % successCases.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Simular verificação de workspace
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemplo: validação básica para demonstração
      const isValidWorkspace = data.email.includes("@");
      
      if (!isValidWorkspace) {
        toast({
          title: "Workspace inativo",
          description: "Este workspace não está ativo. Por favor, contate o suporte.",
          variant: "destructive",
        });
        setLoginAttempts(prev => prev + 1);
      } else if (data.email === "demo@exemplo.com" && data.password === "senha123") {
        toast({
          title: "Login bem-sucedido",
          description: "Redirecionando para seu workspace...",
        });
        // Redirecionar para dashboard com ID de workspace fictício
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast({
          title: "Credenciais inválidas",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
        setLoginAttempts(prev => prev + 1);
      }
      
      // Mostrar captcha após 3 tentativas
      if (loginAttempts >= 2) {
        setShowCaptcha(true);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um problema ao processar seu login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOLogin = (provider: string) => {
    setIsLoading(true);
    toast({
      title: "Redirecionando",
      description: `Iniciando login com ${provider}...`,
    });
    
    // Simular redirecionamento SSO
    setTimeout(() => {
      setIsLoading(false);
      // Na prática, aqui seria redirecionado para o provedor OAuth
    }, 1500);
  };

  const currentSuccessCase = successCases[currentCaseIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header 
        isAuthenticated={false}
        onLoginClick={() => {}}
        onLogoutClick={() => {}}
      />
      
      <div className="flex-1 container mx-auto max-w-screen-xl px-4 py-8 flex flex-col lg:flex-row items-center gap-8">
        {/* Coluna da esquerda - Banner de casos de sucesso */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Área do Cliente</h1>
            <p className="text-gray-600">
              Acesse seu workspace e acompanhe suas métricas de monitoramento em tempo real.
            </p>
          </div>
          
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <CardContent className="p-6">
              <div className="text-white space-y-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="font-medium">História de Sucesso</span>
                </div>
                
                <div className="space-y-2 min-h-[100px] flex flex-col justify-center">
                  <h3 className="text-xl font-bold opacity-90">
                    {currentSuccessCase.clientName}
                  </h3>
                  <div className="text-lg animate-fade-in">
                    <span className="opacity-90">{currentSuccessCase.metric} </span>
                    <span className="font-bold text-white">{currentSuccessCase.value}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center pt-2">
                  {successCases.map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-2 w-2 rounded-full ${
                        index === currentCaseIndex 
                          ? "bg-white" 
                          : "bg-white/40"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Coluna da direita - Formulário de login */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <Card className="shadow-xl border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl">Login do Cliente</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar seu workspace.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="email" value={activeTab} onValueChange={(value) => setActiveTab(value as "email" | "sso")}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email e Senha</TabsTrigger>
                  <TabsTrigger value="sso">Login com SSO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "Email é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email corporativo</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="seu.email@empresa.com" 
                                type="email"
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        rules={{ required: "Senha é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••"
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {showCaptcha && (
                        <div className="border p-4 rounded-md bg-gray-50">
                          <p className="text-sm text-gray-500 mb-2">Verifique que você não é um robô:</p>
                          <div className="flex items-center justify-center h-10 bg-gray-200 rounded">
                            <p className="text-sm">Captcha apareceria aqui</p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                          </>
                        ) : (
                          <>
                            <LogIn className="mr-2 h-4 w-4" /> Entrar
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="sso">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Entre usando sua conta corporativa:
                    </p>
                    <Button 
                      className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                      onClick={() => handleSSOLogin("Google")}
                      disabled={isLoading}
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
                        alt="Google" 
                        className="w-5 h-5 mr-2"
                      />
                      Continuar com Google
                    </Button>
                    
                    <Button 
                      className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                      onClick={() => handleSSOLogin("Microsoft")}
                      disabled={isLoading}
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" 
                        alt="Microsoft" 
                        className="w-5 h-5 mr-2 bg-white rounded-sm"
                      />
                      Continuar com Microsoft
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <Separator />
            
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between items-center w-full text-sm">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={(e) => { 
                    e.preventDefault();
                    toast({
                      title: "Link de recuperação",
                      description: "Enviamos instruções de recuperação para seu email.",
                    });
                  }}
                >
                  Esqueceu a senha?
                </a>
                
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Primeiro acesso",
                      description: "Entre em contato com o suporte para criar sua conta.",
                    });
                  }}
                >
                  Primeiro acesso? Crie uma conta
                </a>
              </div>
              
              <div className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => navigate("/")}
                >
                  <Mail className="h-4 w-4" />
                  Precisa de ajuda? Contate o suporte
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientLogin;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn, Loader2, Mail, Github } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { ClientLoginFormValues } from "@/components/client-login/types";
import { useState, useEffect } from "react";

// Lista de casos de sucesso para o banner dinâmico
const successCases = [
  {
    organization: "Instituto Verde Amazônia",
    result: "economizou 140 horas de análise manual"
  },
  {
    organization: "Observatório Nacional",
    result: "monitorou 5000 menções este mês"
  },
  {
    organization: "Prefeitura de Belém",
    result: "otimizou 60% do tempo de resposta à imprensa"
  },
  {
    organization: "Secretaria de Comunicação",
    result: "aumentou em 40% o alcance de seus releases"
  }
];

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'sso'>('email');
  const [successCaseIndex, setSuccessCaseIndex] = useState(0);
  
  // Get the redirect path from URL parameters or use a default
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/dashboard';

  const form = useForm<ClientLoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      clientType: ""
    }
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Troca o caso de sucesso a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessCaseIndex((prevIndex) => (prevIndex + 1) % successCases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClientLogin = async (data: ClientLoginFormValues) => {
    try {
      // Simulando login com as credenciais de cliente para esta demo
      await auth.handleLogin({
        email: data.email,
        password: data.password
      });
      
      // Verifique se o login foi bem-sucedido antes de navegar
      if (auth.isAuthenticated) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleSSOLogin = (provider: string) => {
    console.log(`Iniciando login com provedor SSO: ${provider}`);
    // Aqui seria implementada a lógica de autenticação SSO
    // Por enquanto, apenas exibimos uma mensagem de log
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout}
        />
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-800 p-8 text-white md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Início</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Área do Cliente</h3>
              <p className="text-blue-100">
                Acesse seu workspace e acompanhe suas métricas de monitoramento em tempo real.
              </p>
            </div>
            
            {/* Banner dinâmico com casos de sucesso */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg transition-all duration-500 ease-in-out">
              <h3 className="text-lg font-medium mb-2">História de Sucesso</h3>
              <h4 className="font-bold">{successCases[successCaseIndex].organization}</h4>
              <p className="text-blue-100 text-sm">{successCases[successCaseIndex].result}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 md:w-1/2">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Login do Cliente</h2>
              <p className="text-gray-600">Entre com suas credenciais para acessar seu workspace.</p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              <Button 
                variant={activeTab === 'email' ? "default" : "outline"} 
                className="w-1/2"
                onClick={() => setActiveTab('email')}
              >
                Email e Senha
              </Button>
              <Button 
                variant={activeTab === 'sso' ? "default" : "outline"} 
                className="w-1/2"
                onClick={() => setActiveTab('sso')}
              >
                Login com SSO
              </Button>
            </div>
            
            {activeTab === 'email' ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleClientLogin)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: "Email é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email corporativo</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="seu.email@empresa.com" 
                            {...field} 
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
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••"
                              {...field} 
                            />
                            <div 
                              className="absolute right-0 top-0 h-full flex items-center pr-3 cursor-pointer"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? 
                                <EyeOff size={18} className="text-muted-foreground" /> : 
                                <Eye size={18} className="text-muted-foreground" />
                              }
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rememberMe" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none text-gray-500"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    disabled={auth.isLoggingIn}
                  >
                    {auth.isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Escolha um dos provedores abaixo para fazer login com o seu email corporativo
                </p>
                
                <Button 
                  onClick={() => handleSSOLogin('google')}
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                    <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                    <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.2818291 17.2662994,17.5163575 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                    <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                  </svg>
                  Continuar com Google
                </Button>
                
                <Button 
                  onClick={() => handleSSOLogin('microsoft')} 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                  </svg>
                  Continuar com Microsoft
                </Button>
                
                <Button 
                  onClick={() => handleSSOLogin('github')} 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-6"
                >
                  <Github className="h-5 w-5" />
                  Continuar com GitHub
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
              <p>Primeiro acesso? <a href="#" className="text-blue-600 hover:underline">Crie uma conta</a></p>
              <p>Precisa de ajuda? <a href="#" className="text-blue-600 hover:underline">Contate o suporte</a></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ClientLogin;

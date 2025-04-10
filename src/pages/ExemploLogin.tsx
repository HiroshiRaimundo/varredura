
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2, UserPlus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useExemploAuth } from "@/hooks/useExemploAuth";
import { useAuth } from "@/hooks/useAuth";
import { registerUser } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

const ExemploLogin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { handleLogin, isLoading } = useExemploAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Extrair o caminho de redirecionamento
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/area-exemplo';
  
  const loginForm = useForm<{ email: string; password: string; }>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const registerForm = useForm<{ email: string; password: string; name: string; }>({
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });
  
  const onLogin = async (data: { email: string; password: string; }) => {
    console.log("Tentando login com:", data);
    await handleLogin(data.email, data.password, redirectPath);
  };
  
  const onRegister = async (data: { email: string; password: string; name: string; }) => {
    console.log("Tentando registro com:", data);
    
    // Registra o usuário no serviço
    const registered = registerUser(data.email, data.password, "exemplo");
    
    if (registered) {
      toast({
        title: "Registro realizado com sucesso",
        description: "Agora você pode fazer login com suas credenciais."
      });
      
      // Preenche automaticamente o formulário de login
      loginForm.setValue("email", data.email);
      loginForm.setValue("password", data.password);
      
      // Muda para a aba de login
      setActiveTab("login");
    } else {
      toast({
        title: "Erro no registro",
        description: "Não foi possível registrar o usuário. Tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Se já estiver autenticado, redireciona para área de exemplo
  React.useEffect(() => {
    if (auth.isAuthenticated && auth.user?.role === 'exemplo') {
      navigate(redirectPath);
    }
  }, [auth.isAuthenticated, auth.user, navigate, redirectPath]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout}
        />
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Área de Exemplo</CardTitle>
            <CardDescription className="text-center">
              Faça login ou registre-se para acessar a área de demonstração.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "login" | "register")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Registro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-amber-800 text-sm">
                    Para este exemplo, você pode usar qualquer email e senha para acessar ou registrar uma nova conta.
                  </p>
                </div>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="seu.email@exemplo.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
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
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Sua senha"
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
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rememberMe" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Acessar Exemplo
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 text-sm">
                    Registre-se para criar uma conta na área de exemplo. Todos os campos são obrigatórios.
                  </p>
                </div>
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      rules={{ required: "Nome é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Seu nome" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      rules={{ 
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="seu.email@exemplo.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      rules={{ 
                        required: "Senha é obrigatória",
                        minLength: {
                          value: 6,
                          message: "A senha deve ter pelo menos 6 caracteres"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Criar senha (mín. 6 caracteres)"
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
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Registrar-se
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              Voltar para página inicial
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExemploLogin;

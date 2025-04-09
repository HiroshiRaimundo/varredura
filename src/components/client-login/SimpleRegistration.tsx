
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface RegistrationFormValues {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const SimpleRegistration: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the redirect path from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/example-client';
  
  // Form for registration
  const registerForm = useForm<RegistrationFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: ""
    }
  });
  
  // Form for login
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Implementação simplificada - em demonstração, qualquer credencial funciona
      // Simulamos autenticação sem verificar senha
      localStorage.setItem('isAuthenticated', 'true');
      const userData = {
        name: data.email.split('@')[0],
        email: data.email,
        role: 'client'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para a página de exemplo.",
      });
      
      // Redirecionamos o usuário para a página de exemplo
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegister = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulando registro - em produção, isso seria uma chamada API
      localStorage.setItem('isAuthenticated', 'true');
      const userData = {
        name: data.name || data.email.split('@')[0],
        email: data.email,
        role: 'client',
        phone: data.phone || ""
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à plataforma.",
      });
      
      // Redirecionar para a página de exemplo após um pequeno delay para dar tempo da toast aparecer
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível completar seu cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Acesso à Plataforma</CardTitle>
          <CardDescription className="text-center">
            Faça login ou cadastre-se para acessar nossa demonstração.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
                    name="password"
                    rules={{ required: "Senha é obrigatória" }}
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
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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
              
              <div className="mt-4 text-center text-sm">
                <p>
                  Ainda não tem uma conta?{" "}
                  <button 
                    className="text-primary hover:underline"
                    onClick={() => setActiveTab('register')}
                  >
                    Cadastre-se agora
                  </button>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
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
                        <FormLabel>Email *</FormLabel>
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
                        <FormLabel>Senha *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Crie uma senha" 
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome (opcional)</FormLabel>
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(00) 00000-0000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>* Campos obrigatórios</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Cadastrar e Acessar
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-4 text-center text-sm">
                <p>
                  Já tem uma conta?{" "}
                  <button 
                    className="text-primary hover:underline"
                    onClick={() => setActiveTab('login')}
                  >
                    Faça login
                  </button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para página inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SimpleRegistration;

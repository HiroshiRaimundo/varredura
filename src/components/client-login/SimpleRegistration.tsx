
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { LoginFormValues, RegistrationFormValues } from "./authTypes";

const SimpleRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the redirect path from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/example-client';
  
  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Usar o mecanismo de autenticação do contexto
      await auth.handleLogin({
        email: data.email,
        password: data.password
      });
      
      // Se já está autenticado, redirecionar para a página desejada
      if (auth.isAuthenticated) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para a página de exemplo.",
        });
        
        setTimeout(() => {
          navigate(redirectPath);
        }, 500);
      }
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
        id: `user-${Date.now()}`,
        name: data.name || data.email.split('@')[0],
        email: data.email,
        role: 'client',
        phone: data.phone || ""
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Atualizar o estado de autenticação (não ideal, mas funciona para demonstração)
      window.location.href = redirectPath;
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à plataforma.",
      });
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
          <CardTitle className="text-2xl text-center">Acesso à Demonstração</CardTitle>
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
              <LoginForm 
                onSubmit={handleLogin} 
                isSubmitting={isSubmitting} 
                onRegisterClick={() => setActiveTab('register')} 
              />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm 
                onSubmit={handleRegister} 
                isSubmitting={isSubmitting} 
                onLoginClick={() => setActiveTab('login')} 
              />
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

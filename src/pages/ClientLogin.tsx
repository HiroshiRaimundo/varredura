
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ClientLoginFormValues {
  email: string;
  password: string;
  clientType: string;
}

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleLogin = async (data: ClientLoginFormValues) => {
    setIsLoggingIn(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock client credentials - in a real app this would be validated against an API
      const validClients = [
        { email: "observatory@example.com", password: "password123", type: "observatory" },
        { email: "researcher@example.com", password: "password123", type: "researcher" },
        { email: "politician@example.com", password: "password123", type: "politician" },
        { email: "institution@example.com", password: "password123", type: "institution" },
        { email: "journalist@example.com", password: "password123", type: "journalist" },
        { email: "press@example.com", password: "password123", type: "press" }
      ];
      
      const client = validClients.find(
        c => c.email === data.email && c.password === data.password
      );
      
      if (client) {
        // Store client info in localStorage
        const clientInfo = {
          email: data.email,
          clientType: client.type,
          name: data.email.split('@')[0],
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo ao portal do cliente.`
        });
        
        // Navigate to the client dashboard for the specific client type
        navigate(`/client/${client.type}`);
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={false}
          onLoginClick={() => {}}
          onLogoutClick={() => {}}
        />

        <div className="flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Acesso ao Portal do Cliente</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o portal do cliente e gerenciar suas interações de imprensa.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-600">
                  Para fins de demonstração, use um dos seguintes emails com a senha "password123":
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>observatory@example.com</li>
                    <li>researcher@example.com</li>
                    <li>politician@example.com</li>
                    <li>institution@example.com</li>
                    <li>journalist@example.com</li>
                    <li>press@example.com</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: "Email é obrigatório" }}
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
                      Lembrar meus dados
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
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
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center w-full text-muted-foreground">
                <a href="#" className="text-primary hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/")}
              >
                Voltar para o Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientLogin;

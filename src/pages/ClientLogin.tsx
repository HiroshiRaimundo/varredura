
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { ClientLoginFormValues } from "@/components/client-login/types";
import { useState } from "react";

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">História de Sucesso</h3>
              <h4 className="font-bold">Instituto Verde Amazônia</h4>
              <p className="text-blue-100 text-sm">economizou 140 horas de análise manual</p>
            </div>
          </div>
          
          <div className="bg-white p-8 md:w-1/2">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Login do Cliente</h2>
              <p className="text-gray-600">Entre com suas credenciais para acessar seu workspace.</p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              <Button variant="outline" className="w-1/2">Email e Senha</Button>
              <Button variant="outline" className="w-1/2">Login com SSO</Button>
            </div>
            
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

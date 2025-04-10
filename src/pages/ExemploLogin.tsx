
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useExemploAuth } from "@/hooks/useExemploAuth";
import { useAuth } from "@/hooks/useAuth";

const ExemploLogin: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { handleLogin, isLoading } = useExemploAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // Extrair o caminho de redirecionamento
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/area-exemplo';
  
  const form = useForm<{ email: string; password: string; }>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: { email: string; password: string; }) => {
    await handleLogin(data.email, data.password, redirectPath);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
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
            <CardTitle className="text-2xl text-center">Login para Área de Exemplo</CardTitle>
            <CardDescription className="text-center">
              Este é um acesso simplificado para visualizar exemplos do sistema.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800 text-sm">
                Para este exemplo, você pode usar qualquer email e senha para acessar.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Qualquer senha"
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
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.location.href = "/"}>
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

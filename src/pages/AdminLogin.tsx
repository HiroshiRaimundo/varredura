
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2, Info, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { handleLogin, isLoading } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if user is already authenticated with admin role
  React.useEffect(() => {
    if (auth.isAuthenticated && auth.user?.role === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [auth.isAuthenticated, auth.user, navigate]);
  
  // Extrair o caminho de redirecionamento
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/admin-dashboard';
  
  const form = useForm<{ email: string; password: string; }>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: { email: string; password: string; }) => {
    const success = await handleLogin(data.email, data.password, redirectPath);
    if (success) {
      navigate(redirectPath);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const fillAdminCredentials = () => {
    form.setValue("email", "admin");
    form.setValue("password", "admin");
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
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-center">Acesso Administrativo</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel administrativo.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                Use <strong>admin</strong> / <strong>admin</strong> para acesso rápido ou 
                <strong> admin@exemplo.com</strong> / <strong>admin123</strong> para login completo.
              </AlertDescription>
            </Alert>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-sm" 
              onClick={fillAdminCredentials}
            >
              Preencher com credenciais de administrador
            </Button>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Email ou usuário é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email ou usuário</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="admin" 
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
                            placeholder="admin"
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
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Autenticando...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Acessar Painel Admin
                    </>
                  )}
                </Button>
              </form>
            </Form>
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

export default AdminLogin;

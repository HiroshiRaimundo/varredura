
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await auth.handleLogin(data);
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos",
        variant: "destructive"
      });
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
              <CardTitle>Acesso Administrativo</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o painel administrativo.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...auth.form}>
                <form onSubmit={auth.form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={auth.form.control}
                    name="email"
                    rules={{ required: "Email é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="admin@koga.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={auth.form.control}
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
                              className="absolute right-0 top-0 h-full flex items-center pr-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff size={18} className="cursor-pointer" /> : <Eye size={18} className="cursor-pointer" />}
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberPassword}
                      onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar meu email
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-4" 
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
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/")} disabled={auth.isLoggingIn}>
                Voltar para o Início
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

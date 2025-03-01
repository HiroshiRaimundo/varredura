
import React, { useState, useEffect } from "react";
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check authentication status once on initial load
  useEffect(() => {
    const checkAuth = () => {
      if (auth.isAuthenticated) {
        navigate("/admin");
      }
      setIsInitializing(false);
    };
    
    // Add a small delay to ensure consistent behavior
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [auth.isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitWithRemember = (data: any) => {
    // If remember password is checked, save to localStorage
    if (rememberPassword) {
      localStorage.setItem('savedEmail', data.email);
      localStorage.setItem('rememberPassword', 'true');
    } else {
      // Clear saved data if option is unchecked
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('rememberPassword');
    }
    auth.handleLogin(data);
  };

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const hasRememberedPassword = localStorage.getItem('rememberPassword') === 'true';
    
    if (savedEmail && hasRememberedPassword) {
      auth.form.setValue('email', savedEmail);
      setRememberPassword(true);
    }
  }, [auth.form]);

  // Show loading screen during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              <CardTitle>Acesso ao Sistema</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar funcionalidades de administração.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...auth.form}>
                <form onSubmit={auth.form.handleSubmit(handleSubmitWithRemember)} className="space-y-4">
                  <FormField
                    control={auth.form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={auth.form.control}
                    name="password"
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

export default Login;

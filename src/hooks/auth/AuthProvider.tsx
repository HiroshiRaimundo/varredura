
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginCredentials, AuthContextType } from "./types";
import AuthContext from "./AuthContext";
import useSupabaseAuth from "../useSupabaseAuth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isImpersonating, setIsImpersonating] = React.useState(false);
  
  // Use o hook de autenticação do Supabase
  const { 
    isAuthenticated, 
    user, 
    isLoading,
    login: supabaseLogin,
    logout: supabaseLogout,
    register: supabaseRegister
  } = useSupabaseAuth();
  
  // Initialize form
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Handle login
  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      const result = await supabaseLogin(data.email, data.password);
      
      if (result.success) {
        setIsLoginDialogOpen(false);
        
        // Obter o caminho de redirecionamento dos parâmetros de consulta ou do estado da localização
        const redirectPath = location.state?.from || 
          (user?.role === 'admin' ? '/admin' : '/dashboard');
        
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await supabaseLogout();
    
    if (result.success) {
      setIsImpersonating(false);
      navigate('/', { replace: true });
    }
  };
  
  // Impersonate client (função mantida para compatibilidade)
  const impersonateClient = async (clientId: string) => {
    if (!user) return;
    
    setIsImpersonating(true);
    navigate(`/dashboard?impersonate=${clientId}`);
  };
  
  // Exit impersonation (função mantida para compatibilidade)
  const exitImpersonation = () => {
    setIsImpersonating(false);
    navigate("/admin");
  };

  // Create context value
  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    form,
    handleLogin,
    handleLogout,
    navigate,
    impersonateClient,
    isImpersonating,
    exitImpersonation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

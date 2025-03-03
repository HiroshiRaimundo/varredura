import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      // Verify credentials
      if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
        const userData: User = {
          email: data.email,
          role: 'admin',
          name: 'Administrador'
        };

        // Set authentication in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("sessionId", Date.now().toString());
        
        // Update state
        setIsAuthenticated(true);
        setUser(userData);
        setIsLoginDialogOpen(false);
        
        // Navigate to admin page
        window.location.href = '/admin';
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao sistema de monitoramento."
        });
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Credenciais inválidas' 
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: 'Erro ao realizar login' 
      };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("sessionId");
    
    setIsAuthenticated(false);
    setUser(null);
    
    window.location.href = '/login';
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  return {
    isAuthenticated,
    user,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    form,
    login: handleLogin,
    logout: handleLogout
  };
};

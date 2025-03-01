
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  // Initialize isAuthenticated from localStorage to prevent flickering
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
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
      // Add a slight delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify credentials (using shared login: odr@2025 / Ppgdas@2025)
      if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
        // Set authentication in localStorage
        localStorage.setItem("isAuthenticated", "true");
        
        // Create a session timestamp to track login
        const sessionId = Date.now().toString();
        localStorage.setItem("sessionId", sessionId);
        
        // Update state after localStorage is set
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao sistema de monitoramento."
        });
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    // Remove authentication from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    
    // Update state
    setIsAuthenticated(false);
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  return {
    isAuthenticated,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    form,
    handleLogin,
    handleLogout,
    navigate // Add the navigate function to the return object
  };
};


import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const form = useForm<LoginCredentials>();

  // Check for authentication on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check for authentication in local storage (for the help page)
      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (data: LoginCredentials) => {
    // Verify credentials (now using a shared login: odr@2025 / Ppgdas@2025)
    if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
      setIsAuthenticated(true);
      setIsLoginDialogOpen(false);
      
      // Save authentication in localStorage for page navigation
      localStorage.setItem("isAuthenticated", "true");
      
      // Create a session timestamp to track login
      const sessionId = Date.now().toString();
      localStorage.setItem("sessionId", sessionId);
      
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
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Remove authentication from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  return {
    isAuthenticated,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    form,
    handleLogin,
    handleLogout
  };
};


import { useState } from "react";
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

  const handleLogin = (data: LoginCredentials) => {
    // Verificar credenciais (odr@2025 / Ppgdas@2025)
    if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
      setIsAuthenticated(true);
      setIsLoginDialogOpen(false);
      // Salvar autenticação no localStorage para a página de ajuda
      localStorage.setItem("isAuthenticated", "true");
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
    // Remover autenticação do localStorage
    localStorage.removeItem("isAuthenticated");
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

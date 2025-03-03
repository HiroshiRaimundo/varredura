import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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

  // Verificar autenticação e redirecionar se necessário
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      if (!isAuth && location.pathname.startsWith("/admin")) {
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [location, navigate]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (data.email === "Rosemary@Hiroshi2025" && data.password === "koga@2025") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("sessionId", Date.now().toString());
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        
        // Redireciona para /admin após login bem-sucedido
        navigate("/admin");
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo."
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
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    setIsAuthenticated(false);
    
    // Redireciona para a página inicial após logout
    navigate("/");
    
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
    navigate
  };
};

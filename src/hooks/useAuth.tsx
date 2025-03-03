import { useState, useEffect, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: (value: boolean) => void;
  isLoggingIn: boolean;
  form: any;
  handleLogin: (data: LoginCredentials) => Promise<void>;
  handleLogout: () => void;
  navigate: (to: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const session = localStorage.getItem("sessionId");
    return auth === "true" && !!session;
  });

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      const session = localStorage.getItem("sessionId");
      const isAuth = auth === "true" && !!session;
      
      if (!isAuth && location.pathname.startsWith("/admin")) {
        navigate("/login", { replace: true });
      }
    };
    
    checkAuth();
  }, [location, navigate]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (data.email === "Rosemary@Hiroshi2025" && data.password === "koga@2025") {
        const sessionId = Date.now().toString();
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("sessionId", sessionId);
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        
        const redirectTo = location.state?.from || "/admin";
        navigate(redirectTo, { replace: true });
        
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
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast({
        title: "Erro no sistema",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  const value = {
    isAuthenticated,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    form,
    handleLogin,
    handleLogout,
    navigate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

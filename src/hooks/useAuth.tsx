
import { useState, useEffect, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { workspaceService } from "@/services/workspaceService";

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
  impersonateClient: (clientId: string) => Promise<void>;
  isImpersonating: boolean;
  exitImpersonation: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    workspaceId?: string;
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

const validateSession = () => {
  const auth = localStorage.getItem("isAuthenticated");
  const session = localStorage.getItem("sessionId");
  const lastActivity = localStorage.getItem("lastActivity");
  
  if (!auth || !session || !lastActivity) {
    return false;
  }

  // Verifica se a última atividade foi há menos de 24 horas
  const lastActivityTime = parseInt(lastActivity, 10);
  const now = Date.now();
  const hoursSinceLastActivity = (now - lastActivityTime) / (1000 * 60 * 60);
  
  if (hoursSinceLastActivity > 24) {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("lastActivity");
    return false;
  }

  return true;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, role: string, workspaceId?: string} | undefined>(undefined);
  
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Atualiza a última atividade quando há interação
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastActivity", Date.now().toString());
    }
  }, [location.pathname, isAuthenticated]);

  // Verifica autenticação periodicamente
  useEffect(() => {
    const checkAuth = () => {
      const isValid = validateSession();
      if (!isValid && isAuthenticated) {
        setIsAuthenticated(false);
        if (location.pathname.startsWith("/admin")) {
          navigate("/login", { replace: true });
        }
      }
    };
    
    const interval = setInterval(checkAuth, 1000 * 60); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [location, navigate, isAuthenticated]);

  // Recupera dados do usuário do localStorage ao montar
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      // Verifica se há um parâmetro de impersonation na URL
      const params = new URLSearchParams(location.search);
      const impersonateId = params.get('impersonate');
      if (impersonateId) {
        setIsImpersonating(true);
      }
    }
  }, [isAuthenticated, location.search]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Credenciais administrativas
      if ((data.email === "admin@koga.com" && data.password === "admin123") || 
          (data.email === "admin" && data.password === "admin")) {
        const sessionId = Date.now().toString();
        const userData = {
          name: "Administrador",
          email: data.email === "admin" ? "admin@koga.com" : data.email,
          role: "admin"
        };
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("sessionId", sessionId);
        localStorage.setItem("lastActivity", Date.now().toString());
        localStorage.setItem("user", JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        
        const redirectTo = location.state?.from || "/admin";
        navigate(redirectTo, { replace: true });
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo."
        });
        
        return;
      }
      
      // Aqui poderíamos adicionar a verificação de clientes
      // Exemplo: verificar o client service e criar workspace
      
      toast({
        title: "Erro de autenticação",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
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
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("user");
    setUser(undefined);
    setIsAuthenticated(false);
    setIsImpersonating(false);
    navigate("/", { replace: true });
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };
  
  // Função para impersonar um cliente
  const impersonateClient = async (clientId: string) => {
    if (!user) return;
    
    try {
      // Em uma aplicação real, isso criaria um token JWT com permissões limitadas
      // Simulamos o processo com nossa service
      const workspace = await workspaceService.getWorkspaceByUserId(clientId);
      
      if (!workspace) {
        throw new Error("Workspace não encontrado para este cliente");
      }
      
      // Em um cenário real, geraria um token de impersonation
      await workspaceService.generateImpersonationToken(user.email, workspace.id);
      
      // Define o usuário como impersonating
      setIsImpersonating(true);
      
      // Atualiza o objeto user com o ID do workspace
      const impersonatedUser = {
        ...user,
        workspaceId: workspace.id
      };
      
      setUser(impersonatedUser);
      
      // Redireciona para o dashboard do cliente
      navigate(`/dashboard?impersonate=${clientId}`);
      
      toast({
        title: "Visualizando como cliente",
        description: "Você está visualizando a área do cliente em modo somente leitura."
      });
    } catch (error) {
      console.error("Erro ao impersonar cliente:", error);
      toast({
        title: "Erro",
        description: "Não foi possível visualizar como cliente.",
        variant: "destructive"
      });
    }
  };
  
  // Função para sair do modo de impersonation
  const exitImpersonation = () => {
    if (!user) return;
    
    setIsImpersonating(false);
    
    // Remove o workspaceId do objeto user
    const normalUser = {
      ...user
    };
    delete normalUser.workspaceId;
    
    setUser(normalUser);
    
    // Redireciona de volta para o painel admin
    navigate("/admin");
    
    toast({
      title: "Modo administrador",
      description: "Você saiu do modo de visualização do cliente."
    });
  };

  const value = {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

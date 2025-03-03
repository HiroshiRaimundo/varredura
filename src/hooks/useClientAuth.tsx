import { useState, useEffect, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

// Tipos de serviço disponíveis
export enum ServiceType {
  OBSERVATORY = "observatory",
  PRESS = "press",
  RESEARCHER = "researcher",
  POLITICIAN = "politician",
  INSTITUTION = "institution",
  JOURNALIST = "journalist"
}

// Interface para as credenciais de login
interface ClientLoginCredentials {
  email: string;
  password: string;
  serviceType: ServiceType;
}

// Interface para os dados do cliente
interface ClientData {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
  status: "active" | "inactive";
  lastLogin?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

// Interface do contexto de autenticação do cliente
interface ClientAuthContextType {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  currentClient: ClientData | null;
  form: any;
  handleLogin: (data: ClientLoginCredentials) => Promise<void>;
  handleLogout: () => void;
  navigate: (to: string) => void;
}

const ClientAuthContext = createContext<ClientAuthContextType | null>(null);

// Mock de banco de dados de clientes (substituir por API real posteriormente)
const MOCK_CLIENTS: ClientData[] = [];

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentClient, setCurrentClient] = useState<ClientData | null>(null);
  
  const form = useForm<ClientLoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
      serviceType: ServiceType.OBSERVATORY
    }
  });

  // Verifica autenticação e redireciona se necessário
  useEffect(() => {
    const checkAuth = () => {
      const clientData = localStorage.getItem("clientData");
      if (clientData) {
        const client = JSON.parse(clientData);
        setCurrentClient(client);
        setIsAuthenticated(true);
      } else if (location.pathname.startsWith("/client")) {
        navigate("/client-login");
      }
    };
    
    checkAuth();
  }, [location, navigate]);

  const handleLogin = async (data: ClientLoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Busca o cliente no mock de banco de dados
      const client = MOCK_CLIENTS.find(
        c => c.email === data.email && c.serviceType === data.serviceType
      );
      
      if (client && client.status === "active") {
        // Atualiza o estado e salva no localStorage
        setCurrentClient(client);
        setIsAuthenticated(true);
        localStorage.setItem("clientData", JSON.stringify(client));
        
        // Redireciona para a área específica do serviço
        navigate(`/client/${client.serviceType}`);
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo à área de ${client.serviceType}`
        });
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email inválido ou serviço não contratado.",
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
    localStorage.removeItem("clientData");
    setCurrentClient(null);
    setIsAuthenticated(false);
    navigate("/");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  const value = {
    isAuthenticated,
    isLoggingIn,
    currentClient,
    form,
    handleLogin,
    handleLogout,
    navigate
  };

  return <ClientAuthContext.Provider value={value}>{children}</ClientAuthContext.Provider>;
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error("useClientAuth deve ser usado dentro de um ClientAuthProvider");
  }
  return context;
}; 
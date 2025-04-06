
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { workspaceService } from "@/services/workspaceService";
import { LoginCredentials, User, AuthContextType } from "./types";
import { 
  validateSession, 
  updateLastActivity, 
  loadUserFromStorage, 
  saveAuthData, 
  clearAuthData,
  checkForImpersonation
} from "./authUtils";
import AuthContext from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Update last activity when there's interaction
  useEffect(() => {
    if (isAuthenticated) {
      updateLastActivity();
    }
  }, [location.pathname, isAuthenticated]);

  // Periodically check authentication
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
    
    const interval = setInterval(checkAuth, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, [location, navigate, isAuthenticated]);

  // Load user data from localStorage on mount
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = loadUserFromStorage();
      if (storedUser) {
        setUser(storedUser);
      }
      
      // Check for impersonation parameter in URL
      const impersonateId = checkForImpersonation(location.search);
      if (impersonateId) {
        setIsImpersonating(true);
      }
    }
  }, [isAuthenticated, location.search]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Admin credentials
      if ((data.email === "admin@koga.com" && data.password === "admin123") || 
          (data.email === "admin" && data.password === "admin")) {
        const userData = {
          name: "Administrador",
          email: data.email === "admin" ? "admin@koga.com" : data.email,
          role: "admin"
        };
        
        saveAuthData(userData);
        
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
      
      // Here we could add client verification
      
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
    clearAuthData();
    setUser(undefined);
    setIsAuthenticated(false);
    setIsImpersonating(false);
    navigate("/", { replace: true });
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };
  
  // Function to impersonate a client
  const impersonateClient = async (clientId: string) => {
    if (!user) return;
    
    try {
      // In a real app, this would create a JWT with limited permissions
      const workspace = await workspaceService.getWorkspaceByUserId(clientId);
      
      if (!workspace) {
        throw new Error("Workspace não encontrado para este cliente");
      }
      
      // In a real scenario, it would generate an impersonation token
      await workspaceService.generateImpersonationToken(user.email, workspace.id);
      
      // Set user as impersonating
      setIsImpersonating(true);
      
      // Update user object with workspace ID
      const impersonatedUser = {
        ...user,
        workspaceId: workspace.id
      };
      
      setUser(impersonatedUser);
      
      // Redirect to client dashboard
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
  
  // Function to exit impersonation mode
  const exitImpersonation = () => {
    if (!user) return;
    
    setIsImpersonating(false);
    
    // Remove workspaceId from user object
    const normalUser = {
      ...user
    };
    delete normalUser.workspaceId;
    
    setUser(normalUser);
    
    // Redirect back to admin panel
    navigate("/admin");
    
    toast({
      title: "Modo administrador",
      description: "Você saiu do modo de visualização do cliente."
    });
  };

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

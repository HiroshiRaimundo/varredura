
import React from "react";
import { LoginCredentials, AuthContextType } from "./types";
import AuthContext from "./AuthContext";
import { useAuthState } from "./useAuthState";
import { useAuthSession } from "./useAuthSession";
import { AuthUser, saveUser, logout as logoutService, UserRole } from "@/services/authService";
import { toast } from "@/hooks/use-toast";
import { workspaceService } from "@/services/workspaceService";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get auth state from custom hook
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    setIsLoggingIn,
    isImpersonating,
    setIsImpersonating,
    user,
    setUser,
    form,
    navigate,
    location
  } = useAuthState();
  
  // Use session management hook
  useAuthSession(isAuthenticated, setIsAuthenticated, navigate, location);

  // Handle login with user object directly (used by specialized auth hooks)
  const loginWithUser = async (userData: AuthUser) => {
    saveUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoginDialogOpen(false);
    return true;
  };

  // Handle login with credentials (legacy method)
  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      // Tentativa de login como administrador primeiro
      const adminUser: AuthUser = {
        name: "Administrador",
        email: data.email === "admin" ? "admin@koga.com" : data.email,
        role: "admin" as UserRole
      };
      
      // Simulando para compatibilidade com código existente
      if ((data.email === "admin@koga.com" && data.password === "admin123") || 
          (data.email === "admin" && data.password === "admin")) {
        return await loginWithUser(adminUser);
      }
      
      // Se não for administrador, pode criar um usuário genérico
      return false;
    } catch (error) {
      console.error("Erro durante o login:", error);
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logoutService();
    setUser(undefined);
    setIsAuthenticated(false);
    setIsImpersonating(false);
    navigate("/", { replace: true });
  };
  
  // Impersonate client (mantido para compatibilidade)
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
  
  // Exit impersonation (mantido para compatibilidade)
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
    exitImpersonation,
    loginWithUser // Novo método adicionado
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

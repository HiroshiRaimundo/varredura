
import { LoginCredentials, User } from "./types";
import { toast } from "@/hooks/use-toast";
import { workspaceService } from "@/services/workspaceService";

// Handle user login and save data
export const handleUserLogin = async (
  data: LoginCredentials, 
  setUser: (user: User) => void,
  setIsAuthenticated: (value: boolean) => void,
  setIsLoginDialogOpen: (value: boolean) => void,
  navigate: (path: string, options: { replace: boolean, state?: any }) => void,
  location: { state?: { from?: string } }
) => {
  // Simulate delay
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
    
    return true;
  }
  
  // Here we could add client verification
  
  toast({
    title: "Erro de autenticação",
    description: "Email ou senha incorretos.",
    variant: "destructive"
  });
  
  return false;
};

// Handle user logout
export const handleUserLogout = (
  setUser: (user: undefined) => void,
  setIsAuthenticated: (value: boolean) => void,
  setIsImpersonating: (value: boolean) => void,
  navigate: (path: string, options: { replace: boolean }) => void
) => {
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
export const impersonateClient = async (
  clientId: string,
  user: User | undefined,
  setIsImpersonating: (value: boolean) => void,
  setUser: (user: User) => void,
  navigate: (path: string) => void
) => {
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
export const exitImpersonation = (
  user: User | undefined,
  setIsImpersonating: (value: boolean) => void,
  setUser: (user: User) => void,
  navigate: (path: string) => void
) => {
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

// Save authentication data to localStorage
export const saveAuthData = (userData: any): void => {
  const sessionId = Date.now().toString();
  
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("lastActivity", Date.now().toString());
  localStorage.setItem("user", JSON.stringify(userData));
};

// Clear authentication data from localStorage
export const clearAuthData = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("sessionId");
  localStorage.removeItem("lastActivity");
  localStorage.removeItem("user");
};

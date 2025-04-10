
import { useAuthContext } from "./AuthContext";
import { LoginCredentials } from "./types";
import { toast } from "@/hooks/use-toast";

export const useAuth = () => {
  const auth = useAuthContext();

  const handleLogin = async (data: LoginCredentials) => {
    try {
      await auth.handleLogin(data);
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast({
        title: "Erro de autenticação",
        description: "Ocorreu um erro durante o login.",
        variant: "destructive"
      });
    }
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    isLoginDialogOpen: auth.isLoginDialogOpen,
    setIsLoginDialogOpen: auth.setIsLoginDialogOpen,
    isLoggingIn: auth.isLoggingIn,
    form: auth.form,
    handleLogin,
    handleLogout: auth.handleLogout,
    navigate: auth.navigate,
    impersonateClient: auth.impersonateClient,
    isImpersonating: auth.isImpersonating,
    exitImpersonation: auth.exitImpersonation,
    loginWithUser: auth.loginWithUser
  };
};

// Make sure we export both as default and named export
export default useAuth;

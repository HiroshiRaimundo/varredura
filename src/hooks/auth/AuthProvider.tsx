
import React from "react";
import { LoginCredentials, AuthContextType } from "./types";
import AuthContext from "./AuthContext";
import { useAuthState } from "./useAuthState";
import { useAuthSession } from "./useAuthSession";
import { 
  handleUserLogin, 
  handleUserLogout, 
  impersonateClient as impersonateClientUtil,
  exitImpersonation as exitImpersonationUtil
} from "./authProviderUtils";

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

  // Handle login
  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await handleUserLogin(
        data, 
        setUser, 
        setIsAuthenticated, 
        setIsLoginDialogOpen, 
        navigate, 
        location
      );
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    handleUserLogout(setUser, setIsAuthenticated, setIsImpersonating, navigate);
  };
  
  // Impersonate client
  const impersonateClient = async (clientId: string) => {
    await impersonateClientUtil(clientId, user, setIsImpersonating, setUser, navigate);
  };
  
  // Exit impersonation
  const exitImpersonation = () => {
    exitImpersonationUtil(user, setIsImpersonating, setUser, navigate);
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
    exitImpersonation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginCredentials, User } from "./types";
import { loadUserFromStorage, validateSession, checkForImpersonation } from "./authUtils";

export const useAuthState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  
  // Initialize form
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

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

  return {
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
  };
};

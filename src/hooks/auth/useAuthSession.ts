
import { useEffect } from "react";
import { validateSession, updateLastActivity } from "./authUtils";

export const useAuthSession = (
  isAuthenticated: boolean, 
  setIsAuthenticated: (value: boolean) => void,
  navigate: (path: string, options: { replace: boolean }) => void,
  location: { pathname: string }
) => {
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
  }, [location, navigate, isAuthenticated, setIsAuthenticated]);
};


import { createContext, useContext } from "react";
import { AuthContextType } from "./types";

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthContext;

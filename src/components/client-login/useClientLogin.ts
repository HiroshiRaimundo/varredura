
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ClientLoginFormValues } from "./types";
import { validateClient, createClientInfo, saveClientInfo } from "./ClientUtils";

export const useClientLogin = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (data: ClientLoginFormValues) => {
    setIsLoggingIn(true);
    console.log("Attempting client login with:", data.email);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const client = validateClient(data);
      
      if (client) {
        console.log("Client validated successfully:", client);
        
        // Store client info in localStorage
        const clientInfo = createClientInfo(data.email, client.type);
        saveClientInfo(clientInfo);
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo ao portal do cliente.`
        });
        
        // Navigate to the client page instead of a specific client type
        navigate('/client');
        console.log("Redirecting to client page");
      } else {
        console.error("Client validation failed for:", data.email);
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    isLoggingIn,
    handleLogin
  };
};

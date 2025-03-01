
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
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const client = validateClient(data);
      
      if (client) {
        // Store client info in localStorage
        const clientInfo = createClientInfo(data.email, client.type);
        saveClientInfo(clientInfo);
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo ao portal do cliente.`
        });
        
        // Navigate directly to the client dashboard with the correct client type
        navigate(`/client/${client.type}`);
        console.log(`Redirecting to client/${client.type}`);
      } else {
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


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ClientLoginFormValues, ClientInfo } from "./types";

export const useClientLogin = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (data: ClientLoginFormValues) => {
    setIsLoggingIn(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock client credentials - in a real app this would be validated against an API
      const validClients = [
        { email: "observatory@example.com", password: "password123", type: "observatory" },
        { email: "researcher@example.com", password: "password123", type: "researcher" },
        { email: "politician@example.com", password: "password123", type: "politician" },
        { email: "institution@example.com", password: "password123", type: "institution" },
        { email: "journalist@example.com", password: "password123", type: "journalist" },
        { email: "press@example.com", password: "password123", type: "press" }
      ];
      
      const client = validClients.find(
        c => c.email === data.email && c.password === data.password
      );
      
      if (client) {
        // Store client info in localStorage
        const clientInfo: ClientInfo = {
          email: data.email,
          clientType: client.type,
          name: data.email.split('@')[0],
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo ao portal do cliente.`
        });
        
        // Navigate to the client dashboard for the specific client type
        navigate(`/client/${client.type}`);
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

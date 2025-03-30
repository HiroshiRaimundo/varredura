
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientLoginFormValues } from "./types";
import { toast } from "@/hooks/use-toast";

export const useClientLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: ClientLoginFormValues) => {
    setIsLoggingIn(true);

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Para fins de demonstração, quaisquer credenciais são aceitas
      // Em produção, isso seria validado pelo backend
      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso.",
      });

      // Redirecionar para página do cliente
      navigate("/client");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    isLoggingIn,
    handleLogin,
  };
};


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authenticateExemplo } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const useExemploAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();

  const handleLogin = async (email: string, password: string, redirectPath?: string) => {
    setIsLoading(true);
    
    try {
      const user = authenticateExemplo(email, password);
      
      if (user) {
        await loginWithUser(user);
        
        toast({
          title: "Acesso concedido",
          description: "Bem-vindo à área de exemplo."
        });
        
        navigate(redirectPath || '/area-exemplo');
        return true;
      } else {
        toast({
          title: "Erro de acesso",
          description: "Não foi possível conceder acesso.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login para exemplo:', error);
      toast({
        title: "Erro de autenticação",
        description: "Ocorreu um erro durante o login.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading
  };
};

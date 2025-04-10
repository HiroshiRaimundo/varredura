
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authenticateCliente } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const useClienteAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();

  const handleLogin = async (email: string, password: string, redirectPath?: string) => {
    setIsLoading(true);
    
    try {
      const user = authenticateCliente(email, password);
      
      if (user) {
        await loginWithUser(user);
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo à área do cliente."
        });
        
        navigate(redirectPath || '/area-cliente');
        return true;
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login como cliente:', error);
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

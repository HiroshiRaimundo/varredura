
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authenticateAdmin } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();

  const handleLogin = async (email: string, password: string, redirectPath?: string) => {
    setIsLoading(true);
    
    try {
      const user = authenticateAdmin(email, password);
      
      if (user) {
        await loginWithUser(user);
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo."
        });
        
        navigate(redirectPath || '/admin-dashboard');
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
      console.error('Erro ao fazer login como administrador:', error);
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

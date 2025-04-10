
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { authenticateExemplo } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const useExemploAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();

  const handleLogin = async (email: string, password: string, redirectPath?: string) => {
    setIsLoading(true);
    console.log('Iniciando autenticação para exemplo:', email);
    
    try {
      // Para fins de demonstração, simplesmente aceite qualquer credencial
      const user = authenticateExemplo(email, password);
      
      // Log user object para debugging
      console.log('User recebido do serviço de autenticação:', user);
      
      if (user) {
        // Tenta realizar o login com o usuário
        const success = await loginWithUser(user);
        console.log('Resultado do login:', success);
        
        if (success) {
          toast({
            title: "Acesso concedido",
            description: "Bem-vindo à área de exemplo."
          });
          
          // Navega para o caminho de redirecionamento
          navigate(redirectPath || '/area-exemplo');
          return true;
        } else {
          console.error('Login falhou após autenticação');
          toast({
            title: "Erro no login",
            description: "Falha ao autenticar sessão.",
            variant: "destructive"
          });
          return false;
        }
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


import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { LoginFormData } from '@/contexts/AuthContext';

export function useAuth() {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const success = await auth.handleLogin(data);
      if (success) {
        navigate('/admin');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    // Efetua logout
    auth.handleLogout();
    navigate('/login');
  };

  return {
    isAuthenticated: auth?.isAuthenticated || false,
    user: auth?.user,
    form: auth?.form,
    isLoggingIn: auth?.isLoggingIn || false,
    handleLogin,
    handleLogout,
    setIsLoginDialogOpen: auth?.setIsLoginDialogOpen,
    isLoginDialogOpen: auth?.isLoginDialogOpen
  };
}

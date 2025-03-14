import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const form = useForm<LoginFormData>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoggingIn(true);
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock de autenticação - substituir por chamada real à API
      if (data.email === 'admin@koga.com' && data.password === 'admin123') {
        auth.login({
          id: '1',
          name: 'Administrador',
          email: data.email,
          type: 'admin'
        });
        navigate('/admin');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    form,
    isLoggingIn,
    handleLogin,
    handleLogout
  };
}

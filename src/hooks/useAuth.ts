import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    // Verifica se existe um token salvo
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Validação das credenciais
      if (credentials.email === 'Rosemary@Hiroshi' && credentials.password === 'Cuquadrado1@!') {
        // Salva o token e dados do usuário
        localStorage.setItem('auth_token', 'admin_token');
        localStorage.setItem('user_role', 'admin');
        
        setIsAuthenticated(true);
        
        // Redireciona para a área administrativa existente
        navigate('/admin');
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Credenciais inválidas' 
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: 'Erro ao realizar login' 
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    setIsAuthenticated(false);
    navigate('/');
  };

  return {
    isAuthenticated,
    isLoading,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    form,
    login: handleLogin,
    logout: handleLogout
  };
}

export default useAuth; 
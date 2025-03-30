
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Definir tipos
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  type?: string; 
  permissions?: {
    canViewReports: boolean;
    canExportData: boolean;
    canManageAlerts: boolean;
    canAccessAnalytics: boolean;
    canInviteUsers: boolean;
  };
}

export interface LoginFormData {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  form: ReturnType<typeof useForm<LoginFormData>>;
  isLoggingIn: boolean;
  isLoginDialogOpen?: boolean;
  setIsLoginDialogOpen?: (open: boolean) => void;
  handleLogin: (data: LoginFormData) => Promise<boolean>;
  handleLogout: () => void;
}

// Criar o contexto com um valor padrão
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Dados mockados para simular autenticação
const MOCK_ADMIN_USER: User = {
  id: '1',
  email: 'admin@koga.com',
  name: 'Administrador',
  role: 'admin',
  permissions: {
    canViewReports: true,
    canExportData: true,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: true
  }
};

const MOCK_CLIENT_USER: User = {
  id: '2',
  email: 'client@exemplo.com',
  name: 'Cliente Teste',
  role: 'client',
  type: 'observatory',
  permissions: {
    canViewReports: true,
    canExportData: true,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: false
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (data: LoginFormData): Promise<boolean> => {
    setIsLoggingIn(true);
    
    try {
      // Simular chamada à API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar credenciais (simulado)
      if (data.email === 'admin@koga.com' && data.password === 'admin123') {
        setUser(MOCK_ADMIN_USER);
        localStorage.setItem('user', JSON.stringify(MOCK_ADMIN_USER));
        return true;
      } else if (data.email === 'client@exemplo.com' && data.password === 'cliente123') {
        setUser(MOCK_CLIENT_USER);
        localStorage.setItem('user', JSON.stringify(MOCK_CLIENT_USER));
        return true;
      }
      
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        form, 
        isLoggingIn, 
        isLoginDialogOpen,
        setIsLoginDialogOpen,
        handleLogin, 
        handleLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

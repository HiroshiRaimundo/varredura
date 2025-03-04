import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientProfile, ClientType, DEFAULT_PERMISSIONS } from '@/types/clientTypes';

interface AuthContextType {
  client: ClientProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um cliente salvo no localStorage
    const savedClient = localStorage.getItem('clientInfo');
    if (savedClient) {
      setClient(JSON.parse(savedClient));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Aqui você implementaria a chamada real para sua API
      const response = await mockLoginAPI(email, password);
      
      const clientProfile: ClientProfile = {
        ...response,
        permissions: DEFAULT_PERMISSIONS[response.type]
      };

      setClient(clientProfile);
      localStorage.setItem('clientInfo', JSON.stringify(clientProfile));
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setClient(null);
    localStorage.removeItem('clientInfo');
  };

  return (
    <AuthContext.Provider value={{ client, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Mock API para desenvolvimento
const mockLoginAPI = async (email: string, password: string): Promise<Omit<ClientProfile, 'permissions'>> => {
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Aqui você implementaria a lógica real de autenticação
  if (password !== 'senha123') {
    throw new Error('Credenciais inválidas');
  }

  // Determina o tipo de cliente baseado no email (apenas para demonstração)
  const type = email.split('@')[0] as ClientType;

  return {
    id: '1',
    name: 'Nome do Cliente',
    email,
    type,
    organization: 'Organização Exemplo'
  };
};

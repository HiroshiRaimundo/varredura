import { useState, useEffect } from 'react';

interface AdminUser {
  name: string;
  role: 'admin';
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Verifica se existe uma sessão administrativa
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(userData));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Credenciais fixas para administrador
      if (email === 'admin@koga.com' && password === 'Admin@2024') {
        const adminData: AdminUser = {
          name: 'Administrador',
          role: 'admin'
        };

        localStorage.setItem('admin_token', 'admin-session-token');
        localStorage.setItem('admin_user', JSON.stringify(adminData));
        
        setIsAuthenticated(true);
        setAdminUser(adminData);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Credenciais administrativas inválidas' 
      };
    } catch (error) {
      console.error('Erro no login administrativo:', error);
      return { 
        success: false, 
        error: 'Erro ao realizar login administrativo' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return {
    isAuthenticated,
    isLoading,
    adminUser,
    login,
    logout
  };
} 

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export const useSupabaseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está autenticado pelo localStorage
    const checkAuthState = async () => {
      setIsLoading(true);
      
      try {
        // Verificar sessão no Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao verificar sessão:', error);
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        if (data.session) {
          // Usuário está autenticado via Supabase
          setIsAuthenticated(true);
          
          // Buscar dados adicionais do usuário se necessário
          const userData = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            role: data.session.user.app_metadata.role || 'client',
            name: data.session.user.user_metadata.name || data.session.user.email?.split('@')[0]
          };
          
          setUser(userData);
        } else {
          // Verificar localStorage para autenticação simulada (para demonstração)
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Tentar login via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Se falhar no Supabase, tentar com as credenciais simuladas
        if (email === 'admin@koga.com' && password === 'admin123' || 
            email === 'admin' && password === 'admin') {
          
          const userData = {
            id: 'admin-123',
            name: 'Administrador',
            email: email === 'admin' ? 'admin@koga.com' : email,
            role: 'admin'
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          setIsAuthenticated(true);
          setUser(userData);
          
          toast({
            title: 'Login realizado com sucesso',
            description: 'Bem-vindo ao painel administrativo.'
          });
          
          return { success: true, user: userData };
        }
        
        // Se for uma tentativa para client demo
        if (email === 'client@exemplo.com' && password === 'cliente123') {
          const userData = {
            id: 'client-123',
            name: 'Cliente Teste',
            email,
            role: 'client'
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          setIsAuthenticated(true);
          setUser(userData);
          
          toast({
            title: 'Login realizado com sucesso',
            description: 'Bem-vindo à área do cliente.'
          });
          
          return { success: true, user: userData };
        }
        
        toast({
          title: 'Erro de autenticação',
          description: error.message,
          variant: 'destructive'
        });
        
        return { success: false, error: error.message };
      }

      // Login com Supabase bem-sucedido
      const userData = {
        id: data.user?.id || '',
        email: data.user?.email || '',
        role: data.user?.app_metadata?.role || 'client',
        name: data.user?.user_metadata?.name || data.user?.email?.split('@')[0]
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      toast({
        title: 'Login realizado com sucesso',
        description: 'Você está conectado.'
      });
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Erro durante login:', error);
      
      toast({
        title: 'Erro de autenticação',
        description: 'Ocorreu um erro durante o login.',
        variant: 'destructive'
      });
      
      return { success: false, error: 'Ocorreu um erro durante o login.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Tentar logout no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro ao fazer logout do Supabase:', error);
      }
      
      // Também limpar o localStorage
      localStorage.removeItem('user');
      
      setIsAuthenticated(false);
      setUser(null);
      
      toast({
        title: 'Logout realizado',
        description: 'Você saiu do sistema.'
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro durante logout:', error);
      
      toast({
        title: 'Erro ao sair',
        description: 'Ocorreu um erro durante o logout.',
        variant: 'destructive'
      });
      
      return { success: false, error: 'Ocorreu um erro durante o logout.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, userMetadata?: any) => {
    setIsLoading(true);
    
    try {
      // Para demonstração, simular registro bem-sucedido
      if (!email.includes('@')) {
        toast({
          title: 'Email inválido',
          description: 'Por favor insira um email válido.',
          variant: 'destructive'
        });
        return { success: false, error: 'Email inválido' };
      }
      
      // Tentar registrar no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata || {
            name: email.split('@')[0],
            role: 'client'
          }
        }
      });
      
      if (error) {
        // Para demonstração, aceitar qualquer email/senha para registro de exemplo
        const userData = {
          id: `user-${Date.now()}`,
          email,
          role: 'client',
          name: userMetadata?.name || email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        
        toast({
          title: 'Cadastro realizado com sucesso',
          description: 'Bem-vindo à plataforma.'
        });
        
        return { success: true, user: userData };
      }
      
      // Registro com Supabase bem-sucedido
      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Verifique seu email para confirmar o cadastro.'
      });
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Erro durante registro:', error);
      
      toast({
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro durante o cadastro.',
        variant: 'destructive'
      });
      
      return { success: false, error: 'Ocorreu um erro durante o cadastro.' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    register
  };
};

export default useSupabaseAuth;

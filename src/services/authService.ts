
import { User } from '@/hooks/auth/types';

// Definição dos tipos de usuário
export type UserRole = 'admin' | 'cliente' | 'exemplo';

export interface AuthUser extends User {
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

// Função para salvar usuário no localStorage
export const saveUser = (user: AuthUser): void => {
  console.log('Salvando usuário no localStorage:', user);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('lastActivity', Date.now().toString());
};

// Função para obter usuário do localStorage
export const getUser = (): AuthUser | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as AuthUser;
  } catch (error) {
    console.error('Erro ao ler usuário do localStorage:', error);
    return null;
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem('isAuthenticated');
  const lastActivity = localStorage.getItem('lastActivity');
  
  if (!auth || !lastActivity) {
    return false;
  }
  
  // Verifica se a sessão expirou (24 horas)
  const lastActivityTime = parseInt(lastActivity, 10);
  const now = Date.now();
  const hoursSinceLastActivity = (now - lastActivityTime) / (1000 * 60 * 60);
  
  return hoursSinceLastActivity <= 24;
};

// Função para atualizar a última atividade
export const updateLastActivity = (): void => {
  localStorage.setItem('lastActivity', Date.now().toString());
};

// Função para fazer logout
export const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('lastActivity');
};

// Armazenamento em memória para usuários registrados (simulação)
const registeredUsers: Record<string, {email: string, password: string, role: UserRole}> = {};

// Verificação de credenciais para cada tipo de usuário
export const authenticateAdmin = (email: string, password: string): AuthUser | null => {
  // Verificação simples para demonstração
  if ((email === 'admin@exemplo.com' && password === 'admin123') || 
      (email === 'admin' && password === 'admin')) {
    return {
      name: 'Administrador',
      email: email === 'admin' ? 'admin@exemplo.com' : email,
      role: 'admin'
    };
  }
  
  // Verificar entre os usuários registrados
  if (registeredUsers[email] && registeredUsers[email].password === password && 
      registeredUsers[email].role === 'admin') {
    return {
      name: email.split('@')[0],
      email: email,
      role: 'admin'
    };
  }
  
  return null;
};

export const authenticateCliente = (email: string, password: string): AuthUser | null => {
  // Verificação simples para demonstração
  if (email.includes('@') && password.length >= 6) {
    // Verificar entre os usuários registrados
    if (registeredUsers[email] && registeredUsers[email].password === password) {
      return {
        name: email.split('@')[0],
        email: email,
        role: 'cliente'
      };
    }
    
    // Para facilitar demonstração, qualquer email/senha é aceito
    return {
      name: email.split('@')[0],
      email: email,
      role: 'cliente'
    };
  }
  return null;
};

export const authenticateExemplo = (email: string, password: string): AuthUser | null => {
  // Verificar entre os usuários registrados
  if (registeredUsers[email] && registeredUsers[email].password === password) {
    console.log(`Usuário registrado encontrado: ${email}`);
    return {
      name: email.split('@')[0] || 'Visitante',
      email: email,
      role: 'exemplo'
    };
  }
  
  // Para a demonstração, qualquer credencial é aceita
  console.log(`Criando usuário de exemplo para: ${email}`);
  return {
    name: email.split('@')[0] || 'Visitante',
    email: email || 'visitante@exemplo.com',
    role: 'exemplo'
  };
};

// Função para registrar um novo usuário
export const registerUser = (email: string, password: string, role: UserRole = 'exemplo'): boolean => {
  if (!email || !password) return false;
  
  console.log(`Registrando novo usuário: ${email} com função: ${role}`);
  
  // Salvar no armazenamento em memória
  registeredUsers[email] = { email, password, role };
  
  return true;
};

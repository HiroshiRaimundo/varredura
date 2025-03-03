import { createHash } from 'crypto';

interface AdminUser {
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin';
  lastPasswordChange: Date;
}

// Função para gerar hash seguro da senha
function generatePasswordHash(password: string): string {
  return createHash('sha256')
    .update(password + process.env.PASSWORD_SALT || 'salt-secreto')
    .digest('hex');
}

// Lista de administradores (em produção, isso deveria estar em um banco de dados seguro)
export const adminUsers: AdminUser[] = [
  {
    email: 'Rosemary@Hiroshi',
    passwordHash: generatePasswordHash('Cuquadrado1@!'),
    name: 'Rosemary',
    role: 'admin',
    lastPasswordChange: new Date()
  }
];

// Função para validar credenciais
export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  const admin = adminUsers.find(user => user.email === email);
  if (!admin) return false;

  const hashedPassword = generatePasswordHash(password);
  return hashedPassword === admin.passwordHash;
}

// Função para obter informações do administrador
export function getAdminInfo(email: string): Omit<AdminUser, 'passwordHash'> | null {
  const admin = adminUsers.find(user => user.email === email);
  if (!admin) return null;

  const { passwordHash, ...adminInfo } = admin;
  return adminInfo;
} 
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'user';
  lastLogin?: Date;
  lastPasswordChange: Date;
}

// Em produção, isso deveria estar em um banco de dados
const users: User[] = [
  {
    id: '1',
    email: 'Rosemary@Hiroshi',
    name: 'Rosemary',
    passwordHash: generatePasswordHash('Cuquadrado1@!'),
    role: 'admin',
    lastPasswordChange: new Date()
  },
  // Adicione mais usuários aqui
];

function generatePasswordHash(password: string): string {
  return createHash('sha256')
    .update(password + process.env.PASSWORD_SALT || 'salt-secreto')
    .digest('hex');
}

async function validateCredentials(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const hashedPassword = generatePasswordHash(password);
  if (hashedPassword !== user.passwordHash) return null;

  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, password } = req.body;

    // Validar campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    // Validar credenciais
    const user = await validateCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({
        error: 'Email ou senha inválidos'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET || 'seu-segredo-aqui',
      { expiresIn: '8h' }
    );

    // Atualizar último login
    user.lastLogin = new Date();

    // Configurar cookie seguro
    res.setHeader('Set-Cookie', [
      `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 60 * 60}`
    ]);

    // Retornar informações do usuário (exceto dados sensíveis)
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      message: 'Login realizado com sucesso'
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
} 
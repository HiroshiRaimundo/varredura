import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Busca o admin no banco
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        userId: admin.id,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET || 'seu-segredo-aqui',
      { expiresIn: '8h' }
    );

    // Cria uma nova sessão
    await prisma.session.create({
      data: {
        adminId: admin.id,
        token,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 horas
      }
    });

    // Atualiza último login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });

    // Define o cookie seguro
    res.setHeader('Set-Cookie', [
      `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 3600}`
    ]);

    return res.status(200).json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
} 
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
    const { email, password, profileType } = req.body;

    // Validação básica
    if (!email || !password || !profileType) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Busca o cliente no banco
    const client = await prisma.client.findFirst({
      where: { 
        email,
        profileType
      },
      include: {
        plan: true,
        clientArea: true
      }
    });

    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica se o plano está ativo
    if (!client.plan || client.plan.status !== 'ACTIVE') {
      return res.status(403).json({ error: 'Plano inativo ou não encontrado' });
    }

    // Verifica a senha
    const isValidPassword = await bcrypt.compare(password, client.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        userId: client.id,
        email: client.email,
        profileType: client.profileType,
        planId: client.planId
      },
      process.env.JWT_SECRET || 'seu-segredo-aqui',
      { expiresIn: '8h' }
    );

    // Cria uma nova sessão
    await prisma.session.create({
      data: {
        clientId: client.id,
        token,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 horas
      }
    });

    // Atualiza último login
    await prisma.client.update({
      where: { id: client.id },
      data: { lastLogin: new Date() }
    });

    // Define o cookie seguro
    res.setHeader('Set-Cookie', [
      `client_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 3600}`
    ]);

    return res.status(200).json({
      success: true,
      user: {
        id: client.id,
        email: client.email,
        name: client.name,
        profileType: client.profileType,
        planStatus: client.plan?.status,
        hasClientArea: !!client.clientArea
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
} 
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Obtém o token do cookie
    const token = req.cookies.client_token;

    if (!token) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu-segredo-aqui') as any;

    // Busca a sessão ativa
    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        client: {
          include: {
            plan: true
          }
        }
      }
    });

    if (!session || !session.client.plan || session.client.plan.status !== 'ACTIVE') {
      return res.status(401).json({ error: 'Sessão inválida ou plano inativo' });
    }

    // Atualiza o último acesso
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivity: new Date() }
    });

    // Retorna os dados do cliente
    return res.status(200).json({
      success: true,
      user: {
        id: session.client.id,
        name: session.client.name,
        email: session.client.email,
        profileType: session.client.profileType,
        planStatus: session.client.plan.status
      }
    });

  } catch (error) {
    console.error('Erro na verificação:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
} 
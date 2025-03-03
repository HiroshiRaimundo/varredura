import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Atualiza último login
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        lastLogin: new Date(),
        loginAttempts: 0,
        isLocked: false
      }
    });

    const token = jwt.sign(
      {
        userId: admin.id,
        email: admin.email,
        role: 'admin'
      },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ 
      success: true,
      message: 'Login realizado com sucesso'
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 
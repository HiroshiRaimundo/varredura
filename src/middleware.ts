import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/login',
  '/auth/login',
  '/api/auth/login',
  '/'
];

export async function middleware(request: NextRequest) {
  // Permite acesso à página de login
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Verifica se é uma rota administrativa
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verifica o token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu-segredo-aqui') as any;

      // Verifica se a sessão existe e é válida
      const session = await prisma.session.findFirst({
        where: {
          token,
          expiresAt: {
            gt: new Date()
          }
        }
      });

      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Atualiza o último acesso da sessão
      await prisma.session.update({
        where: { id: session.id },
        data: { lastActivity: new Date() }
      });

      // Adiciona headers de segurança
      const response = NextResponse.next();
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
      );

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 
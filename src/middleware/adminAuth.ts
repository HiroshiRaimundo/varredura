import { NextRequest, NextResponse } from 'next/server';
import { SecurityManager } from '@/lib/auth/SecurityManager';

const securityManager = new SecurityManager({
  jwtSecret: process.env.JWT_SECRET || 'seu-segredo-aqui',
  sessionDuration: 3600,
  maxLoginAttempts: 5,
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
    maxAge: 90
  }
});

const publicRoutes = [
  '/auth/login',
  '/auth/cadastro',
  '/auth/recuperar-senha'
];

const protectedRoutes = [
  '/dashboard/:path*',
  '/api/dashboard/:path*',
  '/api/user/:path*'
];

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  lastLogin?: Date;
  lastPasswordChange: Date;
}

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';
  
  // Se não for rota administrativa, permite o acesso
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Obtém o token do cookie
  const token = request.cookies.get('admin_token')?.value;

  // Se for a página de login e já estiver autenticado, redireciona para o dashboard
  if (isLoginRoute && token) {
    try {
      const decoded = securityManager.verifyToken(token);
      if (decoded && decoded.roles.includes('admin')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      // Token inválido, continua para a página de login
    }
  }

  // Se for a página de login e não estiver autenticado, permite o acesso
  if (isLoginRoute) {
    return NextResponse.next();
  }

  // Para todas as outras rotas administrativas, verifica autenticação
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const decoded = securityManager.verifyToken(token);
    
    if (!decoded || !decoded.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Registra acesso no log de auditoria
    securityManager.logAudit({
      userId: decoded.userId,
      action: 'admin_access',
      resource: request.nextUrl.pathname,
      success: true,
      details: {
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
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
    console.error('Erro na autenticação administrativa:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*'
}; 
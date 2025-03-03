import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export async function middleware(request: NextRequest) {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/auth/login',
    '/api/auth/login'
  ];

  // Rotas que requerem acesso administrativo
  const adminRoutes = [
    '/admin',
    '/api/admin'
  ];

  // Verificar se é uma rota pública
  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    // Obter token do cookie
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'seu-segredo-aqui'
    ) as JWTPayload;

    // Verificar permissões baseadas no papel do usuário
    const isAdminRoute = adminRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );

    if (isAdminRoute && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Adicionar headers de segurança
    const response = NextResponse.next();
    
    // Headers de segurança básicos
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy mais restritivo
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'none'",
        "object-src 'none'"
      ].join('; ')
    );

    // Adicionar outros headers de segurança
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

    return response;

  } catch (error) {
    console.error('Erro de autenticação:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/:path*'
  ]
}; 
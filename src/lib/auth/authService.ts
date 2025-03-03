import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'koga-monitoramento-2024-seguro';
  private readonly TOKEN_EXPIRATION = '8h';
  private readonly REFRESH_TOKEN_EXPIRATION = '7d';

  private readonly ADMIN_CREDENTIALS = {
    email: process.env.ADMIN_EMAIL || 'odr@2025',
    passwordHash: this.hashPassword(process.env.ADMIN_PASSWORD || 'Ppgdas@2025')
  };

  private hashPassword(password: string): string {
    return createHash('sha256')
      .update(password + process.env.PASSWORD_SALT || 'koga-salt-2024-seguro')
      .digest('hex');
  }

  async validateAdminCredentials(email: string, password: string): Promise<boolean> {
    const hashedPassword = this.hashPassword(password);
    return email === this.ADMIN_CREDENTIALS.email && 
           hashedPassword === this.ADMIN_CREDENTIALS.passwordHash;
  }

  generateTokens(user: AuthUser) {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.TOKEN_EXPIRATION
    });

    const refreshToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRATION
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  refreshAccessToken(refreshToken: string): string | null {
    const payload = this.verifyToken(refreshToken);
    if (!payload) return null;

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.TOKEN_EXPIRATION
    });
  }

  setAuthCookies(res: any, { accessToken, refreshToken }: { accessToken: string, refreshToken: string }) {
    // Cookie seguro para o token de acesso (curta duração)
    res.setHeader('Set-Cookie', [
      `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 3600}`,
      `refresh_token=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 3600}`
    ]);
  }

  clearAuthCookies(res: any) {
    res.setHeader('Set-Cookie', [
      'access_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      'refresh_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
    ]);
  }
}

export const authService = new AuthService(); 
import { createHash, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ip: string;
  success: boolean;
  details?: Record<string, any>;
}

interface SecurityConfig {
  jwtSecret: string;
  mfaRequired: boolean;
  sessionDuration: number;
  maxLoginAttempts: number;
  passwordPolicy: {
    minLength: number;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    requireUppercase: boolean;
    maxAge: number; // dias
  };
}

export class SecurityManager {
  private auditLogs: AuditLog[] = [];
  private loginAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();
  private mfaCodes: Map<string, { code: string; expires: Date }> = new Map();
  
  private readonly adminCredentials = {
    email: 'odr@2025',
    password: 'Ppgdas@2025'
  };
  
  constructor(private config: SecurityConfig) {}

  /**
   * Gera um token JWT com informações do usuário e permissões
   */
  generateToken(userId: string, roles: string[], mfaVerified: boolean = false): string {
    return jwt.sign(
      { 
        userId, 
        roles, 
        mfaVerified,
        iat: Date.now() 
      },
      this.config.jwtSecret,
      { expiresIn: this.config.sessionDuration }
    );
  }

  /**
   * Verifica e decodifica um token JWT
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.config.jwtSecret);
    } catch (error) {
      this.logAudit({
        userId: 'system',
        action: 'token_verification',
        resource: 'auth',
        success: false,
        details: { error: error.message }
      });
      return null;
    }
  }

  /**
   * Gera e envia código MFA
   */
  async generateMFACode(userId: string, email: string): Promise<string> {
    const code = randomBytes(3).toString('hex').toUpperCase();
    this.mfaCodes.set(userId, {
      code,
      expires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutos
    });

    // TODO: Implementar envio do código por email
    return code;
  }

  /**
   * Verifica código MFA
   */
  verifyMFACode(userId: string, code: string): boolean {
    const storedCode = this.mfaCodes.get(userId);
    if (!storedCode || new Date() > storedCode.expires) {
      return false;
    }
    return storedCode.code === code;
  }

  /**
   * Registra uma tentativa de login
   */
  recordLoginAttempt(userId: string, success: boolean): boolean {
    const attempts = this.loginAttempts.get(userId) || { count: 0, lastAttempt: new Date() };
    
    if (success) {
      this.loginAttempts.delete(userId);
      return true;
    }

    attempts.count++;
    attempts.lastAttempt = new Date();
    this.loginAttempts.set(userId, attempts);

    return attempts.count < this.config.maxLoginAttempts;
  }

  /**
   * Verifica se uma senha atende aos requisitos de segurança
   */
  validatePassword(password: string): { valid: boolean; reason?: string } {
    if (password.length < this.config.passwordPolicy.minLength) {
      return { 
        valid: false, 
        reason: `A senha deve ter pelo menos ${this.config.passwordPolicy.minLength} caracteres` 
      };
    }

    if (this.config.passwordPolicy.requireNumbers && !/\d/.test(password)) {
      return { 
        valid: false, 
        reason: 'A senha deve conter pelo menos um número' 
      };
    }

    if (this.config.passwordPolicy.requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
      return { 
        valid: false, 
        reason: 'A senha deve conter pelo menos um caractere especial' 
      };
    }

    if (this.config.passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
      return { 
        valid: false, 
        reason: 'A senha deve conter pelo menos uma letra maiúscula' 
      };
    }

    return { valid: true };
  }

  /**
   * Registra uma entrada no log de auditoria
   */
  logAudit(log: Omit<AuditLog, 'timestamp' | 'ip'>): void {
    const auditEntry: AuditLog = {
      ...log,
      timestamp: new Date(),
      ip: 'IP_ADDRESS', // TODO: Implementar captura do IP real
    };

    this.auditLogs.push(auditEntry);
    
    // TODO: Implementar persistência dos logs
    console.log('Audit Log:', auditEntry);
  }

  /**
   * Verifica se um usuário tem permissão para acessar um recurso
   */
  checkPermission(userId: string, resource: string, action: string): boolean {
    // TODO: Implementar verificação real de permissões baseada em roles e policies
    this.logAudit({
      userId,
      action: 'permission_check',
      resource,
      success: true,
      details: { requestedAction: action }
    });
    return true;
  }

  /**
   * Retorna os logs de auditoria filtrados
   */
  getAuditLogs(filters: Partial<AuditLog>): AuditLog[] {
    return this.auditLogs.filter(log => {
      return Object.entries(filters).every(([key, value]) => log[key] === value);
    });
  }

  /**
   * Limpa dados sensíveis antes de enviar ao cliente
   */
  sanitizeData<T extends Record<string, any>>(data: T): Partial<T> {
    const sensitiveFields = ['password', 'token', 'secret', 'key'];
    const sanitized = { ...data };
    
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        delete sanitized[field];
      }
    });

    return sanitized;
  }

  async validateAdminCredentials(email: string, password: string) {
    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      const token = this.generateToken({
        userId: 'admin-1',
        email: email,
        roles: ['admin'],
        name: 'Administrador'
      });
      
      return {
        success: true,
        token,
        user: {
          id: 'admin-1',
          email: email,
          role: 'admin',
          name: 'Administrador'
        }
      };
    }

    return {
      success: false,
      message: 'Credenciais inválidas'
    };
  }
} 
import { NextApiRequest, NextApiResponse } from 'next';
import { SecurityManager } from '@/lib/auth/SecurityManager';

const securityManager = new SecurityManager({
  jwtSecret: process.env.JWT_SECRET || 'seu-segredo-aqui',
  mfaRequired: true,
  sessionDuration: 3600,
  maxLoginAttempts: 5,
  passwordPolicy: {
    minLength: 12,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
    maxAge: 90
  }
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, mfaCode } = req.body;

    // Verificar código MFA
    const isValidMfa = securityManager.verifyMFACode(email, mfaCode);
    
    if (!isValidMfa) {
      securityManager.logAudit({
        userId: email,
        action: 'mfa_verification',
        resource: 'admin_panel',
        success: false,
        details: {
          ip: req.socket.remoteAddress
        }
      });

      return res.status(401).json({ error: 'Código MFA inválido' });
    }

    // Gerar token JWT final com MFA verificado
    const token = securityManager.generateToken(
      email,
      ['admin'],
      true // MFA verificado
    );

    // Registrar verificação bem-sucedida
    securityManager.logAudit({
      userId: email,
      action: 'mfa_verification',
      resource: 'admin_panel',
      success: true,
      details: {
        ip: req.socket.remoteAddress
      }
    });

    // Configurar cookie seguro com o token
    res.setHeader('Set-Cookie', [
      `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
    ]);

    return res.status(200).json({
      success: true,
      message: 'Autenticação MFA bem-sucedida'
    });

  } catch (error) {
    console.error('Erro na verificação MFA:', error);
    
    return res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
} 
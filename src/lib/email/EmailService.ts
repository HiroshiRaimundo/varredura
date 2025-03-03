import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor() {
    this.config = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
      },
      from: process.env.EMAIL_FROM || 'Koga Monitoramento <noreply@kogamonitoramento.com>'
    };

    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      auth: this.config.auth
    });
  }

  /**
   * Envia código MFA por email
   */
  async sendMFACode(to: string, code: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Código de Verificação - Koga Monitoramento</h2>
        <p>Olá ${name},</p>
        <p>Seu código de verificação para acesso administrativo é:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #0066cc; letter-spacing: 5px; font-size: 32px;">${code}</h1>
        </div>
        <p>Este código é válido por 10 minutos.</p>
        <p>Se você não solicitou este código, por favor ignore este email e entre em contato com o suporte imediatamente.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Esta é uma mensagem automática, por favor não responda.
          Se precisar de ajuda, entre em contato com o suporte.
        </p>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.config.from,
      to,
      subject: 'Código de Verificação - Koga Monitoramento',
      html
    });
  }

  /**
   * Envia notificação de login suspeito
   */
  async sendSuspiciousLoginAlert(to: string, name: string, details: {
    ip: string;
    location?: string;
    device?: string;
    timestamp: Date;
  }): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff3333;">Alerta de Segurança - Koga Monitoramento</h2>
        <p>Olá ${name},</p>
        <p>Detectamos uma tentativa de login suspeita em sua conta administrativa.</p>
        <div style="background-color: #fff3f3; padding: 20px; margin: 20px 0; border-left: 4px solid #ff3333;">
          <h3 style="margin: 0 0 10px 0;">Detalhes do Acesso:</h3>
          <p style="margin: 5px 0;"><strong>IP:</strong> ${details.ip}</p>
          ${details.location ? `<p style="margin: 5px 0;"><strong>Localização:</strong> ${details.location}</p>` : ''}
          ${details.device ? `<p style="margin: 5px 0;"><strong>Dispositivo:</strong> ${details.device}</p>` : ''}
          <p style="margin: 5px 0;"><strong>Data/Hora:</strong> ${details.timestamp.toLocaleString()}</p>
        </div>
        <p>Se você não reconhece esta tentativa de acesso, recomendamos:</p>
        <ol>
          <li>Alterar sua senha imediatamente</li>
          <li>Verificar o histórico de acessos em sua conta</li>
          <li>Entrar em contato com o suporte técnico</li>
        </ol>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Esta é uma mensagem de segurança importante, não ignore.
          Em caso de dúvidas, entre em contato com o suporte.
        </p>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.config.from,
      to,
      subject: '🚨 Alerta de Segurança - Tentativa de Login Suspeita',
      html
    });
  }

  /**
   * Envia notificação de alteração de senha
   */
  async sendPasswordChangeNotification(to: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Alteração de Senha - Koga Monitoramento</h2>
        <p>Olá ${name},</p>
        <p>Sua senha administrativa foi alterada com sucesso.</p>
        <p>Se você não realizou esta alteração, por favor:</p>
        <ol>
          <li>Entre em contato com o suporte imediatamente</li>
          <li>Não tente fazer login no sistema</li>
          <li>Aguarde instruções da equipe de segurança</li>
        </ol>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Esta é uma mensagem automática de confirmação.
          Em caso de dúvidas, entre em contato com o suporte.
        </p>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.config.from,
      to,
      subject: 'Confirmação de Alteração de Senha',
      html
    });
  }
} 
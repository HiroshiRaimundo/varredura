import { PrismaClient, ProfileType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface CreateClientAreaParams {
  email: string;
  name: string;
  password: string;
  profileType: ProfileType;
  planName: string;
}

export class ClientAreaService {
  async createClientArea(params: CreateClientAreaParams) {
    const { email, name, password, profileType, planName } = params;

    // Verifica se o cliente já existe
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      throw new Error('Cliente já existe');
    }

    // Cria o hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria o plano
    const plan = await prisma.plan.create({
      data: {
        name: planName,
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 ano
      }
    });

    // Cria o cliente
    const client = await prisma.client.create({
      data: {
        email,
        name,
        passwordHash,
        profileType,
        planId: plan.id
      }
    });

    // Cria a área do cliente com configurações baseadas no perfil
    const clientArea = await prisma.clientArea.create({
      data: {
        clientId: client.id,
        settings: this.getDefaultSettings(profileType),
        dashboards: this.getDefaultDashboards(profileType)
      }
    });

    return {
      client,
      plan,
      clientArea
    };
  }

  private getDefaultSettings(profileType: ProfileType) {
    const baseSettings = {
      notifications: true,
      emailAlerts: true,
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo'
    };

    switch (profileType) {
      case 'POLITICO':
        return {
          ...baseSettings,
          monitoramentoMidia: true,
          analiseReputacao: true,
          alertasMencoesNegativas: true
        };
      case 'ASSESSOR_IMPRENSA':
        return {
          ...baseSettings,
          distribuicaoRelease: true,
          metricsImprensa: true,
          agendaImprensa: true
        };
      case 'JORNALISTA':
        return {
          ...baseSettings,
          fontesEspecializadas: true,
          pautasPersonalizadas: true,
          bancoDados: true
        };
      case 'OBSERVATORIO':
        return {
          ...baseSettings,
          analiseCompleta: true,
          relatoriosDetalhados: true,
          exportacaoDados: true
        };
      case 'INSTITUICAO':
        return {
          ...baseSettings,
          monitoramentoSetorial: true,
          analiseCompetitiva: true,
          relatoriosExecutivos: true
        };
      default:
        return baseSettings;
    }
  }

  private getDefaultDashboards(profileType: ProfileType) {
    const baseDashboards = [
      {
        id: 'overview',
        name: 'Visão Geral',
        type: 'summary',
        enabled: true
      }
    ];

    switch (profileType) {
      case 'POLITICO':
        return [
          ...baseDashboards,
          {
            id: 'reputacao',
            name: 'Análise de Reputação',
            type: 'reputation',
            enabled: true
          },
          {
            id: 'midia',
            name: 'Monitoramento de Mídia',
            type: 'media',
            enabled: true
          }
        ];
      case 'ASSESSOR_IMPRENSA':
        return [
          ...baseDashboards,
          {
            id: 'releases',
            name: 'Distribuição de Releases',
            type: 'press',
            enabled: true
          },
          {
            id: 'metricas',
            name: 'Métricas de Imprensa',
            type: 'metrics',
            enabled: true
          }
        ];
      // Adicione mais casos conforme necessário
      default:
        return baseDashboards;
    }
  }
} 
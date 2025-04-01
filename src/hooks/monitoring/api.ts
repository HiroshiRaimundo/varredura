
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from './types';

// Dados mockados para monitoramento
const mockMonitorings: MonitoringItem[] = [
  {
    id: '1',
    name: 'Monitoramento de Leis Federais',
    url: 'https://www.planalto.gov.br/legisla',
    frequency: 'daily',
    category: 'Legislação',
    keywords: 'meio ambiente, sustentabilidade',
    responsible: 'Ana Silva',
    notes: 'Monitorar novas leis federais sobre meio ambiente',
    status: 'active',
    lastUpdate: '2023-05-10T14:30:00Z',
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Monitoramento de Notícias',
    url: 'https://g1.globo.com/meio-ambiente',
    frequency: 'hourly',
    category: 'Notícias',
    keywords: 'amazônia, desmatamento, queimadas',
    responsible: 'Carlos Mendes',
    notes: 'Monitorar notícias sobre Amazônia',
    status: 'active',
    lastUpdate: '2023-05-15T08:45:00Z',
    createdAt: '2023-02-20T09:30:00Z'
  },
  {
    id: '3',
    name: 'Diário Oficial',
    url: 'https://www.in.gov.br/web/dou',
    frequency: 'daily',
    category: 'Oficial',
    keywords: 'portaria, decreto, resolução',
    responsible: 'Mariana Costa',
    notes: 'Monitorar publicações no DOU',
    status: 'paused',
    lastUpdate: '2023-05-12T10:15:00Z',
    createdAt: '2023-03-05T11:20:00Z'
  }
];

// Dados mockados para alertas de legislação
const mockLegislationAlerts: LegislationAlert[] = [
  {
    id: '1',
    title: 'Nova Lei de Preservação Ambiental',
    description: 'Lei nº 14.789 estabelece novas diretrizes para preservação de áreas verdes urbanas',
    date: '2023-05-10T09:30:00Z',
    isRead: false,
    url: 'https://www.planalto.gov.br/lei14789',
    source: 'Diário Oficial da União'
  },
  {
    id: '2',
    title: 'Decreto sobre Uso Sustentável da Água',
    description: 'Decreto nº 11.456 regulamenta o uso sustentável de recursos hídricos',
    date: '2023-05-08T14:15:00Z',
    isRead: true,
    url: 'https://www.planalto.gov.br/decreto11456',
    source: 'Diário Oficial da União'
  }
];

// Dados mockados para monitoramento de releases
const mockReleaseMonitoring: ReleaseMonitoringItem[] = [
  {
    id: '1',
    title: 'Comunicado sobre Novas Políticas Ambientais',
    date: '2023-05-05',
    media: ['G1', 'Folha de São Paulo', 'O Globo'],
    status: 'published'
  },
  {
    id: '2',
    title: 'Lançamento de Programa de Conservação',
    date: '2023-05-02',
    media: ['Estadão', 'UOL'],
    status: 'pending'
  }
];

// Funções de API simuladas
export const getClientMonitorings = async (clientId: string): Promise<{data: MonitoringItem[]}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: mockMonitorings
      });
    }, 500);
  });
};

export const getLegislationAlerts = (): LegislationAlert[] => {
  return mockLegislationAlerts;
};

export const getReleaseMonitoring = (): ReleaseMonitoringItem[] => {
  return mockReleaseMonitoring;
};

export const createMonitoring = async (
  monitoring: Omit<MonitoringItem, 'id' | 'status' | 'lastUpdate' | 'createdAt'>
): Promise<MonitoringItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMonitoring: MonitoringItem = {
        ...monitoring,
        id: Date.now().toString(),
        status: 'active',
        lastUpdate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      mockMonitorings.unshift(newMonitoring);
      resolve(newMonitoring);
    }, 500);
  });
};

export const deleteMonitoring = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockMonitorings.findIndex(m => m.id === id);
      if (index !== -1) {
        mockMonitorings.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

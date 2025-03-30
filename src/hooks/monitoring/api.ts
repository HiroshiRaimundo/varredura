
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem, ApiResponse } from './types';

// Mock data for client monitorings
const mockMonitoringItems: MonitoringItem[] = [
  {
    id: "1",
    name: "Monitoramento Legislativo Ambiental",
    url: "https://www.gov.br/planalto/pt-br",
    frequency: "daily",
    category: "Legislativo",
    keywords: "meio ambiente, preservação, código florestal",
    responsible: "Maria Silva",
    notes: "Foco em alterações no código florestal",
    status: "active",
    lastUpdate: "2023-04-20T14:30:00Z",
    createdAt: "2023-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Monitoramento Político-Econômico",
    url: "https://www.bcb.gov.br/",
    frequency: "weekly",
    category: "Economia",
    keywords: "inflação, juros, política monetária",
    responsible: "João Santos",
    notes: "Acompanhamento das decisões do COPOM",
    status: "active",
    lastUpdate: "2023-04-18T09:45:00Z",
    createdAt: "2023-02-10T14:20:00Z"
  },
  {
    id: "3",
    name: "Monitoramento de Mídia Social",
    url: "https://twitter.com/search?q=",
    frequency: "hourly",
    category: "Mídia Social",
    keywords: "sustentabilidade, ESG, mudanças climáticas",
    responsible: "Ana Rodrigues",
    notes: "Monitoramento de hashtags específicas",
    status: "warning",
    lastUpdate: "2023-03-15T16:20:00Z",
    createdAt: "2023-03-01T08:30:00Z"
  },
  {
    id: "4",
    name: "Monitoramento de Notícias",
    url: "https://g1.globo.com/",
    frequency: "daily",
    category: "Notícias",
    keywords: "meio ambiente, política ambiental",
    responsible: "Carlos Mendes",
    notes: "Busca por notícias relacionadas à política ambiental",
    status: "error",
    lastUpdate: "2023-02-28T11:10:00Z",
    createdAt: "2023-01-05T09:15:00Z"
  }
];

// Mock data for legislation alerts
const mockLegislationAlerts: LegislationAlert[] = [
  {
    id: "1",
    title: "Nova Legislação Ambiental",
    description: "Publicada nova lei que altera o Código Florestal",
    date: "2023-04-15T10:30:00Z",
    isRead: false,
    url: "https://www.in.gov.br/documento123",
    source: "Diário Oficial da União"
  },
  {
    id: "2",
    title: "Decreto sobre Licenciamento Ambiental",
    description: "Novo decreto simplifica processo de licenciamento para determinadas atividades",
    date: "2023-04-10T14:20:00Z",
    isRead: true,
    url: "https://www.in.gov.br/documento456",
    source: "Ministério do Meio Ambiente"
  },
  {
    id: "3",
    title: "Consulta Pública: Áreas de Preservação",
    description: "Aberta consulta pública sobre novas regras para áreas de preservação permanente",
    date: "2023-04-05T09:45:00Z",
    isRead: false,
    url: "https://www.gov.br/consulta789",
    source: "IBAMA"
  }
];

// Mock data for release monitoring
const mockReleaseMonitoring: ReleaseMonitoringItem[] = [
  {
    id: "1",
    title: "Lançamento de Relatório de Sustentabilidade",
    date: "2023-04-20",
    media: ["G1", "Folha de São Paulo", "Estadão"],
    status: "active",
    releaseTitle: "Relatório Anual de Sustentabilidade",
    websiteName: "Portal de Notícias Ambientais",
    publishedDate: "2023-04-22",
    publishedTime: "14:30",
    url: "https://www.portalnoticias.com/sustentabilidade",
    isVerified: true
  },
  {
    id: "2",
    title: "Anúncio de Programa de Reflorestamento",
    date: "2023-04-15",
    media: ["CNN Brasil", "UOL", "BBC Brasil"],
    status: "active",
    releaseTitle: "Novo Programa de Reflorestamento",
    websiteName: "Portal Brasil Verde",
    publishedDate: "2023-04-16",
    publishedTime: "10:15",
    url: "https://www.brasilverdeportal.com/programa",
    isVerified: true
  },
  {
    id: "3",
    title: "Lançamento de Produto Eco-Friendly",
    date: "2023-04-10",
    media: ["Exame", "Valor Econômico"],
    status: "pending",
    releaseTitle: "Nova Linha de Produtos Sustentáveis",
    websiteName: "Blog Sustentabilidade",
    publishedDate: "2023-04-12",
    publishedTime: "16:45",
    url: "https://www.blogsustentabilidade.com/lancamento",
    isVerified: false
  }
];

// API functions for client monitorings
export const getClientMonitorings = async (clientId: string): Promise<ApiResponse<MonitoringItem[]>> => {
  // Simulate API call with delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: mockMonitoringItems.filter(item => true), // In real api would filter by clientId
        meta: {
          pagination: {
            total: mockMonitoringItems.length,
            currentPage: 1,
            totalPages: 1,
            perPage: 10
          }
        }
      });
    }, 500);
  });
};

export const createMonitoring = async (monitoring: Omit<MonitoringItem, 'id' | 'status' | 'lastUpdate' | 'createdAt'>): Promise<MonitoringItem> => {
  const newMonitoring: MonitoringItem = {
    id: Date.now().toString(),
    ...monitoring,
    status: "active",
    lastUpdate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  mockMonitoringItems.push(newMonitoring);
  
  // Simulate API call with delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newMonitoring);
    }, 500);
  });
};

export const updateMonitoring = async (id: string, updates: Partial<MonitoringItem>): Promise<MonitoringItem> => {
  const index = mockMonitoringItems.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error("Monitoring not found");
  }

  const updatedMonitoring = {
    ...mockMonitoringItems[index],
    ...updates,
    lastUpdate: new Date().toISOString()
  };

  mockMonitoringItems[index] = updatedMonitoring;

  // Simulate API call with delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(updatedMonitoring);
    }, 500);
  });
};

export const deleteMonitoring = async (id: string): Promise<boolean> => {
  const index = mockMonitoringItems.findIndex(item => item.id === id);
  if (index === -1) {
    return false;
  }

  mockMonitoringItems.splice(index, 1);

  // Simulate API call with delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Get legislation alerts
export const getLegislationAlerts = (): LegislationAlert[] => {
  return mockLegislationAlerts;
};

// Get release monitoring items
export const getReleaseMonitoring = (): ReleaseMonitoringItem[] => {
  return mockReleaseMonitoring;
};

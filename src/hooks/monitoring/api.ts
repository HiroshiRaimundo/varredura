
// Mock API para modo offline

import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from "./types";

// Mock data para itens de monitoramento
const mockMonitoringItems: MonitoringItem[] = [
  {
    id: "1",
    name: "Monitoramento de Legislação Ambiental",
    url: "https://www.legisweb.com.br/legislacao-ambiental",
    frequency: "diária",
    category: "Legislação",
    keywords: "meio ambiente, sustentabilidade, poluição",
    responsible: "Ana Silva",
    notes: "Monitorar atualizações nas leis ambientais"
  },
  {
    id: "2",
    name: "Portal de Dados Abertos",
    url: "https://dados.gov.br",
    frequency: "semanal",
    category: "Dados",
    keywords: "open data, transparência, dados públicos",
    responsible: "Carlos Oliveira",
    notes: "Verificar novos conjuntos de dados disponibilizados"
  },
  {
    id: "3",
    name: "Diário Oficial da União",
    url: "https://www.in.gov.br/web/dou",
    frequency: "diária",
    category: "Governo",
    keywords: "legislação, decretos, portarias",
    responsible: "Maria Santos",
    notes: "Monitoramento diário de publicações oficiais"
  }
];

// Mock data para alertas de legislação
const mockLegislationAlerts: LegislationAlert[] = [
  {
    id: "1",
    title: "Nova Lei sobre Proteção de Dados",
    description: "Foi publicada hoje a Lei 14.XXX que estabelece novas diretrizes para proteção de dados pessoais em serviços públicos.",
    date: "2025-03-15",
    url: "https://www.in.gov.br/web/dou/-/lei-14.xxx",
    isRead: false,
    source: "Diário Oficial da União"
  },
  {
    id: "2",
    title: "Decreto sobre Transparência de Dados",
    description: "Novo decreto estabelece diretrizes para a divulgação de dados governamentais em formatos abertos.",
    date: "2025-03-12",
    url: "https://www.in.gov.br/web/dou/-/decreto-xx.xxx",
    isRead: true,
    source: "Diário Oficial da União"
  },
  {
    id: "3",
    title: "Portaria sobre Pesquisas Científicas",
    description: "Publicada portaria que regulamenta o financiamento de pesquisas científicas em universidades públicas.",
    date: "2025-03-10",
    url: "https://www.in.gov.br/web/dou/-/portaria-xxx",
    isRead: false,
    source: "Ministério da Ciência e Tecnologia"
  }
];

// Mock data para monitoramento de releases
const mockReleaseMonitoring: ReleaseMonitoringItem[] = [
  {
    id: "1",
    releaseTitle: "Lançamento da Nova Plataforma de Dados",
    publishedDate: "2025-03-20",
    publishedTime: "14:30",
    websiteName: "Portal de Notícias Tech",
    url: "https://tech-news.exemplo.com/nova-plataforma-dados",
    isVerified: true,
    title: "Nova Plataforma de Dados",
    clientId: "client123",
    clientType: "observatory",
    clientName: "Observatório de Dados",
    status: "published",
    submittedDate: "2025-03-18",
    approvedDate: "2025-03-19",
    notes: "Release aprovado com destaque na homepage"
  },
  {
    id: "2",
    releaseTitle: "Resultados da Pesquisa sobre Clima",
    publishedDate: "2025-03-15",
    publishedTime: "09:45",
    websiteName: "Jornal Ciência Hoje",
    url: "https://ciencia-hoje.exemplo.com/pesquisa-clima",
    isVerified: true,
    title: "Pesquisa Climática",
    clientId: "client456",
    clientType: "researcher",
    clientName: "Instituto de Pesquisas Climáticas",
    status: "published",
    submittedDate: "2025-03-12",
    approvedDate: "2025-03-14",
    notes: "Release publicado na editoria de meio ambiente"
  },
  {
    id: "3",
    releaseTitle: "Novo Relatório sobre Educação",
    publishedDate: "2025-03-10",
    publishedTime: "16:20",
    websiteName: "Portal Educação",
    url: "https://educacao.exemplo.com/relatorio-educacao",
    isVerified: false,
    title: "Relatório Educacional",
    clientId: "client789",
    clientType: "institution",
    clientName: "Fundação Educacional",
    status: "pending",
    submittedDate: "2025-03-08",
    notes: "Release enviado, aguardando publicação"
  }
];

// Função mock para buscar itens de monitoramento
export const fetchMonitoringItemsFromDB = async (): Promise<MonitoringItem[]> => {
  // Simulando tempo de carregamento
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockMonitoringItems];
};

// Função mock para adicionar um novo item de monitoramento
export const addMonitoringItemToDB = async (data: Omit<MonitoringItem, "id">): Promise<MonitoringItem> => {
  // Simulando tempo de carregamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newItem: MonitoringItem = {
    id: `${Date.now()}`, // ID simulado
    ...data
  };
  
  mockMonitoringItems.push(newItem);
  return newItem;
};

// Função mock para deletar um item de monitoramento
export const deleteMonitoringItemFromDB = async (id: string): Promise<void> => {
  // Simulando tempo de carregamento
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockMonitoringItems.findIndex(item => item.id === id);
  if (index !== -1) {
    mockMonitoringItems.splice(index, 1);
  }
};

// Função mock para buscar alertas de legislação
export const fetchLegislationAlertsFromDB = (): LegislationAlert[] => {
  return [...mockLegislationAlerts];
};

// Função mock para buscar monitoramento de releases
export const fetchReleaseMonitoringFromDB = (): ReleaseMonitoringItem[] => {
  return [...mockReleaseMonitoring];
};

export const mockSupabaseClient = {
  auth: {
    getSession: () => ({ data: { session: null }, error: null }),
    signInWithPassword: async ({ email, password }: { email: string, password: string }) => {
      if (email === "admin@koga.com" && password === "admin123") {
        return { data: { user: { id: "1", email: "admin@koga.com" } }, error: null };
      }
      return { data: { user: null }, error: { message: "Invalid login credentials" } };
    },
    signOut: () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => ({ data: null, error: null })
      }),
      order: () => ({
        data: [],
        error: null
      })
    }),
    insert: () => ({ data: { id: "new-id" }, error: null }),
    delete: () => ({ data: {}, error: null })
  })
};

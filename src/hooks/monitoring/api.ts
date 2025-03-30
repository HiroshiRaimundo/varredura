
import { LegislationAlert, ReleaseMonitoringItem } from "./types";
import { mockData } from "@/utils/mockSupabase";

// Função para obter monitoramentos de um cliente
export const getClientMonitorings = async (clientId: string) => {
  try {
    // Mock de dados
    return {
      data: mockData.monitoringItems,
      error: null
    };
  } catch (error) {
    console.error("Erro ao carregar monitoramentos:", error);
    return { data: null, error };
  }
};

// Função para adicionar um novo monitoramento
export const addMonitoring = async (monitoring: {
  name: string;
  url: string;
  api_url: string;
  frequency: string;
  category: string;
  keywords: string;
  responsible: string;
  notes: string;
}) => {
  try {
    // Mock de dados
    return {
      data: {
        id: `monitoring-${Date.now()}`,
        ...monitoring
      },
      error: null
    };
  } catch (error) {
    console.error("Erro ao adicionar monitoramento:", error);
    return { data: null, error };
  }
};

// Alertas de legislação
export const getLegislationAlerts = async (): Promise<LegislationAlert[]> => {
  // Mock de alertas de legislação
  return [
    {
      id: "1",
      title: "Nova Lei Ambiental",
      description: "Lei nº 12.345 que altera as diretrizes para licenciamento ambiental",
      date: new Date().toISOString(),
      url: "https://example.com/lei12345",
      isRead: false,
      source: "Diário Oficial" // Adicionando o campo source
    },
    {
      id: "2",
      title: "Portaria sobre Agrotóxicos",
      description: "Portaria que estabelece novas regras para registro de agrotóxicos",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/portaria-agrotoxicos",
      isRead: true,
      source: "Ministério da Agricultura" // Adicionando o campo source
    },
    {
      id: "3",
      title: "Decreto sobre Proteção da Mata Atlântica",
      description: "Decreto que reforça a proteção de áreas de Mata Atlântica",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/decreto-mata-atlantica",
      isRead: false,
      source: "Casa Civil" // Adicionando o campo source
    }
  ];
};

// Monitoramento de releases
export const getReleaseMonitoring = async (): Promise<ReleaseMonitoringItem[]> => {
  // Mock de monitoramento de releases
  return [
    {
      id: "1",
      releaseTitle: "Empresa X lança novo produto sustentável",
      title: "Empresa X lança novo produto sustentável", // Adicionando o campo title
      websiteName: "Portal de Notícias Green",
      publishedDate: new Date().toLocaleDateString(),
      publishedTime: new Date().toLocaleTimeString(),
      url: "https://example.com/noticia1",
      isVerified: true,
      status: "publicado"
    },
    {
      id: "2",
      releaseTitle: "Estudo revela impacto das mudanças climáticas",
      title: "Estudo revela impacto das mudanças climáticas", // Adicionando o campo title
      websiteName: "Ciência Hoje",
      publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      publishedTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleTimeString(),
      url: "https://example.com/noticia2",
      isVerified: true,
      status: "publicado"
    },
    {
      id: "3",
      releaseTitle: "Nova política de gestão de resíduos",
      title: "Nova política de gestão de resíduos", // Adicionando o campo title
      websiteName: "Jornal Ambiental",
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      publishedTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleTimeString(),
      url: "https://example.com/noticia3",
      isVerified: false,
      status: "pendente"
    }
  ];
};

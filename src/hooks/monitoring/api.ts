
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from "./types";
import { mockData } from "@/utils/mockSupabase";

// Renomeando funções para corresponder ao que está sendo importado em useMonitoring.ts
export const fetchMonitoringItemsFromDB = async (): Promise<MonitoringItem[]> => {
  try {
    // Mock de dados
    return mockData.monitoringItems || [];
  } catch (error) {
    console.error("Erro ao carregar monitoramentos:", error);
    return [];
  }
};

// Função para adicionar um novo monitoramento
export const addMonitoringItemToDB = async (monitoring: Omit<MonitoringItem, "id">): Promise<MonitoringItem> => {
  try {
    // Mock de dados
    return {
      id: `monitoring-${Date.now()}`,
      ...monitoring
    };
  } catch (error) {
    console.error("Erro ao adicionar monitoramento:", error);
    throw error;
  }
};

// Função para excluir um monitoramento
export const deleteMonitoringItemFromDB = async (id: string): Promise<boolean> => {
  try {
    console.log(`Monitoramento ${id} excluído`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir monitoramento:", error);
    throw error;
  }
};

// Renomeando para fetchLegislationAlertsFromDB
export const fetchLegislationAlertsFromDB = (): LegislationAlert[] => {
  // Mock de alertas de legislação
  return [
    {
      id: "1",
      title: "Nova Lei Ambiental",
      description: "Lei nº 12.345 que altera as diretrizes para licenciamento ambiental",
      date: new Date().toISOString(),
      url: "https://example.com/lei12345",
      isRead: false,
      source: "Diário Oficial" 
    },
    {
      id: "2",
      title: "Portaria sobre Agrotóxicos",
      description: "Portaria que estabelece novas regras para registro de agrotóxicos",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/portaria-agrotoxicos",
      isRead: true,
      source: "Ministério da Agricultura"
    },
    {
      id: "3",
      title: "Decreto sobre Proteção da Mata Atlântica",
      description: "Decreto que reforça a proteção de áreas de Mata Atlântica",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/decreto-mata-atlantica",
      isRead: false,
      source: "Casa Civil"
    }
  ];
};

// Renomeando para fetchReleaseMonitoringFromDB
export const fetchReleaseMonitoringFromDB = (): ReleaseMonitoringItem[] => {
  // Mock de monitoramento de releases
  return [
    {
      id: "1",
      releaseTitle: "Empresa X lança novo produto sustentável",
      title: "Empresa X lança novo produto sustentável",
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
      title: "Estudo revela impacto das mudanças climáticas",
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
      title: "Nova política de gestão de resíduos",
      websiteName: "Jornal Ambiental",
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      publishedTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleTimeString(),
      url: "https://example.com/noticia3",
      isVerified: false,
      status: "pendente"
    }
  ];
};

// Mantendo as funções originais para retrocompatibilidade
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

export const getLegislationAlerts = fetchLegislationAlertsFromDB;
export const getReleaseMonitoring = fetchReleaseMonitoringFromDB;

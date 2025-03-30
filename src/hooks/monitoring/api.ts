
import { ApiResponse, MonitoringFilters, MonitoringItem, PaginationParams } from "./types";

// Mock de dados para monitoramento
export const fetchMonitoringData = async (
  filters?: MonitoringFilters,
  pagination?: PaginationParams
): Promise<ApiResponse<MonitoringItem[]>> => {
  // Dados de exemplo
  const mockItems: Partial<MonitoringItem>[] = [
    {
      id: "1",
      name: "Monitoramento de Legislação Ambiental",
      url: "https://www.gov.br/meio-ambiente/legislacao",
      frequency: "daily",
      category: "Legislação",
      keywords: "floresta, preservação, meio ambiente",
      responsible: "Ana Silva",
      notes: "Monitorar novas leis ambientais"
    },
    {
      id: "2",
      name: "Monitoramento de Notícias sobre Sustentabilidade",
      url: "https://g1.globo.com/natureza/",
      frequency: "daily",
      category: "Notícias",
      keywords: "sustentabilidade, reciclagem, poluição",
      responsible: "Carlos Souza",
      notes: "Acompanhar principais portais de notícias"
    },
    {
      id: "3",
      name: "Publicações Científicas sobre Biodiversidade",
      url: "https://scielo.org/biodiversidade",
      frequency: "weekly",
      category: "Pesquisa",
      keywords: "biodiversidade, espécies, conservação",
      responsible: "Juliana Mendes",
      notes: "Revisar novas publicações científicas"
    }
  ].map(item => ({
    ...item,
    status: "active",
    lastUpdate: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  })) as MonitoringItem[];

  // Simula um pequeno delay de resposta do servidor
  await new Promise(resolve => setTimeout(resolve, 500));

  // Aplicar filtros se fornecidos
  let filteredItems = [...mockItems];
  if (filters) {
    if (filters.category) {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    if (filters.status) {
      filteredItems = filteredItems.filter(item => item.status === filters.status);
    }
    if (filters.frequency) {
      filteredItems = filteredItems.filter(item => item.frequency === filters.frequency);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.keywords.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    }
  }

  // Aplicar paginação se fornecida
  let paginatedItems = filteredItems;
  let paginationMeta = undefined;
  if (pagination) {
    const { page, limit } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    paginatedItems = filteredItems.slice(startIndex, endIndex);

    paginationMeta = {
      pagination: {
        total: filteredItems.length,
        currentPage: page,
        totalPages: Math.ceil(filteredItems.length / limit),
        perPage: limit
      }
    };
  }

  // Retorna resposta formatada no padrão da API
  return {
    data: paginatedItems,
    meta: paginationMeta
  };
};

// Mock de função para criar novo monitoramento
export const createMonitoring = async (item: Omit<MonitoringItem, 'id' | 'status' | 'lastUpdate' | 'createdAt'>): Promise<ApiResponse<MonitoringItem>> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newItem: MonitoringItem = {
    ...item,
    id: crypto.randomUUID(),
    status: "active",
    lastUpdate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  // Simulação de sucesso
  return {
    data: newItem
  };
};

// Mock de função para atualizar monitoramento existente
export const updateMonitoring = async (id: string, item: Partial<MonitoringItem>): Promise<ApiResponse<MonitoringItem>> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Na implementação real, aqui teríamos uma chamada ao backend

  // Simulação de sucesso - criando um objeto atualizado para retorno
  const updatedItem: MonitoringItem = {
    id,
    name: item.name || "Monitoramento Atualizado",
    url: item.url || "https://example.com",
    frequency: item.frequency || "daily",
    category: item.category || "Geral",
    keywords: item.keywords || "",
    responsible: item.responsible || "",
    notes: item.notes || "",
    status: item.status || "active",
    lastUpdate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1000000000).toISOString()
  };

  return {
    data: updatedItem
  };
};

// Mock de função para excluir monitoramento
export const deleteMonitoring = async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Na implementação real, aqui teríamos uma chamada ao backend

  // Simulação de sucesso
  return {
    data: { success: true }
  };
};

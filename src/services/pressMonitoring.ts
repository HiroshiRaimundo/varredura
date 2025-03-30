
// Serviço para monitoramento de imprensa

import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

// Dados simulados para o monitoramento de imprensa
const mockReleases: ReleaseMonitoringItem[] = [
  {
    id: "1",
    releaseTitle: "Nova política ambiental para a Amazônia",
    title: "Nova política ambiental para a Amazônia", // Mantendo compatibilidade com o campo title
    websiteName: "Portal Ambiental",
    publishedDate: "2023-04-15",
    publishedTime: "14:30",
    url: "https://example.com/release1",
    isVerified: true,
    status: "publicado"
  },
  {
    id: "2",
    releaseTitle: "Relatório sobre desmatamento na região Norte",
    title: "Relatório sobre desmatamento na região Norte", // Mantendo compatibilidade com o campo title
    websiteName: "Jornal do Meio Ambiente",
    publishedDate: "2023-04-12",
    publishedTime: "09:45",
    url: "https://example.com/release2",
    isVerified: true,
    status: "publicado"
  },
  {
    id: "3",
    releaseTitle: "Novas diretrizes para preservação da floresta",
    title: "Novas diretrizes para preservação da floresta", // Mantendo compatibilidade com o campo title
    websiteName: "Blog Amazônia Sustentável",
    publishedDate: "2023-04-10",
    publishedTime: "16:20",
    url: "https://example.com/release3",
    isVerified: false,
    status: "pendente"
  }
];

// Serviço para gerenciar o monitoramento de releases de imprensa
export const pressMonitoringService = {
  // Obter todos os releases monitorados
  getReleases: async (): Promise<ReleaseMonitoringItem[]> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReleases);
      }, 500);
    });
  },
  
  // Adicionar um novo release para monitoramento
  addRelease: async (release: Omit<ReleaseMonitoringItem, "id">): Promise<ReleaseMonitoringItem> => {
    // Simulando uma chamada de API para adicionar
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRelease = {
          ...release,
          id: Math.random().toString(36).substr(2, 9),
        };
        mockReleases.push(newRelease);
        resolve(newRelease);
      }, 500);
    });
  },
  
  // Verificar um release (marcar como verificado)
  verifyRelease: async (id: string): Promise<ReleaseMonitoringItem> => {
    // Simulando uma chamada de API para atualizar
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockReleases.findIndex(r => r.id === id);
        if (index !== -1) {
          mockReleases[index].isVerified = true;
          mockReleases[index].status = "publicado";
          resolve(mockReleases[index]);
        } else {
          reject(new Error("Release não encontrado"));
        }
      }, 500);
    });
  }
};

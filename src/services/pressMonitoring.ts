
// Serviço para monitoramento de imprensa

import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

// Dados simulados para o monitoramento de imprensa
const mockReleases: ReleaseMonitoringItem[] = [
  {
    id: "1",
    title: "Nova política ambiental para a Amazônia",
    date: "2023-04-15",
    media: ["Portal Ambiental"],
    status: "publicado",
    releaseTitle: "Nova política ambiental para a Amazônia",
    websiteName: "Portal Ambiental",
    publishedDate: "2023-04-15",
    publishedTime: "14:30",
    url: "https://example.com/release1",
    isVerified: true
  },
  {
    id: "2",
    title: "Relatório sobre desmatamento na região Norte",
    date: "2023-04-12",
    media: ["Jornal do Meio Ambiente"],
    status: "publicado",
    releaseTitle: "Relatório sobre desmatamento na região Norte",
    websiteName: "Jornal do Meio Ambiente",
    publishedDate: "2023-04-12",
    publishedTime: "09:45",
    url: "https://example.com/release2",
    isVerified: true
  },
  {
    id: "3",
    title: "Novas diretrizes para preservação da floresta",
    date: "2023-04-10",
    media: ["Blog Amazônia Sustentável"],
    status: "pendente",
    releaseTitle: "Novas diretrizes para preservação da floresta",
    websiteName: "Blog Amazônia Sustentável",
    publishedDate: "2023-04-10",
    publishedTime: "16:20",
    url: "https://example.com/release3",
    isVerified: false
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

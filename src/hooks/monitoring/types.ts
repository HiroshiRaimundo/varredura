
// Adicionando a propriedade "source" ao tipo LegislationAlert
export interface LegislationAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  isRead: boolean;
  source: string; // Campo adicionado
}

// Adicionando a propriedade "title" ao tipo ReleaseMonitoringItem
export interface ReleaseMonitoringItem {
  id: string;
  releaseTitle: string;
  title: string; // Campo adicionado para manter compatibilidade
  websiteName: string;
  publishedDate: string;
  publishedTime: string;
  url: string;
  isVerified: boolean;
  status: "publicado" | "pendente";
}

export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  category: string;
  frequency: "hourly" | "daily" | "weekly" | "monthly";
  responsible: string;
  status: "active" | "paused";
  lastUpdate: string;
  createdAt: string;
  keywords: string[]; // Definido como array de strings
}

// Usando export type para evitar conflitos com isolatedModules
export type { MonitoringItem };

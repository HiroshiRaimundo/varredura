
// Tipos para monitoramento
export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: "hourly" | "daily" | "weekly" | "monthly";
  category: string;
  keywords: string; // Definido como string para manter consistência
  responsible: string;
  notes: string;
  status: string;
  lastUpdate: string;
  createdAt: string;
}

export interface FormMonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
  keywords: string;
  responsible: string;
  notes: string;
}

export interface MonitoringFormProps {
  onSubmit: (data: FormMonitoringItem) => void;
  initialData?: FormMonitoringItem;
  isEdit?: boolean;
  clientType?: string;
}

// Alias for API interface compatibility
export type Monitoring = MonitoringItem;

// Tipos para alertas de legislação
export interface LegislationAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  url: string;
  source: string;
}

// Tipos para monitoramento de release
export interface ReleaseMonitoringItem {
  id: string;
  title: string;
  date: string;
  media: string[];
  status: string;
  releaseTitle?: string;
  websiteName?: string;
  publishedDate?: string;
  publishedTime?: string;
  url?: string;
  isVerified?: boolean;
}

export interface MonitoringData {
  totalItems: number;
  alertCount: number;
  recentAlerts: LegislationAlert[];
  monitoringTypes: {
    legislation: number;
    news: number;
    social: number;
    other: number;
  };
}

// API Types
export interface MonitoringFilters {
  category?: string;
  status?: string;
  frequency?: string;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      currentPage: number;
      totalPages: number;
      perPage: number;
    }
  };
  error?: {
    message: string;
    code: string;
  };
}

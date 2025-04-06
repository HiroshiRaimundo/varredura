export interface JournalistContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
  mediaOutlet?: string;
  category?: string;
  region?: string;
}

export interface ReleaseData {
  id: string;
  title: string;
  clientName: string;
  clientType: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'draft' | 'approved' | 'rejected';
  content?: string;
  subtitle?: string;
  author?: string;
  monitoringActive?: boolean;
  lastMonitoringCheck?: string;
  targetJournalists?: string[];
  client?: string;
  date?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface JournalistFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
  mediaOutlet?: string;
  category?: string;
  region?: string;
}

// Para PressDashboard
export interface PressReleaseData {
  id: string;
  title: string;
  status: string;
  date: string;
  views: number;
  published: boolean;
  publications: number;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
}

// Paginação e filtros
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface JournalistFilters {
  name?: string;
  mediaOutlet?: string;
  category?: string;
  region?: string;
}

// Interfaces de monitoramento de release
export interface ReleaseMonitoring {
  id: string;
  releaseId: string;
  releaseTitle: string;
  targetWebsites: string[];
  monitoringFrequency: 'daily' | 'weekly';
  lastChecked: string;
  status: 'active' | 'paused' | 'complete';
  results: ReleaseMonitoringResult[];
}

export interface ReleaseMonitoringResult {
  id: string;
  monitoringId: string;
  foundUrl: string;
  foundDate: string;
  foundTime: string;
  websiteName: string;
  excerptFound: string;
  verified: boolean;
}

// Equivalente à ReleaseMonitoringItem em outros arquivos
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

export interface ReleaseAlertsProps {
  alerts: {
    id: string;
    title: string;
    message: string;
    type: string;
  }[];
}

export interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

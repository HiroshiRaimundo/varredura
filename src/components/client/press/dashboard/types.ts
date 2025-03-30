
export interface PressReleaseData {
  id: string;
  title: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'approved' | 'rejected';
  views?: number;
  published?: boolean;
  publications?: number;
  date?: string;
}

export interface MockData {
  releases: PressReleaseData[];
  releaseStats: {
    total: number;
    published: number;
    pending: number;
  };
  monthlyData: Array<{ month: string; count: number }>;
  mediaOutlets: Array<{ name: string; count: number }>;
  recentReleases: PressReleaseData[];
}

export interface DashboardHeaderProps {
  title: string;
  description: string;
}

export interface StatisticsCardsProps {
  stats: {
    releases: number;
    published: number;
    views: number;
    pending: number;
  };
}

export interface ReleaseAlertsProps {
  alerts: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
  }>;
}

export interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface PressReleaseDashboardProps {
  clientType: string;
}

export interface ReleaseMonitoringDashboardProps {
  releases: any[];
}

export const mockData: MockData = {
  // ... add mock data if needed
  releases: [],
  releaseStats: { total: 0, published: 0, pending: 0 },
  monthlyData: [],
  mediaOutlets: [],
  recentReleases: []
};

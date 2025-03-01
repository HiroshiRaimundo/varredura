
// Types for monitoring functionality
export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  notes?: string;
}

export interface LegislationAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  isRead: boolean;
}

export interface ReleaseMonitoringItem {
  id: string;
  releaseTitle: string;
  websiteName: string;
  publishedDate: string;
  publishedTime: string;
  url: string;
  isVerified: boolean;
  clientId?: string;
  clientType?: string;
  clientName?: string;
  status?: string;
  submittedDate?: string;
  approvedDate?: string;
  notes?: string;
}

export interface ClientCredentials {
  id: string;
  email: string;
  name: string;
  clientType: string;
  clientId: string;
  lastLogin?: string;
}

export interface PressReleaseMonitoring {
  id: string;
  releaseId: string;
  title: string;
  status: string;
  targetOutlets: string[];
  publishedOutlets: string[];
  createdDate: string;
  lastCheckedDate: string;
  publishedUrls: {
    outlet: string;
    url: string;
    date: string;
  }[];
}

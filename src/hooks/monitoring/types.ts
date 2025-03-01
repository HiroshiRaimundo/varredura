
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
}

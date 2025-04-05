
export interface ReleaseMonitoringItem {
  id: string;
  releaseId: string;
  releaseTitle: string;
  title?: string;
  websiteName: string;
  publishedDate: string;
  publishedTime: string;
  url?: string;
  status: string;
  date?: string;
  media?: string[];
  isVerified?: boolean;
}

export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: string;
  category: string;
  keywords: string;
  responsible: string;
  notes: string;
  status: string;
  lastUpdate: string;
  createdAt: string;
}

export interface LegislationAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  url: string;
  source: string;
}

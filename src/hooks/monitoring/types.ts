
export interface ReleaseMonitoringItem {
  id: string;
  releaseId: string;
  releaseTitle: string;
  title?: string; // Adding title property
  websiteName: string;
  publishedDate: string;
  publishedTime: string;
  url?: string;
  status: string;
  date?: string; // Adding date property
  media?: string[]; // Adding media property
  isVerified?: boolean; // Adding isVerified property
}



export interface SimpleReleaseData {
  id: string;
  title: string;
  status: string;
  date: string;
  views: number;
  published: boolean;
  publications: number;
}

export interface AlertData {
  id: string;
  title: string;
  message: string;
  type: string;
}

export interface PressDashboardData {
  releases: SimpleReleaseData[];
  alerts: AlertData[];
}

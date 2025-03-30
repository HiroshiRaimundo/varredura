
export interface MockData {
  releases: Array<{
    id: string;
    title: string;
    date: string;
    status: string;
  }>;
  releaseStats: {
    total: number;
    published: number;
    pending: number;
  };
  monthlyData: Array<{ month: string; count: number }>;
  mediaOutlets: Array<{ name: string; count: number }>;
  recentReleases: Array<{
    id: string;
    title: string;
    date: string;
    status: string;
  }>;
}

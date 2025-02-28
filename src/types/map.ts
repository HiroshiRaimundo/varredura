
export interface MapPoint {
  id: string;
  title: string;
  author: string;
  location: string;
  coordinates: [number, number];
  repositoryUrl?: string;
  summary?: string;
}

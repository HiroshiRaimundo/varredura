
export interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  co_authors: string;
  summary: string;
  repository_url: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  type: "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro";
  created_at: string;
  updated_at: string;
}

export interface ResearchStudyFormData {
  title: string;
  author: string;
  co_authors?: string;
  summary: string;
  repository_url?: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  type: "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro";
}

export interface ResearchFilter {
  type?: string;
  author?: string;
  location?: string;
  dateRange?: [Date | null, Date | null];
}

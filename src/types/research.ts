
// Shared types for research functionality
export interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro";
}

export type ResearchStudyFormData = Omit<ResearchStudy, "id" | "coordinates">;

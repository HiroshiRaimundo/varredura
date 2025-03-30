
// Define ClientType for the application
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export interface ClientTypeDetail {
  id: ClientType;
  title: string;
  description: string;
  alert?: string | null;
  features: string[];
  benefits?: string[];
  details?: string[];
  caseStudy?: {
    title: string;
    content: string;
  };
}

export interface ClientTypeDetails {
  id: ClientType;
  title: string;
  description: string;
  alert?: string | null;
  features: string[];
  benefits?: string[];
  details?: string[];
  caseStudy?: {
    title: string;
    content: string;
  };
}

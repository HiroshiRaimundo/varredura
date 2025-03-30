
// Define ClientType for the application
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export interface ClientTypeDetails {
  id: ClientType;
  title: string;
  description: string;
  alert?: string | null;
  features: string[];
  benefits?: string[];
  details?: string[];
  shortDescription?: string;
  caseStudy?: {
    title: string;
    content: string;
    description?: string;
  };
}

// Export the ClientTypeDetail as an alias to ClientTypeDetails for backward compatibility
export type ClientTypeDetail = ClientTypeDetails;

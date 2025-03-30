
// Tipos para cliente

export type ClientType = 
  | "observatory"
  | "researcher" 
  | "politician" 
  | "institution"
  | "journalist"
  | "press";

export interface CaseStudy {
  title: string;
  description: string;
}

// Interface para os detalhes de cada tipo de cliente
export interface ClientTypeDetail {
  id: ClientType;
  title: string;
  shortDescription: string;
  description: string;
  details: string;
  features: string[];
  benefits: string[];
  caseStudy: CaseStudy;
}

// Mapa de tipos de cliente para seus detalhes
export interface ClientTypeDetailsMap {
  [key: string]: ClientTypeDetail;
}

export const clientTypeDetails: ClientTypeDetailsMap = {
  // Os detalhes serão importados de arquivos separados
};

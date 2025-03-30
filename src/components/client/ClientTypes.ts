
export { clientTypes } from '@/data/clientTypesList';
export type { ClientType } from '@/types/clientTypes';

// Definimos interfaces temporárias para ClientTypeDetail e CaseStudy
// até que sejam propriamente definidas em outros arquivos
export interface ClientTypeDetail {
  id: string;
  name: string;
  description: string;
  features: string[];
  caseStudies?: CaseStudy[];
  alert?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  results: string;
  clientName?: string;
}

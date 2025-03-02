
export type ClientType = 'observatory' | 'institution' | 'researcher' | 'journalist' | 'politician' | 'press';

export interface CaseStudy {
  title: string;
  description: string;
}

export interface ClientTypeDetail {
  id: ClientType;
  title: string;
  shortDescription: string;
  description: string;
  details: string;
  features: string[];
  benefits: string[];
  caseStudy?: CaseStudy;
}

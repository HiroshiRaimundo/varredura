
export interface Report {
  id: string;
  title: string;
  type: "pdf" | "excel";
  date: string;
  size: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface ReportInclusions {
  mediaAnalysis: boolean;
  sentimentAnalysis: boolean;
  competitorComparison: boolean;
  contentAnalysis: boolean;
}

export interface CustomReportOptions {
  title: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  format: "pdf" | "excel";
  inclusions: ReportInclusions;
}

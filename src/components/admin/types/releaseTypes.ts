
export interface JournalistContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
  mediaOutlet?: string; // Added for filtering by publication
  category?: string;    // Type of journalism (environment, politics, etc.)
  region?: string;      // Geographic region
}

export interface ReleaseData {
  id: string;
  title: string;
  clientName: string;
  clientType: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'draft' | 'approved' | 'rejected';
  content?: string;
  subtitle?: string;
  author?: string;
  monitoringActive?: boolean; // Added for tracking
  lastMonitoringCheck?: string; // Date of last check
  targetJournalists?: string[]; // IDs of journalists this was sent to
}

export interface JournalistFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
  mediaOutlet?: string;
  category?: string;
  region?: string;
}

// Pagination and filter interfaces
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface JournalistFilters {
  name?: string;
  mediaOutlet?: string;
  category?: string;
  region?: string;
}

// Release monitoring interfaces
export interface ReleaseMonitoring {
  id: string;
  releaseId: string;
  releaseTitle: string;
  targetWebsites: string[];
  monitoringFrequency: 'daily' | 'weekly';
  lastChecked: string;
  status: 'active' | 'paused' | 'complete';
  results: ReleaseMonitoringResult[];
}

export interface ReleaseMonitoringResult {
  id: string;
  monitoringId: string;
  foundUrl: string;
  foundDate: string;
  foundTime: string;
  websiteName: string;
  excerptFound: string;
  verified: boolean;
}

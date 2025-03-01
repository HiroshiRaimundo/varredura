
export interface JournalistContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
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
}

export interface JournalistFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
}

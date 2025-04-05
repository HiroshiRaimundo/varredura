
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'manager';
  type?: ClientType;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  plan?: 'basic' | 'standard' | 'enterprise';
  planExpiresAt?: Date;
}

export type ClientType = 
  | 'observatory' 
  | 'press' 
  | 'researcher' 
  | 'politician' 
  | 'institution' 
  | 'journalist';

export type ReleaseStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected';

export interface Release {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  status: ReleaseStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  rejectedAt?: Date;
  rejectedBy?: string;
  feedback?: string;
  attachments?: string[];
  publishedUrl?: string;
}

export interface Monitoring {
  id: string;
  userId: string;
  name: string;
  terms: string[];
  sources: string[];
  frequency: 'realtime' | 'daily' | 'weekly';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastCheckedAt?: Date;
  alertThreshold: number;
}

export interface MonitoringResult {
  id: string;
  monitoringId: string;
  term: string;
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  publishedAt: Date;
  foundAt: Date;
  isRead: boolean;
}

export interface Report {
  id: string;
  userId: string;
  title: string;
  type: 'pdf' | 'excel';
  fileUrl: string;
  fileSize: number;
  createdAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  parameters?: {
    [key: string]: any;
  };
}

export interface Alert {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'media' | 'release' | 'monitoring' | 'system';
  source: string;
  sourceUrl?: string;
  createdAt: Date;
  isRead: boolean;
  relatedId?: string;
  relatedType?: 'release' | 'monitoring' | 'report';
}

export interface MediaContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  outlet: string;
  position?: string;
  category: string[];
  region?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

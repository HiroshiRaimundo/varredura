
import { ClientType } from './databaseModels';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'supervisor';
  createdAt: string;
  lastLogin: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  status: 'active' | 'inactive' | 'trial' | 'suspended';
  plan: 'free' | 'basic' | 'premium';
  createdAt: string;
  trialEndsAt?: string;
  organization?: string;
}

export interface ReleaseModeration {
  id: string;
  releaseId: string;
  moderatorId: string;
  moderatorName: string;
  action: 'approve' | 'reject' | 'edit' | 'comment';
  timestamp: string;
  comments?: string;
  editedContent?: string;
  highlightedSections?: {
    start: number;
    end: number;
    type: 'warning' | 'suggestion' | 'error';
    comment: string;
  }[];
}

export interface ReleaseAnalysis {
  id: string;
  releaseId: string;
  similarityScore: number;
  riskScore: number;
  engagementPrediction: number;
  flaggedTerms: {
    term: string;
    position: number;
    severity: 'low' | 'medium' | 'high';
  }[];
  suggestedAction: 'approve' | 'review' | 'reject';
  reasoning: string;
}

export interface ModeratorPerformance {
  moderatorId: string;
  name: string;
  approvalRate: number;
  responseTime: number;
  accuracyScore: number;
  lastActivity: string;
  totalModerated: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: 'release' | 'monitoring' | 'client' | 'system' | 'report';
  entityId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface MonitoringAlert {
  id: string;
  type: 'spike' | 'competitor' | 'unauthorized' | 'sentiment';
  severity: 'low' | 'medium' | 'high';
  source: string;
  message: string;
  timestamp: string;
  relatedReleaseId?: string;
  metrics?: Record<string, any>;
  isRead: boolean;
  isResolved: boolean;
}

export type AdminRole = 'admin' | 'moderator' | 'supervisor';

export interface RolePermission {
  role: AdminRole;
  permissions: {
    releases: {
      view: boolean;
      approve: boolean;
      reject: boolean;
      edit: boolean;
    };
    monitoring: {
      view: boolean;
      configure: boolean;
      export: boolean;
    };
    clients: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    reports: {
      view: boolean;
      financial: boolean;
      export: boolean;
    };
    system: {
      viewLogs: boolean;
      manageUsers: boolean;
      configureSystem: boolean;
    };
  };
}

// Mock data helper function
export const getMockReleaseAnalysis = (releaseId: string): ReleaseAnalysis => ({
  id: `analysis-${releaseId}`,
  releaseId,
  similarityScore: Math.random() * 100,
  riskScore: Math.random() * 100,
  engagementPrediction: Math.random() * 100,
  flaggedTerms: [
    {
      term: "promocional",
      position: 45,
      severity: "medium" as const
    },
    {
      term: "melhor do mercado",
      position: 120,
      severity: "high" as const
    }
  ],
  suggestedAction: Math.random() > 0.7 ? "approve" as const : Math.random() > 0.5 ? "review" as const : "reject" as const,
  reasoning: "Baseado na análise de conteúdo e similaridade com releases anteriores."
});



export type ClientType = 
  | "observatory"
  | "researcher"
  | "politician"
  | "institution"
  | "journalist"
  | "press";

export interface ClientPermissions {
  canViewReports: boolean;
  canExportData: boolean;
  canManageAlerts: boolean;
  canAccessAnalytics: boolean;
  canInviteUsers: boolean;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  organization?: string;
  permissions: ClientPermissions;
}

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

export const DEFAULT_PERMISSIONS: Record<ClientType, ClientPermissions> = {
  observatory: {
    canViewReports: true,
    canExportData: true,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: true
  },
  researcher: {
    canViewReports: true,
    canExportData: true,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: false
  },
  politician: {
    canViewReports: true,
    canExportData: false,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: true
  },
  institution: {
    canViewReports: true,
    canExportData: true,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: true
  },
  journalist: {
    canViewReports: true,
    canExportData: false,
    canManageAlerts: true,
    canAccessAnalytics: false,
    canInviteUsers: false
  },
  press: {
    canViewReports: true,
    canExportData: false,
    canManageAlerts: true,
    canAccessAnalytics: true,
    canInviteUsers: true
  }
};

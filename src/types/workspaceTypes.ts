
export interface Workspace {
  id: string;
  ownerId: string;
  theme: string;
  customization: {
    logo: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type WorkspaceActionType = "create" | "update" | "delete" | "reset" | "impersonate" | "export";

export interface WorkspaceUpdatePayload {
  theme?: string;
  customization?: {
    logo: string;
  };
}

// Add missing WorkspaceAction type
export interface WorkspaceAction {
  id: string;
  workspaceId: string;
  userId: string;
  action: WorkspaceActionType;
  details: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

// Add missing WorkspaceConfig type
export interface WorkspaceConfig {
  theme: string;
  defaultWidgets: string[];
  limits: {
    monitorings: number;
    releases: number;
    storage: number;
  };
  customization: {
    colors: {
      primary: string;
      secondary: string;
    },
    logo?: string;
  };
}

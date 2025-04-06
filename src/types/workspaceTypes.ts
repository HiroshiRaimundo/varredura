
export interface Workspace {
  id: string;
  userId: string;
  config: WorkspaceConfig;
  createdAt: string;
}

export interface WorkspaceConfig {
  theme: string;
  defaultWidgets: string[];
  limits?: {
    monitorings?: number;
    releases?: number;
    storage?: number;
  };
  customization?: {
    logo?: string;
    colors?: {
      primary?: string;
      secondary?: string;
    };
  };
}

export interface WorkspaceAction {
  id: string;
  workspaceId: string;
  userId: string;
  action: 'create' | 'update' | 'delete' | 'reset' | 'impersonate' | 'export';
  details: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

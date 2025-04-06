
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

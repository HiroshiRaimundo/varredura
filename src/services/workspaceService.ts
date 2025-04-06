
import { Workspace, WorkspaceConfig, WorkspaceAction } from "@/types/workspaceTypes";
import { toast } from "@/hooks/use-toast";

// Local storage keys
const WORKSPACES_KEY = 'app_workspaces';
const WORKSPACE_ACTIONS_KEY = 'app_workspace_actions';

// Load workspaces from localStorage
const loadWorkspacesFromStorage = (): Workspace[] => {
  try {
    const stored = localStorage.getItem(WORKSPACES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading workspaces:", error);
    return [];
  }
};

// Save workspaces to localStorage
const saveWorkspacesToStorage = (workspaces: Workspace[]): void => {
  try {
    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
  } catch (error) {
    console.error("Error saving workspaces:", error);
  }
};

// Load workspace actions from localStorage
const loadActionsFromStorage = (): WorkspaceAction[] => {
  try {
    const stored = localStorage.getItem(WORKSPACE_ACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading workspace actions:", error);
    return [];
  }
};

// Save workspace actions to localStorage
const saveActionsToStorage = (actions: WorkspaceAction[]): void => {
  try {
    localStorage.setItem(WORKSPACE_ACTIONS_KEY, JSON.stringify(actions));
  } catch (error) {
    console.error("Error saving workspace actions:", error);
  }
};

// Initialize from localStorage
let workspaces = loadWorkspacesFromStorage();
let workspaceActions = loadActionsFromStorage();

// Default workspace configuration
const DEFAULT_WORKSPACE_CONFIG: WorkspaceConfig = {
  theme: 'light',
  defaultWidgets: ['releases', 'monitorings', 'alerts'],
  limits: {
    monitorings: 10,
    releases: 20,
    storage: 100 // MB
  },
  customization: {
    colors: {
      primary: '#0f172a',
      secondary: '#6366f1'
    }
  }
};

// Helper to log workspace actions
const logWorkspaceAction = (
  userId: string,
  workspaceId: string,
  action: WorkspaceAction['action'],
  details: Record<string, any>
): void => {
  const newAction: WorkspaceAction = {
    id: crypto.randomUUID(),
    workspaceId,
    userId,
    action,
    details,
    timestamp: new Date().toISOString(),
    ipAddress: '127.0.0.1', // In a real app, this would be the actual IP
    userAgent: navigator.userAgent
  };
  
  workspaceActions = [newAction, ...workspaceActions];
  saveActionsToStorage(workspaceActions);
};

export const workspaceService = {
  // Create a new workspace for a user
  createWorkspace: async (userId: string, initialConfig?: Partial<WorkspaceConfig>): Promise<Workspace> => {
    const existingWorkspace = workspaces.find(w => w.userId === userId);
    if (existingWorkspace) {
      return existingWorkspace; // User already has a workspace
    }
    
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      userId,
      config: {
        ...DEFAULT_WORKSPACE_CONFIG,
        ...initialConfig
      },
      createdAt: new Date().toISOString()
    };
    
    workspaces.push(newWorkspace);
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(userId, newWorkspace.id, 'create', {
      message: 'Workspace created',
      initialConfig
    });
    
    return newWorkspace;
  },
  
  // Get workspace by ID
  getWorkspaceById: async (workspaceId: string): Promise<Workspace | null> => {
    return workspaces.find(w => w.id === workspaceId) || null;
  },
  
  // Get workspace by user ID
  getWorkspaceByUserId: async (userId: string): Promise<Workspace | null> => {
    return workspaces.find(w => w.userId === userId) || null;
  },
  
  // Update workspace configuration
  updateWorkspaceConfig: async (
    workspaceId: string, 
    userId: string,
    updates: Partial<WorkspaceConfig>
  ): Promise<Workspace> => {
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) {
      throw new Error("Workspace não encontrado");
    }
    
    const updatedWorkspace = {
      ...workspaces[workspaceIndex],
      config: {
        ...workspaces[workspaceIndex].config,
        ...updates
      }
    };
    
    workspaces[workspaceIndex] = updatedWorkspace;
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(userId, workspaceId, 'update', {
      message: 'Workspace config updated',
      updates
    });
    
    return updatedWorkspace;
  },
  
  // Reset workspace to default configuration
  resetWorkspace: async (workspaceId: string, userId: string): Promise<Workspace> => {
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) {
      throw new Error("Workspace não encontrado");
    }
    
    const resetWorkspace = {
      ...workspaces[workspaceIndex],
      config: { ...DEFAULT_WORKSPACE_CONFIG }
    };
    
    workspaces[workspaceIndex] = resetWorkspace;
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(userId, workspaceId, 'reset', {
      message: 'Workspace reset to defaults'
    });
    
    return resetWorkspace;
  },
  
  // Get workspace actions/logs
  getWorkspaceActions: async (workspaceId: string): Promise<WorkspaceAction[]> => {
    return workspaceActions.filter(action => action.workspaceId === workspaceId);
  },
  
  // Generate an impersonation token (simulated)
  generateImpersonationToken: async (adminId: string, workspaceId: string): Promise<string> => {
    // In a real app, this would generate a proper JWT with limited permissions
    const fakeToken = btoa(JSON.stringify({
      adminId,
      workspaceId,
      impersonate: true,
      exp: Date.now() + (30 * 60 * 1000) // 30 minutes
    }));
    
    logWorkspaceAction(adminId, workspaceId, 'impersonate', {
      message: 'Admin impersonated client workspace',
      expiresIn: '30 minutes'
    });
    
    return fakeToken;
  },
  
  // Export workspace data
  exportWorkspaceData: async (workspaceId: string, userId: string): Promise<object> => {
    const workspace = await workspaceService.getWorkspaceById(workspaceId);
    if (!workspace) {
      throw new Error("Workspace não encontrado");
    }
    
    // In a real app, this would gather all data related to this workspace
    // Here we're just returning the workspace itself
    const exportData = {
      workspace,
      releases: [], // Would be populated with actual data in a real app
      monitorings: [],
      alerts: []
    };
    
    logWorkspaceAction(userId, workspaceId, 'export', {
      message: 'Workspace data exported'
    });
    
    return exportData;
  }
};

export default workspaceService;


import { Workspace, WorkspaceConfig } from "@/types/workspaceTypes";
import { loadWorkspacesFromStorage, saveWorkspacesToStorage } from "./storageUtils";
import { DEFAULT_WORKSPACE_CONFIG } from "./workspaceDefaults";
import { logWorkspaceAction, getWorkspaceActions } from "./workspaceLogger";

// Initialize from localStorage
let workspaces = loadWorkspacesFromStorage();

export const workspaceOperations = {
  // Get all workspaces
  getAllWorkspaces: async (): Promise<Workspace[]> => {
    return workspaces;
  },
  
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
    const allActions = getWorkspaceActions();
    return allActions.filter(action => action.workspaceId === workspaceId);
  }
};

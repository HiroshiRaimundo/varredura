
import { Workspace, WorkspaceConfig } from "@/types/workspaceTypes";
import { loadWorkspacesFromStorage, saveWorkspacesToStorage } from "./storageUtils";
import { DEFAULT_WORKSPACE_CONFIG } from "./workspaceDefaults";
import { logWorkspaceAction } from "./workspaceLogger";

// Start with initial workspaces from storage
let workspaces = loadWorkspacesFromStorage();

export const workspaceOperations = {
  // Get all workspaces
  getAllWorkspaces: async (): Promise<Workspace[]> => {
    return workspaces;
  },
  
  // Get workspace by ID
  getWorkspaceById: async (id: string): Promise<Workspace | undefined> => {
    return workspaces.find(workspace => workspace.id === id);
  },
  
  // Get workspace by user ID
  getWorkspaceByUserId: async (userId: string): Promise<Workspace | undefined> => {
    return workspaces.find(workspace => workspace.userId === userId);
  },
  
  // Create a new workspace
  createWorkspace: async (userId: string, name: string): Promise<Workspace> => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      userId,
      name,
      config: DEFAULT_WORKSPACE_CONFIG,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    workspaces = [...workspaces, newWorkspace];
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(
      userId,
      newWorkspace.id,
      'create_workspace',
      { name }
    );
    
    return newWorkspace;
  },
  
  // Update workspace
  updateWorkspace: async (id: string, userId: string, updates: Partial<Workspace>): Promise<Workspace | undefined> => {
    const workspaceIndex = workspaces.findIndex(workspace => workspace.id === id);
    
    if (workspaceIndex === -1) {
      return undefined;
    }
    
    // Only allow updating certain fields
    const allowedUpdates = {
      name: updates.name,
      config: updates.config,
      updatedAt: new Date().toISOString()
    };
    
    // Update the workspace
    const updatedWorkspace = {
      ...workspaces[workspaceIndex],
      ...allowedUpdates
    };
    
    workspaces = [
      ...workspaces.slice(0, workspaceIndex),
      updatedWorkspace,
      ...workspaces.slice(workspaceIndex + 1)
    ];
    
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(
      userId,
      id,
      'update_workspace',
      updates
    );
    
    return updatedWorkspace;
  },
  
  // Reset workspace to default configuration
  resetWorkspaceConfig: async (id: string, userId: string): Promise<Workspace | undefined> => {
    const workspaceIndex = workspaces.findIndex(workspace => workspace.id === id);
    
    if (workspaceIndex === -1) {
      return undefined;
    }
    
    // Reset only the config to default
    const resetWorkspace = {
      ...workspaces[workspaceIndex],
      config: DEFAULT_WORKSPACE_CONFIG,
      updatedAt: new Date().toISOString()
    };
    
    workspaces = [
      ...workspaces.slice(0, workspaceIndex),
      resetWorkspace,
      ...workspaces.slice(workspaceIndex + 1)
    ];
    
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(
      userId,
      id,
      'reset_workspace',
      { message: 'Reset to default configuration' }
    );
    
    return resetWorkspace;
  },
  
  // Delete workspace
  deleteWorkspace: async (id: string, userId: string): Promise<boolean> => {
    const workspaceIndex = workspaces.findIndex(workspace => workspace.id === id);
    
    if (workspaceIndex === -1) {
      return false;
    }
    
    workspaces = [
      ...workspaces.slice(0, workspaceIndex),
      ...workspaces.slice(workspaceIndex + 1)
    ];
    
    saveWorkspacesToStorage(workspaces);
    
    logWorkspaceAction(
      userId,
      id,
      'delete_workspace',
      { message: 'Workspace deleted' }
    );
    
    return true;
  }
};

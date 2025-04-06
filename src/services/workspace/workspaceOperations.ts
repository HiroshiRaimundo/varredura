
import { Workspace, WorkspaceActionType, WorkspaceUpdatePayload } from '@/types/workspaceTypes';
import { logWorkspaceAction } from './workspaceLogger';
import { getDefaultWorkspaceSettings } from './workspaceDefaults';
import { validateWorkspaceData } from './workspaceUtils';

// Create a new workspace
export const createWorkspace = async (userId: string): Promise<Workspace> => {
  try {
    // In a real app, this would interact with a database
    const workspaceId = `workspace_${Date.now()}`;
    const defaultSettings = getDefaultWorkspaceSettings();
    
    // Create workspace with default settings
    const workspace: Workspace = {
      id: workspaceId,
      ownerId: userId,
      theme: defaultSettings.theme,
      customization: defaultSettings.customization,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    localStorage.setItem(`workspace_${workspaceId}`, JSON.stringify(workspace));
    
    // Log action
    logWorkspaceAction("create", {
      userId,
      workspaceId,
      details: "Workspace created with default settings"
    });
    
    return workspace;
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw new Error("Failed to create workspace");
  }
};

// Update workspace settings
export const updateWorkspace = async (
  id: string, 
  userId: string, 
  payload: WorkspaceUpdatePayload
): Promise<Workspace> => {
  try {
    // Validate update data
    validateWorkspaceData(payload);
    
    // Get current workspace data
    const storedData = localStorage.getItem(`workspace_${id}`);
    if (!storedData) {
      throw new Error("Workspace not found");
    }
    
    const workspace: Workspace = JSON.parse(storedData);
    
    // Check ownership
    if (workspace.ownerId !== userId) {
      throw new Error("Unauthorized to update this workspace");
    }
    
    // Update workspace with new data
    const updatedWorkspace: Workspace = {
      ...workspace,
      ...(payload.theme && { theme: payload.theme }),
      ...(payload.customization && { customization: payload.customization }),
      updatedAt: new Date().toISOString()
    };
    
    // Save updated workspace
    localStorage.setItem(`workspace_${id}`, JSON.stringify(updatedWorkspace));
    
    // Log action
    logWorkspaceAction("update", {
      userId,
      workspaceId: id,
      details: "Workspace settings updated"
    });
    
    return updatedWorkspace;
  } catch (error) {
    console.error("Error updating workspace:", error);
    throw new Error("Failed to update workspace");
  }
};

// Reset workspace to default settings
export const resetWorkspace = async (id: string, userId: string): Promise<Workspace> => {
  try {
    // Get current workspace data
    const storedData = localStorage.getItem(`workspace_${id}`);
    if (!storedData) {
      throw new Error("Workspace not found");
    }
    
    const workspace: Workspace = JSON.parse(storedData);
    
    // Check ownership
    if (workspace.ownerId !== userId) {
      throw new Error("Unauthorized to reset this workspace");
    }
    
    // Get default settings
    const defaultSettings = getDefaultWorkspaceSettings();
    
    // Reset workspace to default settings
    const resetWorkspace: Workspace = {
      ...workspace,
      theme: defaultSettings.theme,
      customization: defaultSettings.customization,
      updatedAt: new Date().toISOString()
    };
    
    // Save reset workspace
    localStorage.setItem(`workspace_${id}`, JSON.stringify(resetWorkspace));
    
    // Log action
    logWorkspaceAction("reset", {
      userId,
      workspaceId: id,
      details: "Workspace reset to default settings"
    });
    
    return resetWorkspace;
  } catch (error) {
    console.error("Error resetting workspace:", error);
    throw new Error("Failed to reset workspace");
  }
};

// Delete workspace
export const deleteWorkspace = async (id: string, userId: string): Promise<void> => {
  try {
    // Get current workspace data
    const storedData = localStorage.getItem(`workspace_${id}`);
    if (!storedData) {
      throw new Error("Workspace not found");
    }
    
    const workspace: Workspace = JSON.parse(storedData);
    
    // Check ownership
    if (workspace.ownerId !== userId) {
      throw new Error("Unauthorized to delete this workspace");
    }
    
    // Remove workspace from storage
    localStorage.removeItem(`workspace_${id}`);
    
    // Log action
    logWorkspaceAction("delete", {
      userId,
      workspaceId: id,
      details: "Workspace deleted"
    });
  } catch (error) {
    console.error("Error deleting workspace:", error);
    throw new Error("Failed to delete workspace");
  }
};

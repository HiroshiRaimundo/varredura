
import { Workspace, WorkspaceUpdatePayload } from "@/types/workspaceTypes";
import { getDefaultWorkspaceSettings } from "./workspaceDefaults";
import { logWorkspaceAction } from "./workspaceLogger";
import { saveWorkspacesToStorage, loadWorkspacesFromStorage } from "./storageUtils";

// Create a new workspace
export const createWorkspace = async (ownerId: string): Promise<Workspace> => {
  const now = new Date().toISOString();
  const defaultSettings = getDefaultWorkspaceSettings();
  
  const newWorkspace: Workspace = {
    id: crypto.randomUUID(),
    ownerId,
    theme: defaultSettings.theme,
    customization: defaultSettings.customization,
    createdAt: now,
    updatedAt: now
  };
  
  // Simulate API call with timeout
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Save to storage/database
  const workspaces = loadWorkspacesFromStorage();
  workspaces.push(newWorkspace);
  saveWorkspacesToStorage(workspaces);
  
  // Log action
  logWorkspaceAction("create", {
    userId: ownerId,
    workspaceId: newWorkspace.id,
    details: { message: "Workspace created" }
  });
  
  return newWorkspace;
};

// Update an existing workspace
export const updateWorkspace = async (
  workspaceId: string,
  userId: string,
  data: WorkspaceUpdatePayload
): Promise<Workspace> => {
  // Retrieve workspaces
  const workspaces = loadWorkspacesFromStorage();
  const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
  
  if (workspaceIndex === -1) {
    throw new Error("Workspace not found");
  }
  
  // Update the workspace
  const updatedWorkspace = {
    ...workspaces[workspaceIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  workspaces[workspaceIndex] = updatedWorkspace;
  saveWorkspacesToStorage(workspaces);
  
  // Log action
  logWorkspaceAction("update", {
    userId,
    workspaceId,
    details: { message: "Workspace updated", changes: data }
  });
  
  return updatedWorkspace;
};

// Reset workspace to default settings
export const resetWorkspace = async (
  workspaceId: string,
  userId: string
): Promise<Workspace> => {
  // Get workspaces
  const workspaces = loadWorkspacesFromStorage();
  const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
  
  if (workspaceIndex === -1) {
    throw new Error("Workspace not found");
  }
  
  const defaultSettings = getDefaultWorkspaceSettings();
  
  // Update with default settings
  const resetWorkspace = {
    ...workspaces[workspaceIndex],
    theme: defaultSettings.theme,
    customization: defaultSettings.customization,
    updatedAt: new Date().toISOString()
  };
  
  workspaces[workspaceIndex] = resetWorkspace;
  saveWorkspacesToStorage(workspaces);
  
  // Log action
  logWorkspaceAction("reset", {
    userId,
    workspaceId,
    details: { message: "Workspace reset to defaults" }
  });
  
  return resetWorkspace;
};

// Delete a workspace
export const deleteWorkspace = async (
  workspaceId: string,
  userId: string
): Promise<void> => {
  // Get workspaces
  const workspaces = loadWorkspacesFromStorage();
  const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
  
  if (workspaceIndex === -1) {
    throw new Error("Workspace not found");
  }
  
  // Remove the workspace
  workspaces.splice(workspaceIndex, 1);
  saveWorkspacesToStorage(workspaces);
  
  // Log action
  logWorkspaceAction("delete", {
    userId,
    workspaceId,
    details: { message: "Workspace deleted" }
  });
};

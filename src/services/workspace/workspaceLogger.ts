
import { WorkspaceAction } from "@/types/workspaceTypes";
import { loadActionsFromStorage, saveActionsToStorage } from "./storageUtils";

// Get current workspace actions
let workspaceActions = loadActionsFromStorage();

// Helper to log workspace actions
export const logWorkspaceAction = (
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

export const getWorkspaceActions = (): WorkspaceAction[] => {
  return workspaceActions;
};

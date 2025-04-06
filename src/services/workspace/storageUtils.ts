
import { Workspace, WorkspaceAction } from "@/types/workspaceTypes";

// Local storage keys
const WORKSPACES_KEY = 'app_workspaces';
const WORKSPACE_ACTIONS_KEY = 'app_workspace_actions';

// Load workspaces from localStorage
export const loadWorkspacesFromStorage = (): Workspace[] => {
  try {
    const stored = localStorage.getItem(WORKSPACES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading workspaces:", error);
    return [];
  }
};

// Save workspaces to localStorage
export const saveWorkspacesToStorage = (workspaces: Workspace[]): void => {
  try {
    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
  } catch (error) {
    console.error("Error saving workspaces:", error);
  }
};

// Load workspace actions from localStorage
export const loadActionsFromStorage = (): WorkspaceAction[] => {
  try {
    const stored = localStorage.getItem(WORKSPACE_ACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading workspace actions:", error);
    return [];
  }
};

// Save workspace actions to localStorage
export const saveActionsToStorage = (actions: WorkspaceAction[]): void => {
  try {
    localStorage.setItem(WORKSPACE_ACTIONS_KEY, JSON.stringify(actions));
  } catch (error) {
    console.error("Error saving workspace actions:", error);
  }
};

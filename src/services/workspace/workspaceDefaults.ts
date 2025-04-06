
import { WorkspaceConfig } from "@/types/workspaceTypes";

// Default workspace configuration
export const DEFAULT_WORKSPACE_CONFIG: WorkspaceConfig = {
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

// Add the missing getDefaultWorkspaceSettings function
export const getDefaultWorkspaceSettings = () => {
  return {
    theme: DEFAULT_WORKSPACE_CONFIG.theme,
    customization: {
      logo: 'default-logo.png',
      colors: DEFAULT_WORKSPACE_CONFIG.customization.colors
    }
  };
};


import { workspaceOperations } from "./workspaceOperations";
import { workspaceUtils } from "./workspaceUtils";

// Create a combined service object that exposes all functionality
export const workspaceService = {
  ...workspaceOperations,
  
  // Add utilities
  generateImpersonationToken: workspaceUtils.generateImpersonationToken,
  
  exportWorkspaceData: async (workspaceId: string, userId: string): Promise<object> => {
    return workspaceUtils.exportWorkspaceData(workspaceId, userId, workspaceOperations.getWorkspaceById);
  }
};

export default workspaceService;

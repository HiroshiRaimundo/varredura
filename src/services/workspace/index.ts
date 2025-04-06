
import {
  createWorkspace,
  updateWorkspace,
  resetWorkspace,
  deleteWorkspace
} from './workspaceOperations';

import {
  getWorkspaceByUserId,
  getWorkspaceById,
  generateImpersonationToken,
  exportWorkspaceData
} from './workspaceUtils';

// Create a combined service object that exposes all functionality
export const workspaceService = {
  createWorkspace,
  updateWorkspace,
  resetWorkspace,
  deleteWorkspace,
  getWorkspaceByUserId,
  getWorkspaceById,
  generateImpersonationToken,
  exportWorkspaceData
};

export default workspaceService;

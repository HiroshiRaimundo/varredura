
import { createWorkspace, updateWorkspace, resetWorkspace, deleteWorkspace } from './workspace/workspaceOperations';
import { getWorkspaceByUserId, getWorkspaceById } from './workspace/workspaceUtils';
import { generateImpersonationToken } from './workspace/workspaceUtils';
import { exportWorkspaceData } from './workspace/workspaceUtils';

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

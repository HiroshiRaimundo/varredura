
import { workspaceService as service } from './workspace';

export const workspaceService = {
  createWorkspace: service.createWorkspace,
  updateWorkspace: service.updateWorkspace,
  resetWorkspace: service.resetWorkspace,
  deleteWorkspace: service.deleteWorkspace,
  getWorkspaceByUserId: service.getWorkspaceByUserId,
  getWorkspaceById: service.getWorkspaceById,
  generateImpersonationToken: service.generateImpersonationToken,
  exportWorkspaceData: service.exportWorkspaceData
};

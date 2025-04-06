
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth';
import { workspaceService } from '@/services/workspaceService';
import { Workspace, WorkspaceUpdatePayload } from '@/types/workspaceTypes';

const WorkspaceManagement: React.FC = () => {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load workspace data
  const loadWorkspaceData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await workspaceService.getWorkspaceByUserId(user.email);
      setWorkspace(data);
    } catch (error) {
      console.error("Error loading workspace data:", error);
      toast({
        title: "Error",
        description: "Failed to load workspace settings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update workspace theme
  const updateWorkspaceTheme = async () => {
    if (!user || !workspace) return;
    
    setIsLoading(true);
    try {
      const themeUpdate: WorkspaceUpdatePayload = {
        theme: "dark",
        customization: {
          logo: "custom-logo.png" 
        }
      };
      
      await workspaceService.updateWorkspace(workspace.id, user.email, themeUpdate);
      
      toast({
        title: "Success",
        description: "Workspace theme updated successfully",
      });
      
      // Reload workspace data
      loadWorkspaceData();
    } catch (error) {
      console.error("Error updating workspace theme:", error);
      toast({
        title: "Error",
        description: "Failed to update workspace theme",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset workspace to defaults
  const handleResetWorkspace = async () => {
    if (!user || !workspace) return;
    
    if (!confirm("Are you sure you want to reset the workspace to default settings?")) {
      return;
    }
    
    setIsLoading(true);
    try {
      await workspaceService.resetWorkspace(workspace.id, user.email);
      
      toast({
        title: "Success",
        description: "Workspace reset to default settings",
      });
      
      // Reload workspace data
      loadWorkspaceData();
    } catch (error) {
      console.error("Error resetting workspace:", error);
      toast({
        title: "Error",
        description: "Failed to reset workspace",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // React hook to load workspace data on component mount
  React.useEffect(() => {
    loadWorkspaceData();
  }, [user]);
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Workspace Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p><strong>Current Theme:</strong> {workspace?.theme || "Default"}</p>
              <p><strong>Last Updated:</strong> {workspace?.updatedAt ? new Date(workspace.updatedAt).toLocaleString() : "Never"}</p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={updateWorkspaceTheme} disabled={isLoading}>
                Update Theme
              </Button>
              
              <Button onClick={handleResetWorkspace} variant="destructive" disabled={isLoading}>
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Advanced Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>These actions are for advanced administrators only.</p>
            
            <div className="space-y-2">
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Export Initiated",
                    description: "Workspace data export has started"
                  });
                }}
                disabled={isLoading}
              >
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceManagement;

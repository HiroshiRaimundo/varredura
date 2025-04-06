
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth';
import { workspaceService } from '@/services/workspaceService';
import { Workspace, WorkspaceUpdatePayload } from '@/types/workspaceTypes';
import { useLocation } from 'react-router-dom';

const WorkspaceManagement: React.FC = () => {
  const { user, impersonateClient, isImpersonating, exitImpersonation } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const isImpersonatePage = location.pathname === '/admin/impersonate';
  
  // Load workspace data
  const loadWorkspaceData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await workspaceService.getWorkspaceByUserId(user.email);
      setWorkspace(data);
      
      if (!data && user.email) {
        // If there's no workspace for the user, create one
        const newWorkspace = await workspaceService.createWorkspace(user.email);
        setWorkspace(newWorkspace);
        toast({
          title: "Workspace criado",
          description: "Um novo workspace foi criado para você",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados do workspace:", error);
      toast({
        title: "Erro",
        description: "Falha ao carregar configurações do workspace",
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
        theme: workspace.theme === 'dark' ? 'light' : 'dark',
        customization: {
          logo: workspace.theme === 'dark' ? 'light-logo.png' : 'dark-logo.png' 
        }
      };
      
      const updated = await workspaceService.updateWorkspace(workspace.id, user.email, themeUpdate);
      setWorkspace(updated);
      
      toast({
        title: "Sucesso",
        description: `Tema atualizado para ${themeUpdate.theme}`,
      });
    } catch (error) {
      console.error("Erro ao atualizar tema do workspace:", error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar tema do workspace",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset workspace to defaults
  const handleResetWorkspace = async () => {
    if (!user || !workspace) return;
    
    if (!confirm("Tem certeza que deseja resetar o workspace para as configurações padrão?")) {
      return;
    }
    
    setIsLoading(true);
    try {
      const reset = await workspaceService.resetWorkspace(workspace.id, user.email);
      setWorkspace(reset);
      
      toast({
        title: "Sucesso",
        description: "Workspace resetado para configurações padrão",
      });
    } catch (error) {
      console.error("Erro ao resetar workspace:", error);
      toast({
        title: "Erro",
        description: "Falha ao resetar workspace",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle impersonation
  const handleImpersonateClient = async () => {
    if (!user) return;
    
    const clientId = prompt("Digite o ID do cliente que você deseja impersonar:");
    if (!clientId) return;
    
    try {
      await impersonateClient(clientId);
    } catch (error) {
      console.error("Erro ao impersonar cliente:", error);
      toast({
        title: "Erro",
        description: "Falha ao impersonar cliente",
        variant: "destructive"
      });
    }
  };
  
  // Export workspace data
  const handleExportData = async () => {
    if (!user || !workspace) return;
    
    setIsLoading(true);
    try {
      const data = await workspaceService.exportWorkspaceData(workspace.id, user.email);
      
      // Create a JSON file for download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `workspace-${workspace.id}-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Exportação iniciada",
        description: "Os dados do workspace estão sendo baixados"
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro",
        description: "Falha ao exportar dados do workspace",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // React hook to load workspace data on component mount
  useEffect(() => {
    loadWorkspaceData();
  }, [user]);
  
  // Determine which view to render based on the current path
  const renderContent = () => {
    if (isImpersonatePage) {
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Visualizar como Cliente</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Impersonação de Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Esta ferramenta permite visualizar a interface como um cliente específico.</p>
              
              {isImpersonating ? (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-100 text-amber-800 rounded-md">
                    <p className="font-medium">Você está atualmente visualizando como cliente</p>
                    <p className="text-sm">Todas as ações estão em modo somente leitura</p>
                  </div>
                  
                  <Button onClick={exitImpersonation} variant="destructive">
                    Sair do modo de visualização
                  </Button>
                </div>
              ) : (
                <Button onClick={handleImpersonateClient} disabled={isLoading}>
                  Impersonar Cliente
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }
    
    // Default workspace management view
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Workspace</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Workspace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p><strong>Tema Atual:</strong> {workspace?.theme || "Padrão"}</p>
                <p><strong>Última Atualização:</strong> {workspace?.updatedAt ? new Date(workspace.updatedAt).toLocaleString() : "Nunca"}</p>
              </div>
              
              <div className="space-y-2">
                <Button onClick={updateWorkspaceTheme} disabled={isLoading}>
                  {workspace?.theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
                </Button>
                
                <Button onClick={handleResetWorkspace} variant="destructive" disabled={isLoading}>
                  Resetar para Padrões
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Estas ações são apenas para administradores avançados.</p>
              
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  onClick={handleExportData}
                  disabled={isLoading}
                >
                  Exportar Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      {renderContent()}
    </div>
  );
};

export default WorkspaceManagement;

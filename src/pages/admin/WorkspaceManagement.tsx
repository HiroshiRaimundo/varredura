
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { workspaceService } from '@/services/workspaceService';
import { Workspace, ServiceType } from '@/types/workspaceTypes';
import { Eye, UserPlus, RotateCcw, Database, Settings } from 'lucide-react';

const WorkspaceManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('settings');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  // Determinar qual aba mostrar com base na rota
  useEffect(() => {
    if (location.pathname.includes('impersonate')) {
      setActiveTab('impersonate');
    } else if (location.pathname.includes('reset')) {
      setActiveTab('reset');
    } else if (location.pathname.includes('raw-data')) {
      setActiveTab('raw-data');
    } else {
      setActiveTab('settings');
    }
  }, [location.pathname]);

  // Carregar workspaces (simulado)
  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        // Criar alguns workspaces de exemplo para demonstração
        if (!localStorage.getItem('app_workspaces')) {
          // Criar alguns clientes de exemplo se não existirem
          const demoClients = [
            { id: '101', name: 'Observatório Brasil', email: 'obs@exemplo.com', type: 'observatory' as ServiceType },
            { id: '102', name: 'Prefeitura de São Paulo', email: 'prefeitura@exemplo.com', type: 'institution' as ServiceType },
            { id: '103', name: 'Senador João Silva', email: 'joao@senado.gov', type: 'politician' as ServiceType },
            { id: '104', name: 'Instituto de Pesquisa XYZ', email: 'pesquisa@xyz.org', type: 'researcher' as ServiceType },
            { id: '105', name: 'Jornal Diário', email: 'redacao@diario.com', type: 'press' as ServiceType }
          ];

          // Criar um workspace para cada cliente
          for (const client of demoClients) {
            await workspaceService.createWorkspace(client.id, {
              theme: client.type === 'institution' ? 'blue' : 'light',
              customization: {
                logo: client.type === 'press' ? '/logo-press.png' : undefined
              }
            });
          }
        }

        // Carregar todos os workspaces
        const allWorkspaces = await Promise.all(
          (await workspaceService.getAllWorkspaces()).map(async workspace => {
            return workspace;
          })
        );

        setWorkspaces(allWorkspaces);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar workspaces:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os workspaces dos clientes",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    loadWorkspaces();
  }, []);

  // Função para impersonar cliente
  const handleImpersonate = async (workspace: Workspace) => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Aqui seria gerado um token de impersonation real
      await workspaceService.generateImpersonationToken(user.email, workspace.id);
      
      // Redirecionando para a área do cliente
      navigate(`/dashboard?impersonate=${workspace.userId}`);
      
      toast({
        title: "Visualizando como cliente",
        description: `Você está visualizando a área do cliente ${workspace.userId} em modo somente leitura.`
      });
    } catch (error) {
      console.error("Erro ao impersonar cliente:", error);
      toast({
        title: "Erro",
        description: "Não foi possível visualizar como cliente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para resetar workspace
  const handleResetWorkspace = async (workspace: Workspace) => {
    if (!user) return;
    
    try {
      setLoading(true);
      await workspaceService.resetWorkspace(workspace.id, user.email);
      
      // Atualizar a lista de workspaces
      const updatedWorkspaces = workspaces.map(w => 
        w.id === workspace.id 
          ? { ...w, config: { ...w.config, theme: 'light', defaultWidgets: ['releases', 'monitorings', 'alerts'] } } 
          : w
      );
      
      setWorkspaces(updatedWorkspaces);
      
      toast({
        title: "Workspace resetado",
        description: `As configurações do cliente ${workspace.userId} foram restauradas para o padrão.`
      });
    } catch (error) {
      console.error("Erro ao resetar workspace:", error);
      toast({
        title: "Erro",
        description: "Não foi possível resetar o workspace",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar dados
  const handleExportData = async (workspace: Workspace) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await workspaceService.exportWorkspaceData(workspace.id, user.email);
      
      // Em uma aplicação real, isso poderia gerar um arquivo para download
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workspace-${workspace.id}-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Dados exportados",
        description: `Os dados do cliente ${workspace.userId} foram exportados com sucesso.`
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro",
        description: "Não foi possível exportar os dados do workspace",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Workspace</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="impersonate">Visualizar como Cliente</TabsTrigger>
            <TabsTrigger value="reset">Resetar Workspace</TabsTrigger>
            <TabsTrigger value="raw-data">Dados Crus</TabsTrigger>
          </TabsList>
          
          {/* Aba de Configurações */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Workspace</CardTitle>
                <CardDescription>
                  Gerencie as configurações dos workspaces dos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {loading ? (
                    <p>Carregando workspaces...</p>
                  ) : (
                    workspaces.map(workspace => (
                      <div key={workspace.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Cliente ID: {workspace.userId}</h3>
                            <p className="text-sm text-muted-foreground">
                              Criado em: {new Date(workspace.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => setSelectedWorkspace(workspace)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Aba de Impersonation */}
          <TabsContent value="impersonate">
            <Card>
              <CardHeader>
                <CardTitle>Visualizar como Cliente</CardTitle>
                <CardDescription>
                  Acesse a área do cliente para ver exatamente o que ele vê
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {loading ? (
                    <p>Carregando clientes...</p>
                  ) : (
                    workspaces.map(workspace => (
                      <div key={workspace.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Cliente ID: {workspace.userId}</h3>
                            <p className="text-sm text-muted-foreground">
                              Workspace ID: {workspace.id}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => handleImpersonate(workspace)}
                            disabled={loading}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Visualização em modo somente leitura. Você não poderá fazer alterações.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Aba de Reset */}
          <TabsContent value="reset">
            <Card>
              <CardHeader>
                <CardTitle>Resetar Workspace</CardTitle>
                <CardDescription>
                  Restaure as configurações padrão para o workspace de um cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {loading ? (
                    <p>Carregando workspaces...</p>
                  ) : (
                    workspaces.map(workspace => (
                      <div key={workspace.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Cliente ID: {workspace.userId}</h3>
                            <p className="text-sm text-muted-foreground">
                              Configuração: Tema {workspace.config.theme}, 
                              {workspace.config.defaultWidgets.length} widgets
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => handleResetWorkspace(workspace)}
                            disabled={loading}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Resetar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground text-red-500">
                  Atenção: Esta ação irá restaurar todas as configurações para o padrão. Esta ação não pode ser desfeita.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Aba de Dados Crus */}
          <TabsContent value="raw-data">
            <Card>
              <CardHeader>
                <CardTitle>Dados Crus</CardTitle>
                <CardDescription>
                  Exporte todos os dados relacionados ao workspace de um cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {loading ? (
                    <p>Carregando workspaces...</p>
                  ) : (
                    workspaces.map(workspace => (
                      <div key={workspace.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Cliente ID: {workspace.userId}</h3>
                            <p className="text-sm text-muted-foreground">
                              Workspace ID: {workspace.id}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => handleExportData(workspace)}
                            disabled={loading}
                          >
                            <Database className="h-4 w-4 mr-2" />
                            Exportar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Os dados serão exportados em formato JSON.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceManagement;

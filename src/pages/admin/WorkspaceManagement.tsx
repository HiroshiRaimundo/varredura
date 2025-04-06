
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, FileDown, RotateCcw, Settings, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { workspaceService } from "@/services/workspaceService";
import { Workspace, WorkspaceAction } from "@/types/workspaceTypes";
import { Client } from "@/services/clientService";
import BackToAdminButton from "@/components/admin/BackToAdminButton";

const WorkspaceManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [workspaceActions, setWorkspaceActions] = useState<WorkspaceAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  
  // Dialogs state
  const [isImpersonateDialogOpen, setIsImpersonateDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [impersonationToken, setImpersonationToken] = useState("");
  
  // Form state for workspace settings
  const [workspaceConfig, setWorkspaceConfig] = useState({
    theme: "light",
    enableAlerts: true,
    maxMonitorings: 10,
    maxReleases: 20,
    customLogo: "",
    customCss: ""
  });
  
  // Load clients and selected client workspace
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const mockClients: Client[] = [
          {
            id: "1",
            name: "Observatório Nacional",
            email: "observatorio@example.com",
            serviceType: "observatory",
            status: "active",
            createdAt: new Date()
          },
          {
            id: "2",
            name: "Imprensa Federal",
            email: "imprensa@example.com",
            serviceType: "press",
            status: "active",
            createdAt: new Date()
          }
        ];
        
        setClients(mockClients);
        
        // If we have a client selected, load its workspace
        if (selectedClient) {
          const clientWorkspace = await workspaceService.getWorkspaceByUserId(selectedClient.id);
          setWorkspace(clientWorkspace);
          
          if (clientWorkspace) {
            // Load workspace actions
            const actions = await workspaceService.getWorkspaceActions(clientWorkspace.id);
            setWorkspaceActions(actions);
            
            // Set form state from workspace config
            setWorkspaceConfig({
              theme: clientWorkspace.config.theme,
              enableAlerts: clientWorkspace.config.defaultWidgets.includes("alerts"),
              maxMonitorings: clientWorkspace.config.limits?.monitorings || 10,
              maxReleases: clientWorkspace.config.limits?.releases || 20,
              customLogo: clientWorkspace.config.customization?.logo || "",
              customCss: JSON.stringify(clientWorkspace.config.customization?.colors || {}, null, 2)
            });
          }
        }
      } catch (error) {
        console.error("Error loading workspace data:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do workspace.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [selectedClient]);
  
  // Select a client and create workspace if needed
  const handleSelectClient = async (client: Client) => {
    setSelectedClient(client);
    
    try {
      let clientWorkspace = await workspaceService.getWorkspaceByUserId(client.id);
      
      if (!clientWorkspace) {
        clientWorkspace = await workspaceService.createWorkspace(client.id);
        toast({
          title: "Workspace criado",
          description: `Um novo workspace foi criado para ${client.name}.`
        });
      }
      
      setWorkspace(clientWorkspace);
      setActiveTab("settings");
    } catch (error) {
      console.error("Error selecting client:", error);
      toast({
        title: "Erro ao selecionar cliente",
        description: "Não foi possível carregar o workspace do cliente.",
        variant: "destructive"
      });
    }
  };
  
  // Save workspace configuration
  const handleSaveConfig = async () => {
    if (!workspace || !user) return;
    
    try {
      const updatedWorkspace = await workspaceService.updateWorkspaceConfig(
        workspace.id,
        user.email,
        {
          theme: workspaceConfig.theme,
          defaultWidgets: [
            "releases", 
            "monitorings", 
            ...(workspaceConfig.enableAlerts ? ["alerts"] : [])
          ],
          limits: {
            monitorings: workspaceConfig.maxMonitorings,
            releases: workspaceConfig.maxReleases
          },
          customization: {
            logo: workspaceConfig.customLogo,
            colors: workspaceConfig.customCss ? JSON.parse(workspaceConfig.customCss) : undefined
          }
        }
      );
      
      setWorkspace(updatedWorkspace);
      toast({
        title: "Configurações salvas",
        description: "As configurações do workspace foram atualizadas com sucesso."
      });
    } catch (error) {
      console.error("Error saving workspace config:", error);
      toast({
        title: "Erro ao salvar configurações",
        description: "Não foi possível atualizar as configurações do workspace.",
        variant: "destructive"
      });
    }
  };
  
  // Reset workspace to defaults
  const handleResetWorkspace = async () => {
    if (!workspace || !user) return;
    
    try {
      const resetWorkspace = await workspaceService.resetWorkspace(workspace.id, user.email);
      setWorkspace(resetWorkspace);
      setIsResetDialogOpen(false);
      toast({
        title: "Workspace redefinido",
        description: "O workspace foi redefinido para as configurações padrão."
      });
    } catch (error) {
      console.error("Error resetting workspace:", error);
      toast({
        title: "Erro ao redefinir workspace",
        description: "Não foi possível redefinir o workspace.",
        variant: "destructive"
      });
    }
  };
  
  // Generate impersonation token
  const handleImpersonate = async () => {
    if (!workspace || !user) return;
    
    try {
      const token = await workspaceService.generateImpersonationToken(user.email, workspace.id);
      setImpersonationToken(token);
      setIsImpersonateDialogOpen(true);
    } catch (error) {
      console.error("Error generating impersonation token:", error);
      toast({
        title: "Erro ao gerar token",
        description: "Não foi possível gerar o token de impersonation.",
        variant: "destructive"
      });
    }
  };
  
  // Export workspace data
  const handleExportData = async () => {
    if (!workspace || !user) return;
    
    try {
      const data = await workspaceService.exportWorkspaceData(workspace.id, user.email);
      
      // Create and download a JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `workspace-${workspace.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Dados exportados",
        description: "Os dados do workspace foram exportados com sucesso."
      });
    } catch (error) {
      console.error("Error exporting workspace data:", error);
      toast({
        title: "Erro ao exportar dados",
        description: "Não foi possível exportar os dados do workspace.",
        variant: "destructive"
      });
    }
  };
  
  // View workspace as client
  const handleViewAsClient = async () => {
    if (!selectedClient) return;
    
    // In a real app, this would use JWT impersonation
    // For now, we just navigate to the client dashboard
    navigate(`/dashboard?impersonate=${selectedClient.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Workspaces</CardTitle>
          <CardDescription>
            Configure e gerencie os ambientes de trabalho dos clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="font-medium">Selecione um Cliente</div>
              <div className="space-y-2">
                {clients.map((client) => (
                  <Button
                    key={client.id}
                    variant={selectedClient?.id === client.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelectClient(client)}
                  >
                    {client.name}
                  </Button>
                ))}
              </div>
              
              {selectedClient && workspace && (
                <div className="space-y-4 mt-6">
                  <div className="font-medium">Ações Rápidas</div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleViewAsClient}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar como Cliente
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleImpersonate}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Gerar Token de Acesso
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsResetDialogOpen(true)}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resetar Workspace
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleExportData}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Exportar Dados
                  </Button>
                </div>
              )}
            </div>
            
            <div className="md:col-span-3">
              {selectedClient && workspace ? (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="settings">Configurações</TabsTrigger>
                    <TabsTrigger value="activity">Atividade</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Configurações do Workspace</CardTitle>
                        <CardDescription>
                          Configure os parâmetros do workspace do cliente {selectedClient.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="theme">Tema</Label>
                            <select
                              id="theme"
                              className="w-full rounded-md border border-input p-2"
                              value={workspaceConfig.theme}
                              onChange={(e) => setWorkspaceConfig({...workspaceConfig, theme: e.target.value})}
                            >
                              <option value="light">Claro</option>
                              <option value="dark">Escuro</option>
                              <option value="system">Sistema</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2 flex items-center">
                            <div className="flex-1">
                              <Label htmlFor="enableAlerts">Alertas Habilitados</Label>
                            </div>
                            <Switch
                              id="enableAlerts"
                              checked={workspaceConfig.enableAlerts}
                              onCheckedChange={(checked) => setWorkspaceConfig({...workspaceConfig, enableAlerts: checked})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="maxMonitorings">Limite de Monitoramentos</Label>
                            <Input
                              id="maxMonitorings"
                              type="number"
                              min="1"
                              value={workspaceConfig.maxMonitorings}
                              onChange={(e) => setWorkspaceConfig({...workspaceConfig, maxMonitorings: parseInt(e.target.value)})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="maxReleases">Limite de Releases</Label>
                            <Input
                              id="maxReleases"
                              type="number"
                              min="1"
                              value={workspaceConfig.maxReleases}
                              onChange={(e) => setWorkspaceConfig({...workspaceConfig, maxReleases: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="customLogo">URL do Logo Personalizado</Label>
                          <Input
                            id="customLogo"
                            placeholder="https://example.com/logo.png"
                            value={workspaceConfig.customLogo}
                            onChange={(e) => setWorkspaceConfig({...workspaceConfig, customLogo: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="customCss">Cores Personalizadas (JSON)</Label>
                          <Textarea
                            id="customCss"
                            rows={6}
                            placeholder='{ "primary": "#0f172a", "secondary": "#6366f1" }'
                            value={workspaceConfig.customCss}
                            onChange={(e) => setWorkspaceConfig({...workspaceConfig, customCss: e.target.value})}
                          />
                          <p className="text-sm text-muted-foreground">
                            Insira um objeto JSON válido com as cores do tema.
                          </p>
                        </div>
                        
                        <Button onClick={handleSaveConfig}>Salvar Configurações</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="activity">
                    <Card>
                      <CardHeader>
                        <CardTitle>Atividade do Workspace</CardTitle>
                        <CardDescription>
                          Registro de ações realizadas neste workspace
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {workspaceActions.length > 0 ? (
                          <div className="space-y-4">
                            {workspaceActions.map((action) => (
                              <div key={action.id} className="border-b pb-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium">
                                      {action.action === 'create' && 'Workspace Criado'}
                                      {action.action === 'update' && 'Configurações Atualizadas'}
                                      {action.action === 'reset' && 'Workspace Redefinido'}
                                      {action.action === 'impersonate' && 'Acesso como Cliente'}
                                      {action.action === 'export' && 'Dados Exportados'}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Por {action.userId} • {new Date(action.timestamp).toLocaleString('pt-BR')}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm">
                                  {action.details.message}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            Nenhuma atividade registrada para este workspace.
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-muted-foreground mb-4">
                    Selecione um cliente para gerenciar seu workspace
                  </div>
                  <Info className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Impersonation Dialog */}
      <Dialog open={isImpersonateDialogOpen} onOpenChange={setIsImpersonateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token de Acesso Gerado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Este token permite acesso temporário ao workspace do cliente (30 minutos).
              </AlertDescription>
            </Alert>
            <div className="p-3 bg-muted rounded-md overflow-x-auto">
              <code className="text-xs whitespace-pre-wrap break-all">
                {impersonationToken}
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              Copie este token para utilizá-lo em chamadas de API ou para acessar o workspace do cliente.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsImpersonateDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reset Confirmation Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Redefinição</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Esta ação irá redefinir todas as configurações do workspace para os valores padrão.
                Esta ação não pode ser desfeita.
              </AlertDescription>
            </Alert>
            <p>
              Tem certeza de que deseja redefinir o workspace para as configurações padrão?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleResetWorkspace}>Redefinir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceManagement;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Clock, BarChart, FileText, AlertTriangle } from "lucide-react";
import { useMonitoring } from "@/hooks/useMonitoring";
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import NewMonitoringForm from "./NewMonitoringForm";
import { Badge } from "@/components/ui/badge";
import ScrapyInfo from "./ScrapyInfo";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const MonitoringTab: React.FC = () => {
  const { monitoringItems, addMonitoring, deleteMonitoring, isLoading } = useMonitoring();
  const [showNewMonitoringForm, setShowNewMonitoringForm] = useState(false);
  const [activeMonitoringTab, setActiveMonitoringTab] = useState("active");
  const [showScrapyInfo, setShowScrapyInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [editingMonitoring, setEditingMonitoring] = useState<string | null>(null);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);

  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(monitoringItems.length / itemsPerPage);
  const paginatedItems = monitoringItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddMonitoring = () => {
    setShowNewMonitoringForm(true);
  };

  const handleNewMonitoringSuccess = () => {
    setShowNewMonitoringForm(false);
  };
  
  const handleEditMonitoring = (monitoringId: string) => {
    setEditingMonitoring(monitoringId);
    setShowNewMonitoringForm(true);
  };
  
  const handleTogglePause = (monitoringId: string) => {
    // In a real app, this would update the status in the backend
    console.log(`Toggling pause status for monitoring: ${monitoringId}`);
    // For demo purposes, we'll simply show a toast message
    alert(`Status do monitoramento alterado com sucesso!`);
  };
  
  const handleViewResults = () => {
    setShowResultsDialog(true);
  };
  
  const handleViewDocuments = (documentType: string) => {
    setSelectedDocumentType(documentType);
    setShowDocumentsDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "paused":
        return <Badge className="bg-yellow-500">Pausado</Badge>;
      case "error":
        return <Badge className="bg-red-500">Erro</Badge>;
      default:
        return <Badge className="bg-gray-500">Indefinido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Dialog open={showNewMonitoringForm} onOpenChange={setShowNewMonitoringForm}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingMonitoring ? "Editar Monitoramento" : "Novo Monitoramento"}</DialogTitle>
            <DialogDescription>
              {editingMonitoring 
                ? "Atualize os parâmetros do monitoramento" 
                : "Configure os parâmetros para o monitoramento de fontes"}
            </DialogDescription>
          </DialogHeader>
          <NewMonitoringForm 
            onSubmitSuccess={handleNewMonitoringSuccess} 
            editingId={editingMonitoring}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resultados de Monitoramento</DialogTitle>
            <DialogDescription>
              Visualize os resultados detalhados das execuções de monitoramento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo de Monitoramento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">42</div>
                      <div className="text-sm text-muted-foreground">Menções Positivas</div>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">17</div>
                      <div className="text-sm text-muted-foreground">Menções Negativas</div>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <div className="text-sm text-muted-foreground">Menções Neutras</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Principais Fontes</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Portal G1</span>
                        <span className="font-medium">28 menções</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Folha de São Paulo</span>
                        <span className="font-medium">15 menções</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Twitter</span>
                        <span className="font-medium">12 menções</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button>Gerar Relatório Completo</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDocumentsDialog} onOpenChange={setShowDocumentsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDocumentType || "Documentos"}</DialogTitle>
            <DialogDescription>
              Lista de documentos coletados durante o monitoramento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        <div>
                          <div className="font-medium">{selectedDocumentType || "Documento"} {i}.pdf</div>
                          <div className="text-sm text-muted-foreground">
                            Adicionado em {new Date().toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Visualizar</Button>
                        <Button variant="outline" size="sm">Baixar</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="mr-2">Baixar Todos</Button>
                  <Button>Analisar Documentos</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Monitoramento</CardTitle>
            <CardDescription>
              Acompanhe e configure o monitoramento de termos e fontes
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="flex items-center gap-1"
              onClick={handleAddMonitoring}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Novo Monitoramento</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="active" 
            value={activeMonitoringTab} 
            onValueChange={setActiveMonitoringTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="active">
                <Eye className="h-4 w-4 mr-2" />
                Monitoramentos Ativos
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Clock className="h-4 w-4 mr-2" />
                Agendamentos
              </TabsTrigger>
              <TabsTrigger value="results">
                <BarChart className="h-4 w-4 mr-2" />
                Resultados
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alertas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {isLoading ? (
                <div className="text-center py-8">Carregando monitoramentos...</div>
              ) : monitoringItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Nenhum monitoramento configurado</p>
                  <Button onClick={handleAddMonitoring}>Adicionar Monitoramento</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium">{item.name}</h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">URL: </span>
                              <span className="font-mono">{item.url}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Frequência: </span>
                              <span>{item.frequency}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Categoria: </span>
                              <span>{item.category}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Última Atualização: </span>
                              <span>{formatDate(item.lastUpdate)}</span>
                            </div>
                            {item.keywords && (
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Termos: </span>
                                <span>{item.keywords}</span>
                              </div>
                            )}
                            {item.notes && (
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Notas: </span>
                                <span>{item.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col justify-end gap-2 p-4 bg-muted">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleTogglePause(item.id)}
                          >
                            {item.status === "active" ? "Pausar" : "Ativar"}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditMonitoring(item.id)}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => deleteMonitoring(item.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Pagination controls */}
                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={currentPage === index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Agendamentos de Monitoramento</h3>
                    <p className="text-muted-foreground mb-4">Visualize e gerencie os agendamentos de execução dos monitoramentos</p>
                    
                    <div className="border rounded-md divide-y">
                      <div className="grid grid-cols-5 font-medium p-3 bg-muted">
                        <div>Monitoramento</div>
                        <div>Frequência</div>
                        <div>Próxima Execução</div>
                        <div>Última Execução</div>
                        <div>Status</div>
                      </div>
                      
                      {monitoringItems.map((item) => (
                        <div key={`schedule-${item.id}`} className="grid grid-cols-5 p-3">
                          <div className="font-medium">{item.name}</div>
                          <div>{item.frequency}</div>
                          <div>
                            {new Date(
                              new Date(item.lastUpdate).getTime() + 
                              (item.frequency === "diario" ? 24 * 60 * 60 * 1000 : 
                               item.frequency === "semanal" ? 7 * 24 * 60 * 60 * 1000 : 
                               item.frequency === "quinzenal" ? 14 * 24 * 60 * 60 * 1000 : 
                               30 * 24 * 60 * 60 * 1000)
                            ).toLocaleDateString('pt-BR')}
                          </div>
                          <div>{formatDate(item.lastUpdate)}</div>
                          <div>
                            {item.status === "active" ? 
                              <Badge className="bg-green-500">Ativo</Badge> : 
                              <Badge className="bg-yellow-500">Pausado</Badge>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Resultados de Monitoramento</h3>
                    <p className="text-muted-foreground mb-4">Visualize os resultados das execuções de monitoramento</p>
                    
                    <div className="border rounded-md p-8 flex flex-col items-center justify-center">
                      <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-1">Análise de Resultados</h4>
                      <p className="text-muted-foreground mb-4">Visualize métricas, gráficos e detalhes sobre as menções encontradas</p>
                      <Button onClick={handleViewResults}>Ver Resultados Detalhados</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Documentos Monitorados</h3>
                    <p className="text-muted-foreground mb-4">Arquivos e documentos encontrados durante o monitoramento</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Diário Oficial da União</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">DOU_05042025.pdf</span>
                              </div>
                              <Badge className="bg-green-500">Novo</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">DOU_04042025.pdf</span>
                              </div>
                              <Badge className="bg-blue-500">Processado</Badge>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-4"
                            onClick={() => handleViewDocuments("Diário Oficial da União")}
                          >
                            Ver Todos
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Diário da Justiça</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">DJ_05042025.pdf</span>
                              </div>
                              <Badge className="bg-blue-500">Processado</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">DJ_03042025.pdf</span>
                              </div>
                              <Badge className="bg-blue-500">Processado</Badge>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-4"
                            onClick={() => handleViewDocuments("Diário da Justiça")}
                          >
                            Ver Todos
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Legislação Publicada</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">LEI_14900_2025.pdf</span>
                              </div>
                              <Badge className="bg-green-500">Novo</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">DECRETO_11234_2025.pdf</span>
                              </div>
                              <Badge className="bg-blue-500">Processado</Badge>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-4"
                            onClick={() => handleViewDocuments("Legislação Publicada")}
                          >
                            Ver Todos
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Alertas de Monitoramento</h3>
                    <p className="text-muted-foreground mb-4">Alertas gerados com base nas regras definidas no monitoramento</p>
                    
                    <div className="border rounded-md divide-y">
                      <div className="grid grid-cols-5 font-medium p-3 bg-muted">
                        <div>Data</div>
                        <div>Monitoramento</div>
                        <div>Alerta</div>
                        <div>Status</div>
                        <div>Ações</div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-3">
                        <div>{formatDate(new Date().toISOString())}</div>
                        <div className="font-medium">Diário Oficial da União</div>
                        <div>5 novas menções encontradas</div>
                        <div>
                          <Badge className="bg-red-500">Não Lido</Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-3">
                        <div>{formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())}</div>
                        <div className="font-medium">Monitoramento de Notícias</div>
                        <div>10 novas menções encontradas</div>
                        <div>
                          <Badge className="bg-blue-500">Lido</Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-3">
                        <div>{formatDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString())}</div>
                        <div className="font-medium">Monitoramento Legislativo</div>
                        <div>Nova lei publicada com termos monitorados</div>
                        <div>
                          <Badge className="bg-blue-500">Lido</Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default MonitoringTab;

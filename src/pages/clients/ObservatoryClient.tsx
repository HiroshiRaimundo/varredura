
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import MonitoringForm, { MonitoringItem } from "@/components/monitoring/MonitoringForm";
import { BarChart3, FilePieChart, LineChart, PieChart } from "lucide-react";

const ObservatoryClient: React.FC = () => {
  const { toast } = useToast();
  const auth = useAuth();
  const clientType = "observatory";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];
  
  // State for monitoring items
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedChart, setSelectedChart] = useState<string>("category");
  
  // Create the form with correct typing
  const form = useForm<MonitoringItem>({
    defaultValues: {
      name: "",
      url: "",
      api_url: "",
      frequency: "diario",
      category: "",
      keywords: "",
      responsible: "",
      institution: "",
      notes: ""
    }
  });

  // Mock alerts data
  const [alerts, setAlerts] = useState([
    { id: "1", title: "Nova atualização de dados", description: "Dados do IBGE atualizados hoje", date: new Date().toISOString(), read: false },
    { id: "2", title: "Relatório pendente", description: "Relatório mensal aguardando geração", date: new Date().toISOString(), read: false },
    { id: "3", title: "Fonte indisponível", description: "Portal de dados do governo temporariamente fora do ar", date: new Date().toISOString(), read: true },
  ]);

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    toast({
      title: "Alerta marcado como lido",
      description: "O alerta foi marcado como lido com sucesso."
    });
  };

  const handleAddMonitoring = (data: MonitoringItem) => {
    console.log("Adding monitoring item:", data);
    // Add an ID (in a real app this would come from the backend)
    const newItem = { ...data, id: Date.now().toString() };
    // Add to the list of monitoring items
    setMonitoringItems([...monitoringItems, newItem]);
    // Show success message
    toast({
      title: "Monitoramento adicionado",
      description: `O monitoramento "${data.name}" foi adicionado com sucesso.`
    });
    form.reset();
  };

  const handleDeleteMonitoring = (id: string) => {
    console.log("Deleting monitoring item:", id);
    // Filter out the item to delete
    const updatedItems = monitoringItems.filter(item => item.id !== id);
    setMonitoringItems(updatedItems);
    // Show success message
    toast({
      title: "Monitoramento removido",
      description: "O monitoramento foi removido com sucesso."
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
            clientName="Usuário Observatório"
            clientType={clientType}
          />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{details.title}</h1>
            <p className="text-muted-foreground">
              {details.shortDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Monitoramentos Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>{monitoringItems.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de monitoramentos ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Alertas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>{alerts.filter(a => !a.read).length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Alertas não lidos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Integrações</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>{Math.min(monitoringItems.length, 3)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Fontes de dados integradas</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoramentos</TabsTrigger>
              <TabsTrigger value="add">Novo Monitoramento</TabsTrigger>
              <TabsTrigger value="alerts">Alertas ({alerts.filter(a => !a.read).length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard de Monitoramentos</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => setSelectedChart("category")}
                      className={`p-2 rounded-md ${selectedChart === "category" ? colorClasses.bg + " text-white" : "bg-gray-100"}`}
                    >
                      <PieChart className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setSelectedChart("frequency")}
                      className={`p-2 rounded-md ${selectedChart === "frequency" ? colorClasses.bg + " text-white" : "bg-gray-100"}`}
                    >
                      <BarChart3 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setSelectedChart("timeline")}
                      className={`p-2 rounded-md ${selectedChart === "timeline" ? colorClasses.bg + " text-white" : "bg-gray-100"}`}
                    >
                      <LineChart className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setSelectedChart("distribution")}
                      className={`p-2 rounded-md ${selectedChart === "distribution" ? colorClasses.bg + " text-white" : "bg-gray-100"}`}
                    >
                      <FilePieChart className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  {monitoringItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Nenhum monitoramento configurado ainda.</p>
                      <button 
                        onClick={() => setActiveTab("add")}
                        className={`px-4 py-2 rounded-md text-white ${colorClasses.bg}`}>
                        Novo Monitoramento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        {selectedChart === "category" && "Distribuição por Categoria"}
                        {selectedChart === "frequency" && "Frequência de Atualização"}
                        {selectedChart === "timeline" && "Linha do Tempo de Monitoramentos"}
                        {selectedChart === "distribution" && "Distribuição por Responsável"}
                      </h3>
                      
                      <div className="border rounded-md p-4 min-h-[300px] flex items-center justify-center">
                        {selectedChart === "category" && (
                          <div className="text-center w-full">
                            <p className="text-muted-foreground mb-2">Visualização de gráfico em pizza das categorias</p>
                            <div className="h-64 w-full bg-muted/20 rounded-md flex items-center justify-center">
                              <PieChart className="h-16 w-16 text-muted" />
                            </div>
                          </div>
                        )}
                        
                        {selectedChart === "frequency" && (
                          <div className="text-center w-full">
                            <p className="text-muted-foreground mb-2">Visualização de gráfico de barras das frequências</p>
                            <div className="h-64 w-full bg-muted/20 rounded-md flex items-center justify-center">
                              <BarChart3 className="h-16 w-16 text-muted" />
                            </div>
                          </div>
                        )}
                        
                        {selectedChart === "timeline" && (
                          <div className="text-center w-full">
                            <p className="text-muted-foreground mb-2">Visualização de linha do tempo</p>
                            <div className="h-64 w-full bg-muted/20 rounded-md flex items-center justify-center">
                              <LineChart className="h-16 w-16 text-muted" />
                            </div>
                          </div>
                        )}
                        
                        {selectedChart === "distribution" && (
                          <div className="text-center w-full">
                            <p className="text-muted-foreground mb-2">Visualização de gráfico de distribuição</p>
                            <div className="h-64 w-full bg-muted/20 rounded-md flex items-center justify-center">
                              <FilePieChart className="h-16 w-16 text-muted" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium mt-6">Resumo de Monitoramentos</h3>
                      <div className="border rounded-md p-4">
                        <table className="w-full">
                          <thead className="border-b">
                            <tr>
                              <th className="text-left pb-2">Nome</th>
                              <th className="text-left pb-2">Categoria</th>
                              <th className="text-left pb-2">Frequência</th>
                            </tr>
                          </thead>
                          <tbody>
                            {monitoringItems.map(item => (
                              <tr key={item.id} className="border-b last:border-0">
                                <td className="py-2">{item.name}</td>
                                <td className="py-2">{item.category}</td>
                                <td className="py-2">{item.frequency}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monitoring">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Monitoramentos</CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Nenhum monitoramento configurado ainda.</p>
                      <button 
                        onClick={() => setActiveTab("add")}
                        className={`px-4 py-2 rounded-md text-white ${colorClasses.bg}`}>
                        Novo Monitoramento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {monitoringItems.map(item => (
                        <div key={item.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">{item.name}</h3>
                            <button 
                              onClick={() => handleDeleteMonitoring(item.id || "")}
                              className="text-red-500 hover:text-red-700">
                              Excluir
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">URL:</p>
                              <p className="text-sm">{item.url}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Categoria:</p>
                              <p className="text-sm">{item.category}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Frequência:</p>
                              <p className="text-sm">{item.frequency}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Responsável:</p>
                              <p className="text-sm">{item.responsible || "Não definido"}</p>
                            </div>
                            {item.keywords && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Palavras-chave:</p>
                                <p className="text-sm">{item.keywords}</p>
                              </div>
                            )}
                            {item.notes && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Anotações:</p>
                                <p className="text-sm">{item.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Novo Monitoramento</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringForm 
                    form={form} 
                    onSubmit={handleAddMonitoring} 
                    clientType={clientType} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas de Monitoramento</CardTitle>
                </CardHeader>
                <CardContent>
                  {alerts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum alerta disponível no momento.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {alerts.map(alert => (
                        <div key={alert.id} className={`border rounded-md p-4 ${!alert.read ? 'border-l-4 border-l-amber-500' : ''}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">{alert.title}</h3>
                            {!alert.read && (
                              <button 
                                onClick={() => handleMarkAsRead(alert.id)}
                                className={`px-2 py-1 rounded-md text-xs text-white ${colorClasses.bg}`}>
                                Marcar como lido
                              </button>
                            )}
                          </div>
                          <p className="text-sm mb-2">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ObservatoryClient;


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
import MonitoringForm from "@/components/monitoring/MonitoringForm";

// Define the MonitoringItem interface
interface MonitoringItem {
  id?: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  notes?: string;
}

const ObservatoryClient: React.FC = () => {
  const { toast } = useToast();
  const auth = useAuth();
  const clientType = "observatory";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];
  
  // State for monitoring items
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
                  <span>Dashboards</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>{Math.min(monitoringItems.length, 5)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Dashboards personalizados</p>
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
              <TabsTrigger value="add">Adicionar Monitoramento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard de Monitoramentos</CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Nenhum monitoramento configurado ainda.</p>
                      <button 
                        onClick={() => setActiveTab("add")}
                        className={`px-4 py-2 rounded-md text-white ${colorClasses.bg}`}>
                        Adicionar Primeiro Monitoramento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Resumo de Monitoramentos</h3>
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
                        Adicionar Primeiro Monitoramento
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
                  <CardTitle>Adicionar Novo Monitoramento</CardTitle>
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
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{details.description}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {details.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ObservatoryClient;

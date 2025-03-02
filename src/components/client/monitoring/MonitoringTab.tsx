
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonitoringForm, { MonitoringItem } from "@/components/monitoring/MonitoringForm";

interface MonitoringTabProps {
  clientType: ClientType;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ clientType }) => {
  const { toast } = useToast();
  const colorClasses = getColorClasses(clientType);
  
  // State for monitoring items
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [activeTab, setActiveTab] = useState("list");
  
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
    // Switch to list tab after adding
    setActiveTab("list");
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <span>Atualizações</span>
              <span className={`${colorClasses.text} font-bold text-2xl`}>24</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p>Atualizações nas últimas 24 horas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
            <CardTitle className="flex justify-between items-center">
              <span>Status</span>
              <span className={`${colorClasses.text} font-bold text-2xl`}>100%</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p>Fontes disponíveis atualmente</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Lista de Monitoramentos</TabsTrigger>
          <TabsTrigger value="add">Adicionar Novo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramentos Configurados</CardTitle>
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
    </div>
  );
};

export default MonitoringTab;

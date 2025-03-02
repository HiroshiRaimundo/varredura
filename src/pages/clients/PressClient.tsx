
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { ClientType } from "@/types/clientTypes";
import ClientTabs from "@/components/example-client/ClientTabs";
import DefaultContent from "@/components/example-client/DefaultContent";
import { useForm } from "react-hook-form";
import MonitoringForm, { MonitoringItem } from "@/components/monitoring/MonitoringForm";
import { useToast } from "@/hooks/use-toast";

// Include this press client type in the ClientType type definition
const clientType = "press" as ClientType;

const PressClient: React.FC = () => {
  const auth = useAuth();
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];
  const { toast } = useToast();
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");
  
  // Form para monitoramento
  const monitoringForm = useForm<MonitoringItem>({
    defaultValues: {
      name: "",
      url: "",
      frequency: "",
      category: "",
    }
  });
  
  // Função para lidar com a submissão do formulário de monitoramento
  const handleMonitoringSubmit = (data: MonitoringItem) => {
    console.log("Dados de monitoramento submetidos:", data);
    toast({
      title: "Monitoramento adicionado",
      description: `O monitoramento "${data.name}" foi adicionado com sucesso.`,
    });
    
    // Resetar o formulário após submissão
    monitoringForm.reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
            clientName="Assessoria Exemplo"
            clientType={clientType}
          />
          
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold">{details.title} - Área do Cliente</h1>
              <p className="text-muted-foreground">
                Gerencie seus releases, contatos e monitore a cobertura de mídia
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Releases Publicados</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>28</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de releases publicados este mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Taxa de Conversão</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>42%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Média de aproveitamento dos releases</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Visualizações</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>8.4k</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Visualizações totais dos seus conteúdos</p>
              </CardContent>
            </Card>
          </div>
          
          <ClientTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            clientType={clientType} 
          />
          
          <div className="mt-6">
            {activeTab === "dashboard" && (
              <DefaultContent activeTab="dashboard" clientType={clientType} />
            )}
            
            {activeTab === "monitoring" && (
              <Card>
                <CardHeader>
                  <CardTitle className={colorClasses.text}>Monitoramento de Publicações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">Configure o monitoramento de publicações relacionadas aos seus releases ou à sua organização.</p>
                  
                  <MonitoringForm 
                    form={monitoringForm} 
                    onSubmit={handleMonitoringSubmit} 
                    clientType={clientType}
                  />
                </CardContent>
              </Card>
            )}
            
            {activeTab === "analysis" && (
              <DefaultContent activeTab="analysis" clientType={clientType} />
            )}
            
            {activeTab === "releases" && (
              <DefaultContent activeTab="releases" clientType={clientType} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PressClient;

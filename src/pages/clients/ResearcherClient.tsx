import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import ClientList from "@/components/admin/clients/ClientList";
import { useClientManagement } from "@/components/admin/clients/hooks/useClientManagement";

const ResearcherClient: React.FC = () => {
  const auth = useAuth();
  const clientType = "researcher";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];
  const { clients, isLoading, loadClients } = useClientManagement(clientType);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleAddClient = () => {
    // Implementar lógica de adicionar cliente
  };

  const handleEditClient = (client: any) => {
    // Implementar lógica de editar cliente
  };

  const handleDeleteClient = (clientId: string) => {
    // Implementar lógica de deletar cliente
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <BackToAdminButton />
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
            clientName="Usuário Pesquisador"
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
                  <span>Clientes Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>
                    {clients.filter(c => c.status === 'active').length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de pesquisadores ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Pesquisas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>
                    {clients.length * 2} {/* Mock: cada cliente tem em média 2 pesquisas */}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de pesquisas em andamento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Premium</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>
                    {clients.filter(c => c.plan === 'premium').length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Clientes com plano premium</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="research">Pesquisas</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Resumo de Atividades</h3>
                    <p>Visualize as principais métricas e atividades dos pesquisadores.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes Pesquisadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClientList
                    clients={clients}
                    onAddClient={handleAddClient}
                    onEditClient={handleEditClient}
                    onDeleteClient={handleDeleteClient}
                    currentClientType={clientType}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Outras tabs... */}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearcherClient;

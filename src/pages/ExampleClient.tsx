import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientFlowDashboard from "@/components/dashboard/ClientFlowDashboard";
import ClientHeader from "@/components/example-client/ClientHeader";
import ClientTabs from "@/components/example-client/ClientTabs";
import ClientInfo from "@/components/example-client/ClientInfo";
import DefaultContent from "@/components/example-client/DefaultContent";
import { ClientType } from "@/types/clientTypes";
import { Landmark, Database, BookOpen, Building, FileText, Mail, Eye } from "lucide-react";
import PressContent from "@/components/press/PressContent";
import generateMockData from "@/components/example-client/utils/mockDataGenerator";

const ExampleClient: React.FC = () => {
  const [clientType, setClientType] = useState<ClientType>("press");
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");
  const mockData = generateMockData();

  const getClientIcon = (type: ClientType) => {
    switch (type) {
      case "observatory":
        return <Database className="h-6 w-6 text-sky-600" />;
      case "researcher":
        return <BookOpen className="h-6 w-6 text-emerald-600" />;
      case "politician":
        return <Landmark className="h-6 w-6 text-violet-600" />;
      case "institution":
        return <Building className="h-6 w-6 text-amber-600" />;
      case "journalist":
        return <FileText className="h-6 w-6 text-rose-600" />;
      case "press":
        return <Mail className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Eye className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Você está visualizando a interface do cliente como administrador. Isso permite que você veja exatamente o que o cliente vê para fornecer suporte adequado.
            </p>
          </div>
        </div>
      </div>

      <ClientHeader clientType={clientType} getClientIcon={getClientIcon} />
      
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <ClientInfo clientType={clientType} />
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="releases" className="w-full">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
                  <TabsTrigger value="analysis">Análise</TabsTrigger>
                  <TabsTrigger value="releases">Assessoria de Imprensa</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <ClientFlowDashboard />
                </TabsContent>

                <TabsContent value="services">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Observatório</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Monitore e analise dados e indicadores relevantes para sua área de interesse.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pesquisador</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Acesse ferramentas e recursos para pesquisa acadêmica e científica.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Político</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Acompanhe tendências e monitore a opinião pública sobre temas políticos.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Instituição</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Gerencie a presença e reputação da sua instituição na mídia.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Jornalista</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Acesse fontes, dados e informações para suas matérias jornalísticas.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Assessoria de Imprensa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Gerencie releases, contatos com a mídia e monitoramento de notícias.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="monitoring">
                  {clientType === "press" ? (
                    <PressContent clientType={clientType} />
                  ) : (
                    <DefaultContent activeTab={activeTab} clientType={clientType} />
                  )}
                </TabsContent>

                <TabsContent value="analysis">
                  {clientType === "press" ? (
                    <PressContent clientType={clientType} />
                  ) : (
                    <DefaultContent activeTab={activeTab} clientType={clientType} />
                  )}
                </TabsContent>

                <TabsContent value="releases">
                  {clientType === "press" ? (
                    <PressContent clientType={clientType} />
                  ) : (
                    <DefaultContent activeTab={activeTab} clientType={clientType} />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExampleClient;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import ClientDashboard from "@/components/client/ClientDashboard";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReleasesSection from "@/components/example-client/press/ReleasesSection";

const PressClient: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const clientType = "press";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
          />
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{details.title} - Área Administrativa</h1>
              <p className="text-muted-foreground">
                Gerencie os dados e configurações específicas para clientes do tipo Assessoria de Imprensa
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Voltar para Admin
              </Button>
              <Button
                className={colorClasses.bg}
                onClick={() => navigate("/admin/client/press/new")}
              >
                Novo Cliente
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Clientes Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>19</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de assessorias com contratos ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Releases Enviados</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>243</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de releases enviados por assessorias</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Ticket Médio</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>R$ 1.850</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Valor médio dos contratos com assessorias</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="dashboard" className="w-full mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="releases">Gestão de Releases</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplo da Área do Cliente - Assessoria de Imprensa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClientDashboard clientType={clientType} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="releases">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReleasesSection clientType={clientType} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Contatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded bg-muted/30">
                    <p className="text-center py-10">
                      Sistema de gerenciamento de contatos para assessoria de imprensa
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades Específicas</CardTitle>
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
                <CardTitle>Customização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Nesta área você pode personalizar os recursos disponíveis para clientes do tipo Assessoria de Imprensa.</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Fluxo de Aprovação
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Distribuição Segmentada
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Monitoramento de Publicações
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Gestão de Contatos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PressClient;

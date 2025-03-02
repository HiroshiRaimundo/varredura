
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Activity } from "lucide-react";
import ReleaseModerationSection from "@/components/example-client/press/ReleaseModerationSection";
import JournalistContactsSection from "@/components/example-client/press/JournalistContactsSection";

const JournalistClient: React.FC = () => {
  const auth = useAuth();
  const clientType = "journalist";
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
            clientName="Admin"
          />
          
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold">{details.title} - Área Administrativa</h1>
              <p className="text-muted-foreground">
                Gerencie os dados e configurações específicas para clientes do tipo Jornalista
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Jornalistas Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>53</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de jornalistas com acesso ativo</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Pautas Geradas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>124</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Pautas geradas a partir dos dados este mês</p>
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
                <p>Visualizações de dados nos últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="moderation" className="w-full">
                <TabsList className="w-full border-b rounded-none p-0 h-auto">
                  <TabsTrigger 
                    value="moderation" 
                    className="flex-1 rounded-none border-r py-3 data-[state=active]:border-b-0"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Moderação de Releases</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="contacts" 
                    className="flex-1 rounded-none py-3 data-[state=active]:border-b-0"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Contatos de Imprensa</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="moderation" className="mt-0">
                    <ReleaseModerationSection />
                  </TabsContent>
                  <TabsContent value="contacts" className="mt-0">
                    <JournalistContactsSection />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JournalistClient;

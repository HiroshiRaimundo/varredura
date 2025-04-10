
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, MessageSquare, Settings, FileText, User } from "lucide-react";

const AreaCliente: React.FC = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("perfil");
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => {}} 
            onLogoutClick={auth.handleLogout} 
          />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Área do Cliente</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo à sua área de cliente, {auth.user?.name}. Gerencie seus dados e acesse serviços.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="perfil">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="servicos">
                <FileText className="h-4 w-4 mr-2" />
                Serviços
              </TabsTrigger>
              <TabsTrigger value="relatorios">
                <BarChart3 className="h-4 w-4 mr-2" />
                Relatórios
              </TabsTrigger>
              <TabsTrigger value="mensagens">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensagens
              </TabsTrigger>
              <TabsTrigger value="configuracoes">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle>Seu Perfil</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                        <p>{auth.user?.name || "Usuário"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{auth.user?.email || "email@exemplo.com"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Tipo de Conta</h3>
                        <p>Cliente</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Data de Cadastro</h3>
                        <p>{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servicos">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Contratados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aqui serão exibidos os serviços que você contratou e seu status.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relatorios">
              <Card>
                <CardHeader>
                  <CardTitle>Seus Relatórios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Esta área exibiria relatórios e análises personalizados para sua conta.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mensagens">
              <Card>
                <CardHeader>
                  <CardTitle>Centro de Mensagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Suas mensagens e notificações apareceriam aqui.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuracoes">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aqui você poderia ajustar as configurações da sua conta e preferências.</p>
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

export default AreaCliente;

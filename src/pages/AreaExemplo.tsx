
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, HelpCircle, History, LayoutDashboard } from "lucide-react";

const AreaExemplo: React.FC = () => {
  const auth = useAuth();
  
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
            <h1 className="text-3xl font-bold">Área de Exemplo</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo à área de demonstração do sistema. Aqui você pode explorar funcionalidades do sistema.
            </p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800 text-sm">
                <strong>Nota:</strong> Esta é uma versão de demonstração. Os dados e funcionalidades são apenas ilustrativos.
              </p>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="examples">
                <BookOpen className="h-4 w-4 mr-2" />
                Exemplos
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
              <TabsTrigger value="help">
                <HelpCircle className="h-4 w-4 mr-2" />
                Ajuda
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                    <CardDescription>
                      Resumo das atividades no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Esta é uma área de demonstração do dashboard. Aqui seriam mostrados gráficos e estatísticas.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>
                      Últimas ações realizadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="text-sm">• Usuário acessou área de exemplo</li>
                      <li className="text-sm">• Documento de exemplo visualizado</li>
                      <li className="text-sm">• Relatório de exemplo gerado</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplos Disponíveis</CardTitle>
                  <CardDescription>
                    Explore exemplos do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = "/example-dashboard"}>
                      <span>Dashboard de Exemplo</span>
                      <span className="text-xs text-muted-foreground mt-1">Visualize um dashboard completo</span>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = "/example-client"}>
                      <span>Cliente de Exemplo</span>
                      <span className="text-xs text-muted-foreground mt-1">Área do cliente demonstrativa</span>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex flex-col" disabled>
                      <span>Mais exemplos</span>
                      <span className="text-xs text-muted-foreground mt-1">Em breve</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Acessos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Esta área mostraria o histórico de acessos e atividades do usuário na demonstração.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Central de Ajuda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Esta área forneceria documentação e tutoriais sobre a plataforma.</p>
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

export default AreaExemplo;

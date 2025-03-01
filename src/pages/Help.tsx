
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Database,
  Book,
  Info,
  HelpCircle, 
  Landmark,
  Building,
  Newspaper,
  Megaphone,
  FileText,
  User
} from "lucide-react";

const Help: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-8 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
          onLogoutClick={auth.handleLogout} 
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-blue-500" />
              Central de Ajuda
            </CardTitle>
            <CardDescription>
              Informações sobre nossos serviços e como utilizar o sistema de monitoramento
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
                <TabsTrigger value="contact">Contato</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-6">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Nossos Serviços</h2>
                  <p className="text-muted-foreground mb-6">
                    Oferecemos uma variedade de serviços especializados para diferentes públicos. 
                    Confira abaixo um resumo de cada serviço:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-500" />
                        Observatório
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Monitoramento e análise de dados para observatórios
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Plataforma completa para observatórios de políticas públicas 
                        acompanharem indicadores, integrarem dados e gerarem relatórios 
                        automatizados com visualizações avançadas.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Book className="h-5 w-5 text-purple-500" />
                        Pesquisador
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Ferramentas para pesquisa acadêmica e científica
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Acesso a datasets completos, APIs para integração com ferramentas 
                        estatísticas, histório de séries temporais e capacidade de 
                        compartilhamento de dados com outros pesquisadores.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Landmark className="h-5 w-5 text-green-500" />
                        Político
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Monitoramento de legislação e políticas públicas
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Alertas sobre novas legislações, análise de impacto de políticas 
                        públicas, resumos executivos de dados governamentais e 
                        comparativos de indicadores por região.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Building className="h-5 w-5 text-amber-500" />
                        Instituição
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Recursos para instituições governamentais e não-governamentais
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Ferramentas para gestão de dados institucionais, monitoramento 
                        de programas, dashboards personalizados e relatórios de 
                        acompanhamento para instituições de diversos setores.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-rose-500" />
                        Jornalista
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Fontes de dados e indicadores para reportagens
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Acesso a indicadores atualizados, visualizações prontas para 
                        publicação, verificação de dados e comparativos históricos 
                        para embasar reportagens investigativas e especiais.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-indigo-500" />
                        Assessoria de Imprensa
                      </CardTitle>
                      <CardDescription className="mb-2">
                        Ferramentas para criação e distribuição de releases
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Sistema completo para criação, aprovação e monitoramento de 
                        releases, acompanhamento de publicações, métricas de desempenho 
                        e gestão de contatos com veículos de comunicação.
                      </p>
                    </Card>
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200 mt-8">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-700">Acesso à Área do Cliente</AlertTitle>
                  <AlertDescription className="text-blue-600">
                    Para acessar qualquer um desses serviços, você precisará entrar na 
                    área do cliente com suas credenciais. Selecione um perfil na página de clientes 
                    ou entre em contato conosco para solicitar acesso.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Como acesso a área do cliente?</h3>
                      <p className="text-muted-foreground">
                        Para acessar a área do cliente, clique no botão "Área do Cliente" no menu 
                        principal. Você será direcionado para a página de seleção de perfil, 
                        onde poderá escolher qual tipo de cliente deseja acessar. Após a seleção, 
                        faça login com suas credenciais.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Como funcionam os alertas?</h3>
                      <p className="text-muted-foreground">
                        Cada serviço monitorado possui seus próprios alertas individuais. Você 
                        receberá notificações específicas para cada fonte de dados que estiver 
                        acompanhando. Os alertas aparecem no painel do cliente e podem ser 
                        filtrados por tipo ou serviço.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Como exportar dados do sistema?</h3>
                      <p className="text-muted-foreground">
                        Todos os dashboards possuem opções de exportação de dados em diferentes 
                        formatos. Você pode exportar relatórios completos em PDF, dados brutos 
                        em CSV ou JSON, e visualizações em formatos de imagem para uso em 
                        apresentações ou publicações.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Posso personalizar meu dashboard?</h3>
                      <p className="text-muted-foreground">
                        Sim, cada perfil de cliente possui opções de personalização. Você pode 
                        configurar quais indicadores deseja visualizar primeiro, criar filtros 
                        personalizados, ajustar o período de análise e salvar suas configurações 
                        para acessos futuros.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Entre em Contato</h2>
                  
                  <p className="text-muted-foreground mb-6">
                    Nossa equipe está disponível para ajudar com qualquer dúvida ou solicitação 
                    sobre nossos serviços. Entre em contato pelos canais abaixo:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2">Suporte Técnico</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        <strong>Email:</strong> suporte@monitoramento.com<br />
                        <strong>Telefone:</strong> (11) 0000-0000<br />
                        <strong>Horário:</strong> Segunda a sexta, das 8h às 18h
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <CardTitle className="text-lg mb-2">Comercial</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        <strong>Email:</strong> comercial@monitoramento.com<br />
                        <strong>Telefone:</strong> (11) 0000-0001<br />
                        <strong>Horário:</strong> Segunda a sexta, das 9h às 17h
                      </p>
                    </Card>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200 mt-8">
                    <User className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-700">Atendimento Personalizado</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      Para clientes com planos premium, oferecemos suporte prioritário e 
                      consultoria personalizada. Entre em contato com seu gerente de conta 
                      para mais informações.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Help;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, BookOpen, Link, AlertTriangle, FileSearch, Clock, Calendar, 
  Search, Database, FileJson, BarChart, ArrowLeft, User, 
  Filter, Server, ChartBar, Newspaper, Megaphone, Landmark
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Para este exemplo, usamos o localStorage para verificar a autenticação
        const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isLoggedIn);
        
        if (!isLoggedIn) {
          toast({
            title: "Acesso restrito",
            description: "Você precisa estar autenticado para acessar a página de ajuda.",
            variant: "destructive"
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Função para voltar para a área administrativa
  const handleGoBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
          </div>
          <p className="mt-2 text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Não deveria chegar aqui devido ao redirect, mas por precaução
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com título centralizado e botão Voltar */}
        <header className="mb-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack} 
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Voltar para Dashboard
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold">Centro de Ajuda</h1>
          </div>
          
          <div className="w-[80px]"></div> {/* Espaço para balancear o layout */}
        </header>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="research">Pesquisa</TabsTrigger>
            <TabsTrigger value="press">Assessoria</TabsTrigger>
            <TabsTrigger value="clients">Área do Cliente</TabsTrigger>
          </TabsList>

          {/* Sistema */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral do Sistema</CardTitle>
                <CardDescription>
                  Conheça as principais funções do sistema de monitoramento e análise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Server className="h-5 w-5 text-blue-500" />
                      Monitoramento de Dados
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Coleta automatizada de informações em fontes governamentais, portais de transparência e diários oficiais. Oferece séries históricas e alertas para mudanças em indicadores.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ChartBar className="h-5 w-5 text-green-500" />
                      Análise de Indicadores
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ferramentas de visualização e análise estatística para explorar os dados coletados. Gráficos interativos, dashboards customizáveis e exportação de dados para diversos formatos.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      Mapeamento de Pesquisas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Catalogação e visualização geográfica de estudos acadêmicos relevantes ao desenvolvimento regional. Facilita a descoberta de pesquisas por localização, tema e metodologia.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-indigo-500" />
                      Assessoria de Imprensa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Criação, revisão e distribuição de releases para veículos de imprensa, com acompanhamento de resultados e métricas de desempenho.
                    </p>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Perfis de Usuários</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Database className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Observatório</h4>
                        <p className="text-xs text-muted-foreground">Acesso a dados e visualizações para observatórios de políticas públicas</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Search className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Pesquisador</h4>
                        <p className="text-xs text-muted-foreground">Recursos para pesquisadores acadêmicos e científicos</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Landmark className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Político</h4>
                        <p className="text-xs text-muted-foreground">Ferramentas para acompanhamento de políticas e legislação</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Home className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Instituição</h4>
                        <p className="text-xs text-muted-foreground">Recursos para instituições governamentais e não-governamentais</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Newspaper className="h-5 w-5 text-rose-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Jornalista</h4>
                        <p className="text-xs text-muted-foreground">Fontes de dados e indicadores para reportagens</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 border rounded-md">
                      <Megaphone className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Assessoria de Imprensa</h4>
                        <p className="text-xs text-muted-foreground">Ferramentas para criação e distribuição de releases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoramento */}
          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Módulo de Monitoramento</CardTitle>
                <CardDescription>
                  Recursos para coleta e análise de dados de fontes governamentais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Coleta Automatizada
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    O sistema coleta dados regularmente de portais de transparência, diários oficiais e sites governamentais. 
                    Utilizamos tecnologias de web scraping para extrair dados estruturados e não-estruturados.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileJson className="h-5 w-5 text-primary" />
                    Processamento de Dados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Transformamos dados brutos em formatos estruturados (JSON, CSV) para análise. O sistema faz limpeza e
                    padronização automática, permitindo integração de múltiplas fontes.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filtros Avançados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Filtre monitoramentos por responsável, categoria ou frequência. Os filtros facilitam
                    a organização e o gerenciamento de grandes volumes de monitoramentos.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Visualização de Dados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Crie séries temporais e visualize tendências em gráficos interativos. Compare diferentes indicadores
                    e exporte os resultados para relatórios.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pesquisa */}
          <TabsContent value="research">
            <Card>
              <CardHeader>
                <CardTitle>Módulo de Pesquisa</CardTitle>
                <CardDescription>
                  Ferramentas para catalogar e visualizar estudos acadêmicos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-primary" />
                    Cadastro de Estudos
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Registre estudos acadêmicos com metadados completos: título, autor, coautores, resumo,
                    localização geográfica e tipo de pesquisa.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Link className="h-5 w-5 text-primary" />
                    Integração com Repositórios
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Vincule seus estudos a repositórios institucionais ou plataformas científicas como Scielo, 
                    Google Scholar ou ResearchGate para facilitar o acesso ao texto completo.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Mapa Interativo
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Visualize a distribuição geográfica dos estudos em um mapa interativo. Filtre por tema, 
                    tipo de estudo ou período para análises espaciais.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessoria de Imprensa */}
          <TabsContent value="press">
            <Card>
              <CardHeader>
                <CardTitle>Assessoria de Imprensa</CardTitle>
                <CardDescription>
                  Sistema completo para gerenciamento de comunicação com a imprensa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Criação de Releases
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Edite releases com ferramentas de formatação profissional. Inclua links para materiais complementares 
                    como fotos, vídeos e documentos de apoio.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Fluxo de Aprovação
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Todo release passa por um processo estruturado de revisão e aprovação antes da distribuição.
                    Acompanhe o status em tempo real no dashboard.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Distribuição Segmentada
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Envie releases para jornalistas e veículos segmentados por área de interesse.
                    Nossa base inclui contatos de diversos veículos nacionais e regionais.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Monitoramento de Resultados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Acompanhe onde seu release foi publicado e acesse links diretos para as matérias.
                    Gere relatórios de desempenho e compare resultados de diferentes campanhas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Área do Cliente */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Área do Cliente</CardTitle>
                <CardDescription>
                  Informações sobre as áreas específicas para cada tipo de cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-500" />
                      Observatório
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Dashboard com visualizações de dados governamentais, indicadores socioeconômicos e 
                      ferramentas de análise para observatórios de políticas públicas.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Search className="h-5 w-5 text-purple-500" />
                      Pesquisador
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Acesso a datasets completos, ferramentas de análise estatística e 
                      recursos para publicação e divulgação de pesquisas acadêmicas.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Landmark className="h-5 w-5 text-green-500" />
                      Político
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Monitoramento de legislação, alertas sobre novos projetos de lei e 
                      indicadores de desenvolvimento territorial para embasar decisões.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Home className="h-5 w-5 text-amber-500" />
                      Instituição
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ferramentas para planejamento estratégico, monitoramento de indicadores 
                      institucionais e análise comparativa com outras organizações.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Newspaper className="h-5 w-5 text-rose-500" />
                      Jornalista
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Acesso a dados verificados, indicadores socioeconômicos e contatos 
                      de especialistas para embasar reportagens e artigos jornalísticos.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-indigo-500" />
                      Assessoria de Imprensa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sistema completo para criação, aprovação e distribuição de releases, 
                      com monitoramento de resultados e análise de desempenho.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate("/client-login")} 
                    className="flex items-center gap-2"
                  >
                    <User size={16} />
                    Acessar Área do Cliente
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Faça login para acessar os recursos específicos do seu perfil
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center">
                ©️ 2024 | Programa de Pós-graduação em Desenvolvimento da Amazônia Sustentável
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Desenvolvido por: Hiroshi Koga
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Help;

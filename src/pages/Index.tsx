
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserRound, LogIn, LogOut } from "lucide-react";

// Components
import Dashboard from "@/components/Dashboard";
import MonitoringForm from "@/components/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import ResearchForm from "@/components/ResearchForm";
import ResearchList from "@/components/ResearchList";
import MapView from "@/components/MapView";
import LoginDialog from "@/components/LoginDialog";

// Utilities
import { geocodeLocation } from "@/utils/geocoder";

// Supabase
import { supabase } from "@/integrations/supabase/client";

// Types
interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
}

interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "outro";
}

// Dados iniciais vazios para o dashboard
const initialMockData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
  estudos: 0,
  monitoramentos: 0,
  atualizacoes: 0
}));

const Index: React.FC = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [timeRange, setTimeRange] = useState("mensal");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const monitoringForm = useForm<Omit<MonitoringItem, "id">>();
  const loginForm = useForm<{ email: string; password: string }>();
  const studyForm = useForm<Omit<ResearchStudy, "id" | "coordinates">>();

  // Carregar dados do Supabase ao iniciar
  useEffect(() => {
    fetchMonitoringItems();
    fetchResearchStudies();
  }, []);

  // Buscar itens de monitoramento do Supabase
  const fetchMonitoringItems = async () => {
    try {
      const { data, error } = await supabase
        .from('monitoring_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Converter o formato do banco para o formato da aplicação
      const formattedItems = data.map(item => ({
        id: item.id,
        name: item.name,
        url: item.url,
        api_url: item.api_url,
        frequency: item.frequency,
        category: item.category
      }));
      
      setMonitoringItems(formattedItems);
    } catch (error) {
      console.error('Erro ao buscar itens de monitoramento:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os monitoramentos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar estudos de pesquisa do Supabase
  const fetchResearchStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('research_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Converter o formato do banco para o formato da aplicação
      const formattedStudies = data.map(study => ({
        id: study.id,
        title: study.title,
        author: study.author,
        coAuthors: study.co_authors,
        summary: study.summary,
        repositoryUrl: study.repository_url,
        location: study.location,
        coordinates: study.coordinates as [number, number],
        type: study.type as "artigo" | "dissertacao" | "tese" | "outro"
      }));
      
      setStudies(formattedStudies);
    } catch (error) {
      console.error('Erro ao buscar estudos:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os estudos de pesquisa.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(monitoringItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'monitoramento-dados.json');
    linkElement.click();
  };

  const handleLogin = (data: { email: string; password: string }) => {
    // Verificar credenciais (odr@2025 / Ppgdas@2025)
    if (data.email === "odr@2025" && data.password === "Ppgdas@2025") {
      setIsAuthenticated(true);
      setIsLoginDialogOpen(false);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema de monitoramento."
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  const handleAddMonitoring = async (data: Omit<MonitoringItem, "id">) => {
    try {
      // Inserir no Supabase
      const { data: newItem, error } = await supabase
        .from('monitoring_items')
        .insert({
          name: data.name,
          url: data.url,
          api_url: data.api_url || null,
          frequency: data.frequency,
          category: data.category
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Converter formato do banco para formato da aplicação
      const formattedItem: MonitoringItem = {
        id: newItem.id,
        name: newItem.name,
        url: newItem.url,
        api_url: newItem.api_url,
        frequency: newItem.frequency,
        category: newItem.category
      };
      
      // Atualizar estado
      setMonitoringItems(prev => [formattedItem, ...prev]);
      monitoringForm.reset();
      
      toast({
        title: "Item adicionado",
        description: `Monitoramento de ${data.name} foi configurado.`
      });
    } catch (error) {
      console.error('Erro ao adicionar monitoramento:', error);
      toast({
        title: "Erro ao adicionar item",
        description: "Não foi possível adicionar o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMonitoring = async (id: string) => {
    try {
      const { error } = await supabase
        .from('monitoring_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMonitoringItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removido",
        description: "O monitoramento foi removido com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover monitoramento:', error);
      toast({
        title: "Erro ao remover item",
        description: "Não foi possível remover o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleStudySubmit = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    // Geocodificar a localização para obter as coordenadas
    const coordinates = geocodeLocation(data.location);
    
    if (coordinates) {
      try {
        // Inserir no Supabase
        const { data: newStudy, error } = await supabase
          .from('research_studies')
          .insert({
            title: data.title,
            author: data.author,
            co_authors: data.coAuthors,
            summary: data.summary,
            repository_url: data.repositoryUrl,
            location: data.location,
            coordinates: coordinates,
            type: data.type
          })
          .select()
          .single();
        
        if (error) throw error;
        
        // Converter formato do banco para formato da aplicação
        const formattedStudy: ResearchStudy = {
          id: newStudy.id,
          title: newStudy.title,
          author: newStudy.author,
          coAuthors: newStudy.co_authors,
          summary: newStudy.summary,
          repositoryUrl: newStudy.repository_url,
          location: newStudy.location,
          coordinates: newStudy.coordinates as [number, number],
          type: newStudy.type as "artigo" | "dissertacao" | "tese" | "outro"
        };
        
        // Atualizar estado
        setStudies(prev => [formattedStudy, ...prev]);
        studyForm.reset();
        
        toast({
          title: "Estudo adicionado",
          description: `"${data.title}" foi adicionado ao mapa.`
        });
      } catch (error) {
        console.error('Erro ao adicionar estudo:', error);
        toast({
          title: "Erro ao adicionar estudo",
          description: "Não foi possível adicionar o estudo ao banco de dados.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Erro de localização",
        description: "Não foi possível encontrar as coordenadas para a localização informada.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStudy = async (id: string) => {
    try {
      const { error } = await supabase
        .from('research_studies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setStudies(prev => prev.filter(study => study.id !== id));
      
      toast({
        title: "Análise removida",
        description: "A análise foi removida com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover estudo:', error);
      toast({
        title: "Erro ao remover análise",
        description: "Não foi possível remover a análise.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8">
          <div className="w-24"></div> {/* Espaço à esquerda para balancear */}
          <div className="text-center flex-1 flex justify-center">
            <p className="text-lg text-muted-foreground mt-2 ml-28"> {/* Movido 7cm (≈ 112px) para direita */}
              Monitoramento e Análise de Indicadores Regionais
            </p>
          </div>
          <div>
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <UserRound size={18} />
                <span className="hidden md:inline">Administrador</span>
                <LogOut size={18} />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsLoginDialogOpen(true)} className="flex items-center gap-2">
                <LogIn size={18} />
                <span className="hidden md:inline">Entrar</span>
              </Button>
            )}
          </div>
        </header>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            {isAuthenticated && <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>}
            {isAuthenticated && <TabsTrigger value="research">Pesquisa</TabsTrigger>}
            <TabsTrigger value="map">Mapa Interativo</TabsTrigger>
          </TabsList>

          {/* Aba do Dashboard */}
          <TabsContent value="dashboard">
            <Dashboard 
              data={initialMockData}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              handleExport={handleExport}
              isAuthenticated={isAuthenticated}
              monitoringItems={monitoringItems}
            />
          </TabsContent>

          {/* Aba de Monitoramento */}
          {isAuthenticated && (
            <TabsContent value="monitoring">
              <MonitoringForm 
                form={monitoringForm} 
                onSubmit={handleAddMonitoring} 
              />
              <MonitoringList 
                items={monitoringItems} 
                onDelete={handleDeleteMonitoring} 
                isLoading={isLoading}
              />
            </TabsContent>
          )}

          {/* Aba de Pesquisa */}
          {isAuthenticated && (
            <TabsContent value="research">
              <div className="grid gap-6 md:grid-cols-2">
                <ResearchForm 
                  form={studyForm} 
                  onSubmit={handleStudySubmit} 
                />
                <ResearchList 
                  studies={studies} 
                  onDelete={handleDeleteStudy}
                  isLoading={isLoading}
                />
              </div>
            </TabsContent>
          )}

          {/* Aba do Mapa */}
          <TabsContent value="map">
            <MapView studies={studies} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de Login */}
      <LoginDialog 
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        form={loginForm}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Index;

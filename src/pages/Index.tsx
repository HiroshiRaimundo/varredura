
import React, { useState } from "react";
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

// Types
interface MonitoringItem {
  id: string;
  name: string;
  url: string;
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
  
  const monitoringForm = useForm<Omit<MonitoringItem, "id">>();
  const loginForm = useForm<{ email: string; password: string }>();
  const studyForm = useForm<Omit<ResearchStudy, "id" | "coordinates">>();

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

  const handleAddMonitoring = (data: Omit<MonitoringItem, "id">) => {
    const newItem = {
      ...data,
      id: Date.now().toString()
    };
    setMonitoringItems(prev => [...prev, newItem]);
    monitoringForm.reset();
    toast({
      title: "Item adicionado",
      description: `Monitoramento de ${data.name} foi configurado.`
    });
  };

  const handleDeleteMonitoring = (id: string) => {
    setMonitoringItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O monitoramento foi removido com sucesso."
    });
  };

  const handleStudySubmit = (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    // Geocodificar a localização para obter as coordenadas
    const coordinates = geocodeLocation(data.location);
    
    if (coordinates) {
      // Cria um novo estudo com ID único
      const newStudy: ResearchStudy = {
        ...data,
        id: Date.now().toString(),
        coordinates
      };
      
      setStudies(prev => [...prev, newStudy]);
      studyForm.reset();
      
      toast({
        title: "Estudo adicionado",
        description: `"${data.title}" foi adicionado ao mapa.`
      });
    } else {
      toast({
        title: "Erro de localização",
        description: "Não foi possível encontrar as coordenadas para a localização informada.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Observatório de Desenvolvimento Regional
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
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
                <ResearchList studies={studies} />
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

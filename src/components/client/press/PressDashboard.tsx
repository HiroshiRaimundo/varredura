
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, FileText, Search, Newspaper, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";
import { PressReleaseData } from "@/components/admin/types/releaseTypes";

// Importe os componentes das respectivas pastas
import ChartsSection from "./dashboard/ChartsSection";

// Interfaces para as props de cada componente
interface SimpleReleaseData {
  id: string;
  title: string;
  status: string;
  date: string;
  views: number;
  published: boolean;
  publications: number;
}

interface AlertData {
  id: string;
  title: string;
  message: string;
  type: string;
}

// Props para os componentes customizados
interface DashboardHeaderProps {
  title: string;
  description: string;
}

interface ReleaseTableProps {
  releases: SimpleReleaseData[];
}

interface ActivityTabProps {
  activities: any[];
}

interface PublishedReleasesTabProps {
  releases: ReleaseMonitoringItem[];
}

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface StatisticsCardsProps {
  stats: {
    releases: number;
    published: number;
    views: number;
    pending: number;
  };
}

interface ReleaseAlertsProps {
  alerts: AlertData[];
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Componentes internos utilizados apenas neste arquivo
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const ReleaseTable: React.FC<ReleaseTableProps> = ({ releases }) => (
  <div className="space-y-2">
    {releases.map(release => (
      <div key={release.id} className="bg-background rounded-md p-3 border flex justify-between items-center">
        <div>
          <h3 className="font-medium">{release.title}</h3>
          <div className="flex space-x-2 text-xs text-muted-foreground">
            <span>Data: {release.date}</span>
            <span>Visualizações: {release.views}</span>
          </div>
        </div>
        <Badge variant={release.published ? "success" : "outline"}>
          {release.published ? "Publicado" : release.status}
        </Badge>
      </div>
    ))}
  </div>
);

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Atividades Recentes</h3>
    <div className="space-y-4">
      <p className="text-muted-foreground">Não há atividades recentes para mostrar.</p>
    </div>
  </div>
);

const PublishedReleasesTab: React.FC<PublishedReleasesTabProps> = ({ releases }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Releases Publicados</h3>
    <div className="space-y-4">
      {releases.length === 0 ? (
        <p className="text-muted-foreground">Não há releases publicados para mostrar.</p>
      ) : (
        releases.map(release => (
          <div key={release.id} className="bg-background rounded-md p-3 border">
            <h3 className="font-medium">{release.title}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              <p>Publicado em: {release.websiteName}</p>
              <p>Data: {release.publishedDate} às {release.publishedTime}</p>
              <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Ver publicação
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const DashboardTabsUI: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => (
  <TabsList className="grid grid-cols-3 mb-4">
    <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Visão Geral</TabsTrigger>
    <TabsTrigger value="activity" onClick={() => setActiveTab("activity")}>Atividades</TabsTrigger>
    <TabsTrigger value="publications" onClick={() => setActiveTab("publications")}>Publicações</TabsTrigger>
  </TabsList>
);

const StatisticsCardsUI: React.FC<StatisticsCardsProps> = ({ stats }) => (
  <div className="grid grid-cols-4 gap-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total de Releases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.releases}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Publicados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.published}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.views}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.pending}</div>
      </CardContent>
    </Card>
  </div>
);

const ReleaseAlertsUI: React.FC<ReleaseAlertsProps> = ({ alerts }) => (
  <div className="space-y-2">
    {alerts.map(alert => (
      <div key={alert.id} className={`p-3 rounded-md ${alert.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"} border`}>
        <h4 className={`font-medium ${alert.type === "warning" ? "text-yellow-800" : "text-green-800"}`}>{alert.title}</h4>
        <p className={`text-sm ${alert.type === "warning" ? "text-yellow-700" : "text-green-700"}`}>{alert.message}</p>
      </div>
    ))}
  </div>
);

const SearchBarUI: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <input
      type="text"
      placeholder="Buscar releases..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-8 pr-4 py-2 border rounded-md text-sm"
    />
  </div>
);

// Componente principal
interface PressDashboardProps {
  clientType?: string;
}

const PressDashboard: React.FC<PressDashboardProps> = ({ clientType = "press" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [publishedReleases, setPublishedReleases] = useState<ReleaseMonitoringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Dados para renderização dos releases
  const releasesData: SimpleReleaseData[] = [
    {
      id: "1",
      title: "Nova política ambiental para a Amazônia",
      status: "aprovado",
      date: "2023-05-10",
      views: 245,
      published: true,
      publications: 3
    },
    {
      id: "2",
      title: "Relatório anual sobre desmatamento",
      status: "pendente",
      date: "2023-05-08",
      views: 120,
      published: false,
      publications: 0
    },
    {
      id: "3",
      title: "Iniciativa de reflorestamento em áreas degradadas",
      status: "em_revisao",
      date: "2023-05-05",
      views: 89,
      published: false,
      publications: 0
    },
  ];

  const publishedReleasesData: ReleaseMonitoringItem[] = [
    {
      id: "1",
      releaseTitle: "Nova política ambiental para a Amazônia",
      title: "Nova política ambiental para a Amazônia",
      websiteName: "Portal Ambiental",
      publishedDate: "2023-04-15",
      publishedTime: "14:30",
      url: "https://example.com/release1",
      isVerified: true,
      status: "publicado",
      date: "2023-04-15",
      media: []
    },
    {
      id: "2",
      releaseTitle: "Relatório sobre desmatamento na região Norte",
      title: "Relatório sobre desmatamento na região Norte",
      websiteName: "Jornal do Meio Ambiente",
      publishedDate: "2023-04-12",
      publishedTime: "09:45",
      url: "https://example.com/release2",
      isVerified: true,
      status: "publicado",
      date: "2023-04-12",
      media: []
    },
  ];

  const alertsData: AlertData[] = [
    {
      id: "1",
      title: "Pendência de aprovação",
      message: "3 releases aguardando aprovação",
      type: "warning"
    },
    {
      id: "2",
      title: "Publicação verificada",
      message: "Seu release foi publicado em 2 novos sites",
      type: "success"
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setPublishedReleases(publishedReleasesData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard de Comunicação" 
        description="Gerencie seus releases e monitore publicações"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <StatisticsCardsUI 
          stats={{
            releases: releasesData.length, 
            published: releasesData.filter(r => r.published).length,
            views: releasesData.reduce((sum, r) => sum + r.views, 0),
            pending: releasesData.filter(r => r.status === "pendente").length
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Releases Recentes
                </CardTitle>
                <Button variant="outline" size="sm">Ver todos</Button>
              </div>
              <CardDescription>
                Seus últimos releases e status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <SearchBarUI searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
              <ReleaseTable 
                releases={releasesData.filter(release => 
                  release.title.toLowerCase().includes(searchTerm.toLowerCase())
                )}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Alertas
                </CardTitle>
                <Badge variant="outline">{alertsData.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ReleaseAlertsUI alerts={alertsData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartsSection />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <DashboardTabsUI activeTab={activeTab} setActiveTab={setActiveTab} />
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="overview" className="mt-0">
              <div className="grid gap-6">
                <h3 className="text-lg font-medium">Visão Geral</h3>
                {/* Conteúdo da visão geral */}
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-0">
              <ActivityTab activities={[]} />
            </TabsContent>
            <TabsContent value="publications" className="mt-0">
              <PublishedReleasesTab releases={publishedReleases} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressDashboard;

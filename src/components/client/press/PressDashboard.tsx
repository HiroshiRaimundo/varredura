
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, FileText, Search, Newspaper, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";
import ChartsSection from "./dashboard/ChartsSection";
import ReleaseTable from "./dashboard/ReleaseTable";
import ActivityTab from "./dashboard/ActivityTab";
import PublishedReleasesTab from "./dashboard/PublishedReleasesTab";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardTabs from "./dashboard/DashboardTabs";
import StatisticsCards from "./dashboard/StatisticsCards";
import ReleaseAlerts from "./dashboard/ReleaseAlerts";
import SearchBar from "./dashboard/SearchBar";

interface PressDashboardProps {
  clientType?: string;
}

const releasesData = [
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
    status: "publicado"
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
    status: "publicado"
  },
];

const alertsData = [
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

const PressDashboard: React.FC<PressDashboardProps> = ({ clientType = "press" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [publishedReleases, setPublishedReleases] = useState<ReleaseMonitoringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        <StatisticsCards 
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
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
              <ReleaseAlerts alerts={alertsData} />
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
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
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

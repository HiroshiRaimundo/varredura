
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart2, Newspaper, RefreshCw, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardMetricCard from './dashboard/DashboardMetricCard';
import MediaOverview from './dashboard/MediaOverview';
import PressReleaseTable from './dashboard/PressReleaseTable';
import SocialMediaStats from './dashboard/SocialMediaStats';
import { usePressReleaseDashboard } from './dashboard/usePressReleaseDashboard';

export interface PressReleaseDashboardProps {
  clientType: string;
}

const PressReleaseDashboard: React.FC<PressReleaseDashboardProps> = ({ clientType }) => {
  const {
    activeTab,
    setActiveTab,
    isRefreshing,
    refreshData,
    socialMediaStats,
    pressReleases,
    mediaOverviewStats
  } = usePressReleaseDashboard();

  const totalMentions = socialMediaStats.reduce((acc, curr) => acc + curr.mentions, 0);
  const totalEngagement = socialMediaStats.reduce((acc, curr) => acc + curr.engagement, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader 
          title="Monitoramento de Mídia" 
          description={`Acompanhe a presença da sua marca na imprensa e redes sociais`} 
        />
        <Button 
          variant="outline" 
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          {isRefreshing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {isRefreshing ? "Atualizando..." : "Atualizar dados"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardMetricCard
          title="Releases"
          value={32}
          icon={<Newspaper className="h-5 w-5 text-muted-foreground" />}
          badge={{ text: "Últimos 30 dias" }}
        />

        <DashboardMetricCard
          title="Publicações"
          value={27}
          icon={<BarChart2 className="h-5 w-5 text-muted-foreground" />}
          badge={{ text: "Taxa de 84%" }}
        />

        <DashboardMetricCard
          title="Menções em Redes"
          value={totalMentions}
          icon={<Share2 className="h-5 w-5 text-muted-foreground" />}
          badge={{ 
            text: "Aumento de 12%", 
            className: "bg-green-100 text-green-800 border-green-300" 
          }}
        />

        <DashboardMetricCard
          title="Engajamento Total"
          value={totalEngagement}
          icon={<Share2 className="h-5 w-5 text-muted-foreground" />}
          badge={{ text: "Interações" }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="press">Imprensa</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Visão geral do desempenho da sua marca na mídia nos últimos 30 dias.
              </p>
              <MediaOverview 
                pressStats={mediaOverviewStats.pressStats}
                socialStats={mediaOverviewStats.socialStats}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="press" className="space-y-4">
          <PressReleaseTable releases={pressReleases} />
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Monitore menções e engajamento da sua marca nas principais redes sociais.
              </p>
              
              <SocialMediaStats socialMediaStats={socialMediaStats} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressReleaseDashboard;

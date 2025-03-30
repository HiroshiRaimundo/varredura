
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Newspaper, 
  RefreshCw, 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from './dashboard/DashboardHeader';

export interface PressReleaseDashboardProps {
  clientType: string;
}

interface SocialMediaStat {
  platform: string;
  mentions: number;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

const PressReleaseDashboard: React.FC<PressReleaseDashboardProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dados mockados para redes sociais
  const socialMediaStats: SocialMediaStat[] = [
    { 
      platform: 'Facebook', 
      mentions: 28, 
      engagement: 342, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Facebook className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    },
    { 
      platform: 'Twitter', 
      mentions: 47, 
      engagement: 215, 
      sentiment: 'neutral', 
      trend: 'stable',
      icon: <Twitter className="h-5 w-5" />,
      color: 'bg-sky-100 text-sky-800 hover:bg-sky-200'
    },
    { 
      platform: 'Instagram', 
      mentions: 19, 
      engagement: 508, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Instagram className="h-5 w-5" />,
      color: 'bg-pink-100 text-pink-800 hover:bg-pink-200'
    },
    { 
      platform: 'LinkedIn', 
      mentions: 12, 
      engagement: 137, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    }
  ];

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulação de atualização de dados
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getSentimentBadge = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Positivo</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Neutro</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Negativo</Badge>;
      default:
        return null;
    }
  };

  const getTrendIndicator = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      default:
        return null;
    }
  };

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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">32</span>
              </div>
              <Badge variant="outline">Últimos 30 dias</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">27</span>
              </div>
              <Badge variant="outline">Taxa de 84%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Menções em Redes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{socialMediaStats.reduce((acc, curr) => acc + curr.mentions, 0)}</span>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">Aumento de 12%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engajamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{socialMediaStats.reduce((acc, curr) => acc + curr.engagement, 0)}</span>
              </div>
              <Badge variant="outline">Interações</Badge>
            </div>
          </CardContent>
        </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Imprensa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Releases Enviados</span>
                        <span className="font-medium">32</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Publicações</span>
                        <span className="font-medium">27</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Alcance Estimado</span>
                        <span className="font-medium">250K+</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Total de Menções</span>
                        <span className="font-medium">{socialMediaStats.reduce((acc, curr) => acc + curr.mentions, 0)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Engajamento</span>
                        <span className="font-medium">{socialMediaStats.reduce((acc, curr) => acc + curr.engagement, 0)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Sentimento Geral</span>
                        <span className="font-medium">Positivo (78%)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="press" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Imprensa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Acompanhe as publicações baseadas nos seus releases de imprensa.
              </p>

              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicações</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alcance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Nova Parceria Estratégica</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge className="bg-green-100 text-green-800 border-green-300">Publicado</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">8</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">75K+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Lançamento do Produto X</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge className="bg-green-100 text-green-800 border-green-300">Publicado</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">12</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">120K+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Relatório Anual</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Em processamento</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">30K+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Evento Corporativo</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge className="bg-green-100 text-green-800 border-green-300">Publicado</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">25K+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {socialMediaStats.map((platform) => (
                  <Card key={platform.platform} className="overflow-hidden">
                    <CardHeader className={`${platform.color} flex flex-row items-center justify-between py-4`}>
                      <div className="flex items-center space-x-2">
                        {platform.icon}
                        <CardTitle className="text-md font-semibold">{platform.platform}</CardTitle>
                      </div>
                      {getSentimentBadge(platform.sentiment)}
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Menções</p>
                          <p className="text-xl font-bold flex items-center">
                            {platform.mentions} {getTrendIndicator(platform.trend)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Engajamento</p>
                          <p className="text-xl font-bold">{platform.engagement}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Principais hashtags:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline">#marca</Badge>
                          <Badge variant="outline">#novidade</Badge>
                          <Badge variant="outline">#lançamento</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Menções Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="border-b pb-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Twitter className="h-5 w-5 text-sky-500" />
                        </div>
                        <div>
                          <p className="font-medium">@usuario123</p>
                          <p className="text-sm text-muted-foreground">Acabei de conhecer o novo produto da @suamarca e fiquei impressionado! Recomendo para todos. #inovação</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground gap-4">
                            <span>Há 2 horas</span>
                            <span>15 likes</span>
                            <span>3 retweets</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="border-b pb-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Instagram className="h-5 w-5 text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium">@influencer.digital</p>
                          <p className="text-sm text-muted-foreground">Parceria incrível com @suamarca! Conheçam os novos produtos na minha bio. #publi #parceria</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground gap-4">
                            <span>Há 5 horas</span>
                            <span>342 likes</span>
                            <span>27 comentários</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Facebook className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Grupo Tecnologia Hoje</p>
                          <p className="text-sm text-muted-foreground">Alguém já testou os produtos da @suamarca? Vale a pena o investimento? Estou pensando em comprar.</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground gap-4">
                            <span>Há 12 horas</span>
                            <span>8 likes</span>
                            <span>14 comentários</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressReleaseDashboard;

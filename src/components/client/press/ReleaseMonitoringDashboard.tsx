
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import DashboardHeader from './dashboard/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ReleaseMonitoringDashboardProps {
  title: string;
  description: string;
  releases: {
    id: string;
    title: string;
    date: string;
    media: string[];
    status: string;
  }[];
}

interface SocialMediaMention {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  profileName: string;
  content: string;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
}

const ReleaseMonitoringDashboard: React.FC<ReleaseMonitoringDashboardProps> = ({ 
  title, 
  description, 
  releases 
}) => {
  const [activeTab, setActiveTab] = useState('traditional');
  
  // Dados mockados para o monitoramento de redes sociais
  const socialMediaMentions: SocialMediaMention[] = [
    { 
      id: '1',
      platform: 'twitter',
      profileName: '@noticiasbr',
      content: 'Nova parceria estratégica anunciada hoje! #negocios #parceria',
      engagement: 156,
      sentiment: 'positive',
      date: '2023-05-11'
    },
    { 
      id: '2',
      platform: 'facebook',
      profileName: 'Portal de Notícias',
      content: 'Empresa anuncia nova parceria que promete revolucionar o setor...',
      engagement: 243,
      sentiment: 'neutral',
      date: '2023-05-12'
    },
    { 
      id: '3',
      platform: 'linkedin',
      profileName: 'Mercado & Finanças',
      content: 'Análise sobre o impacto da nova parceria estratégica no setor financeiro',
      engagement: 89,
      sentiment: 'positive',
      date: '2023-05-13'
    },
    { 
      id: '4',
      platform: 'instagram',
      profileName: '@noticias24h',
      content: 'Lançamento do produto X: veja as primeiras impressões #tecnologia #inovação',
      engagement: 517,
      sentiment: 'positive',
      date: '2023-05-16'
    }
  ];

  const getSocialIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'twitter': return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'linkedin': return <Linkedin className="h-4 w-4 text-blue-800" />;
      default: return null;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'negative': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return 'Positivo';
      case 'neutral': return 'Neutro';
      case 'negative': return 'Negativo';
      default: return 'Desconhecido';
    }
  };

  return (
    <div>
      <DashboardHeader
        title={title}
        description={description}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="traditional">Mídia Tradicional</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traditional">
          <Card>
            <CardHeader>
              <CardTitle>Releases em Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Veículos Monitorados</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {releases.map((release) => (
                    <TableRow key={release.id}>
                      <TableCell className="font-medium">{release.title}</TableCell>
                      <TableCell>{new Date(release.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {release.media.slice(0, 2).map((medium, i) => (
                            <Badge key={i} variant="outline">{medium}</Badge>
                          ))}
                          {release.media.length > 2 && (
                            <Badge variant="outline">+{release.media.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          release.status === 'active' 
                            ? 'bg-green-100 text-green-800 border-green-300' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        }>
                          {release.status === 'active' ? 'Ativo' : 'Pendente'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <AlertCircle className="h-4 w-4" />
                            <span className="sr-only">Notificações</span>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Marcar como verificado</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Menções em Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead>Engajamento</TableHead>
                    <TableHead>Sentimento</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {socialMediaMentions.map((mention) => (
                    <TableRow key={mention.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSocialIcon(mention.platform)}
                          <span className="capitalize">{mention.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>{mention.profileName}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={mention.content}>
                          {mention.content}
                        </div>
                      </TableCell>
                      <TableCell>{mention.engagement}</TableCell>
                      <TableCell>
                        <Badge className={getSentimentColor(mention.sentiment)}>
                          {getSentimentLabel(mention.sentiment)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(mention.date).toLocaleDateString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Menções</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8% em relação à semana passada</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sentimento Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Positivo</div>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>65% positivo</span>
                  <span>25% neutro</span>
                  <span>10% negativo</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Plataformas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-sm">Twitter</span>
                    </div>
                    <span>42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm">Facebook</span>
                    </div>
                    <span>28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 text-pink-600 mr-2" />
                      <span className="text-sm">Instagram</span>
                    </div>
                    <span>18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 text-blue-800 mr-2" />
                      <span className="text-sm">LinkedIn</span>
                    </div>
                    <span>12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engajamento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,005</div>
                <p className="text-xs text-muted-foreground">+12% em relação à semana passada</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReleaseMonitoringDashboard;

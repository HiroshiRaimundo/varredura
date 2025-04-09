
import React, { useState } from 'react';
import BackToAdminButton from '@/components/admin/BackToAdminButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pressMonitoringService } from '@/services/pressMonitoringService';
import ContentModerator from '@/components/admin/ContentModerator';
import { useToast } from '@/hooks/use-toast';

// Interface para representar os dados de um release
interface Release {
  id: string;
  title: string;
  clientName: string;
  status: 'pending' | 'approved' | 'rejected';
  content: string;
  date: string;
  feedback?: string;
}

const ReleasesManagement: React.FC = () => {
  const { toast } = useToast();
  const [releases, setReleases] = useState<Release[]>([
    {
      id: "rel-1",
      title: "Lançamento do novo produto eco-friendly",
      clientName: "Sustentabilidade SA",
      status: "pending",
      content: "A Sustentabilidade SA tem o prazer de anunciar o lançamento de seu mais novo produto eco-friendly...",
      date: "2025-03-15"
    },
    {
      id: "rel-2",
      title: "Resultados do primeiro trimestre superam expectativas",
      clientName: "Empresa ABC",
      status: "pending",
      content: "A Empresa ABC divulgou hoje seus resultados financeiros do primeiro trimestre de 2025...",
      date: "2025-03-20"
    },
    {
      id: "rel-3",
      title: "Nova parceria estratégica no setor de tecnologia",
      clientName: "Tech Solutions",
      status: "pending",
      content: "A Tech Solutions anunciou hoje uma nova parceria estratégica com a GlobalTech...",
      date: "2025-03-18"
    }
  ]);

  const handleApproveRelease = (id: string) => {
    // Atualizar o status do release para 'approved'
    setReleases(prev => 
      prev.map(release => 
        release.id === id 
          ? { ...release, status: 'approved' } 
          : release
      )
    );

    // Iniciar monitoramento via serviço
    const release = releases.find(r => r.id === id);
    if (release) {
      const result = pressMonitoringService.startMonitoring(
        id,
        release.title,
        ["contato1@midia.com", "contato2@midia.com"] // Exemplo de contatos
      );
      
      toast({
        title: "Release aprovado",
        description: `O release "${release.title}" foi aprovado e o monitoramento foi iniciado.`,
      });
    }
  };

  const handleRejectRelease = (id: string, feedback?: string) => {
    // Atualizar o status do release para 'rejected' e incluir feedback
    setReleases(prev => 
      prev.map(release => 
        release.id === id 
          ? { ...release, status: 'rejected', feedback } 
          : release
      )
    );

    const release = releases.find(r => r.id === id);
    if (release) {
      toast({
        title: "Release rejeitado",
        description: feedback 
          ? `O release "${release.title}" foi rejeitado com feedback.` 
          : `O release "${release.title}" foi rejeitado.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <BackToAdminButton />
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Releases</h1>
      
      <Tabs defaultValue="moderation" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="moderation">Moderação</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="moderation">
          <ContentModerator 
            releases={releases.map(release => ({
              id: release.id,
              title: release.title,
              clientName: release.clientName,
              status: release.status,
              content: release.content,
              publicationDate: release.date,
              monitoringActive: release.status === 'approved'
            }))}
            onApprove={handleApproveRelease}
            onReject={handleRejectRelease}
          />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Visualize o desempenho dos releases aprovados na imprensa.
                </p>
                
                {releases.filter(r => r.status === 'approved').length === 0 ? (
                  <div className="text-center py-8">
                    <p>Não há releases aprovados para monitorar no momento.</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {releases
                      .filter(r => r.status === 'approved')
                      .map(release => {
                        const monitoringResults = pressMonitoringService.getMonitoringResults(release.id);
                        return (
                          <li key={release.id} className="border rounded-lg p-4">
                            <h3 className="font-medium">{release.title}</h3>
                            <p className="text-sm text-muted-foreground">Cliente: {release.clientName}</p>
                            <div className="mt-2">
                              <p>Publicações encontradas: {monitoringResults.publications}</p>
                              <p>Última verificação: {new Date(monitoringResults.lastCheck).toLocaleDateString()}</p>
                              <p>Websites: {monitoringResults.websites.join(', ')}</p>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Aguardando Moderação</h3>
                  <p className="text-2xl font-bold">{releases.filter(r => r.status === 'pending').length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Aprovados</h3>
                  <p className="text-2xl font-bold text-green-600">{releases.filter(r => r.status === 'approved').length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Rejeitados</h3>
                  <p className="text-2xl font-bold text-red-600">{releases.filter(r => r.status === 'rejected').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReleasesManagement;

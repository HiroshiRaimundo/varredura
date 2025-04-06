
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import ReleasesList from "@/components/client/releases/ReleasesList";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AdvancedModerationInterface from "@/components/admin/releases/AdvancedModerationInterface";
import { pressMonitoringService } from "@/services/pressMonitoringService";

// Mock data for demonstration
import { ReleaseData } from "@/components/admin/types/releaseTypes";

const mockReleases: ReleaseData[] = [
  {
    id: '1',
    title: 'Novo estudo revela impactos da poluição',
    clientName: 'Observatório Ambiental',
    clientType: 'observatory',
    mediaOutlet: 'G1',
    publicationUrl: 'https://g1.com.br/meio-ambiente',
    publicationDate: '2023-08-01',
    publicationTime: '10:00',
    status: 'pending',
    content: 'Um novo estudo realizado pelo Observatório Ambiental revela dados alarmantes sobre os impactos da poluição atmosférica em grandes centros urbanos.',
    subtitle: 'Resultados preocupantes sobre a qualidade do ar',
    author: 'Maria Silva',
    monitoringActive: false
  },
  {
    id: '2',
    title: 'Empresa lança programa de sustentabilidade',
    clientName: 'Empresa Sustentável SA',
    clientType: 'institution',
    mediaOutlet: 'Valor Econômico',
    publicationUrl: 'https://valor.globo.com',
    publicationDate: '2023-07-25',
    publicationTime: '14:30',
    status: 'approved',
    content: 'A Empresa Sustentável SA anunciou hoje seu novo programa de responsabilidade ambiental, com metas ambiciosas para redução de emissões de carbono.',
    subtitle: 'Iniciativa visa reduzir emissões de carbono',
    author: 'Carlos Oliveira',
    monitoringActive: true
  },
  {
    id: '3',
    title: 'Resultados preliminares de pesquisa científica sobre clima',
    clientName: 'Instituto de Pesquisas Climáticas',
    clientType: 'research',
    mediaOutlet: 'Folha de São Paulo',
    publicationUrl: 'https://folha.uol.com.br',
    publicationDate: '2023-07-30',
    publicationTime: '09:15',
    status: 'pending',
    content: 'O Instituto de Pesquisas Climáticas divulgou hoje os resultados preliminares de seu estudo sobre mudanças nos padrões de precipitação na região Sudeste.',
    subtitle: 'Novos dados sobre mudanças nos padrões de chuva no Sudeste',
    author: 'Ana Rodrigues',
    monitoringActive: false
  }
];

const ReleasesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [selectedReleases, setSelectedReleases] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setReleases(mockReleases);
      setIsLoading(false);
    }, 800);
  }, []);
  
  const handleApproveRelease = (releaseId: string) => {
    setReleases(prevReleases => 
      prevReleases.map(release => 
        release.id === releaseId 
          ? { ...release, status: 'approved' } 
          : release
      )
    );
    
    toast({
      title: "Release aprovado",
      description: `Release #${releaseId} foi aprovado com sucesso.`
    });
  };
  
  const handleRejectRelease = (releaseId: string, feedback?: string) => {
    setReleases(prevReleases => 
      prevReleases.map(release => 
        release.id === releaseId 
          ? { ...release, status: 'rejected' } 
          : release
      )
    );
    
    toast({
      title: "Release rejeitado",
      description: feedback 
        ? `Release #${releaseId} foi rejeitado com feedback.` 
        : `Release #${releaseId} foi rejeitado.`
    });
  };
  
  const handleBulkApprove = () => {
    if (selectedReleases.length === 0) {
      toast({
        title: "Nenhum release selecionado",
        description: "Selecione ao menos um release para aprovar.",
        variant: "destructive"
      });
      return;
    }
    
    setReleases(prevReleases => 
      prevReleases.map(release => 
        selectedReleases.includes(release.id) 
          ? { ...release, status: 'approved' } 
          : release
      )
    );
    
    toast({
      title: "Releases aprovados",
      description: `${selectedReleases.length} releases foram aprovados com sucesso.`
    });
    
    setSelectedReleases([]);
  };
  
  const handleBulkReject = () => {
    if (selectedReleases.length === 0) {
      toast({
        title: "Nenhum release selecionado",
        description: "Selecione ao menos um release para rejeitar.",
        variant: "destructive"
      });
      return;
    }
    
    setReleases(prevReleases => 
      prevReleases.map(release => 
        selectedReleases.includes(release.id) 
          ? { ...release, status: 'rejected' } 
          : release
      )
    );
    
    toast({
      title: "Releases rejeitados",
      description: `${selectedReleases.length} releases foram rejeitados.`
    });
    
    setSelectedReleases([]);
  };
  
  const handleStartMonitoring = (releaseId: string) => {
    // Assumindo que o release já está aprovado
    const release = releases.find(r => r.id === releaseId);
    
    if (release) {
      // Integração com serviço de monitoramento
      try {
        pressMonitoringService.startMonitoring(
          releaseId, 
          release.title, 
          [release.mediaOutlet || "Mídia geral"]
        );
        
        setReleases(prevReleases => 
          prevReleases.map(r => 
            r.id === releaseId 
              ? { ...r, monitoringActive: true } 
              : r
          )
        );
        
        toast({
          title: "Monitoramento iniciado",
          description: `O release "${release.title}" será monitorado para menções na mídia.`
        });
      } catch (error) {
        console.error("Erro ao iniciar monitoramento:", error);
        toast({
          title: "Erro ao iniciar monitoramento",
          description: "Não foi possível iniciar o monitoramento para este release.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleToggleSelectRelease = (releaseId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedReleases(prev => [...prev, releaseId]);
    } else {
      setSelectedReleases(prev => prev.filter(id => id !== releaseId));
    }
  };

  // Filter releases based on active tab
  const filteredReleases = releases.filter(release => {
    if (activeTab === 'all') return true;
    return release.status === activeTab;
  });

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Releases</CardTitle>
          <CardDescription>
            Aprove, rejeite ou revise releases enviados pelos clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="pt-6">
              {activeTab === "pending" && (
                <div className="space-y-6">
                  <AdvancedModerationInterface
                    releases={releases.filter(r => r.status === 'pending')}
                    onApprove={handleApproveRelease}
                    onReject={handleRejectRelease}
                    onFilter={() => {}}
                  />
                  
                  <div className="mt-6 pt-6 border-t">
                    <h2 className="text-lg font-medium mb-4">Modo Simples (Legado)</h2>
                    <ReleasesList filter="pending" 
                      onSelectRelease={handleToggleSelectRelease}
                      selectedReleases={selectedReleases}
                    />
                    
                    <div className="mt-6 flex justify-end gap-2">
                      <Button variant="outline" onClick={handleBulkReject}>
                        Rejeitar Selecionados
                      </Button>
                      <Button onClick={handleBulkApprove}>
                        Aprovar Selecionados
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="approved" className="pt-6">
              <ReleasesList filter="approved" />
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monitoramento de Menções</CardTitle>
                    <CardDescription>
                      Ative o monitoramento para acompanhar menções dos releases aprovados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {releases.filter(r => r.status === 'approved').map(release => (
                        <div key={release.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <h3 className="font-medium">{release.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Cliente: {release.clientName} • Veículo: {release.mediaOutlet || 'N/A'}
                            </p>
                          </div>
                          <Button
                            variant={release.monitoringActive ? "outline" : "default"}
                            onClick={() => handleStartMonitoring(release.id)}
                            disabled={release.monitoringActive}
                          >
                            {release.monitoringActive ? 'Monitoramento Ativo' : 'Iniciar Monitoramento'}
                          </Button>
                        </div>
                      ))}
                      
                      {releases.filter(r => r.status === 'approved').length === 0 && (
                        <p className="text-center py-4 text-muted-foreground">
                          Nenhum release aprovado disponível para monitoramento.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="rejected" className="pt-6">
              <ReleasesList filter="rejected" />
            </TabsContent>
            
            <TabsContent value="all" className="pt-6">
              <ReleasesList filter="all" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleasesManagement;

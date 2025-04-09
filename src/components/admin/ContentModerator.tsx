
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { CheckCircle, XCircle, FileText, Calendar, Trash, Check, X, Bell, BellOff, Filter } from 'lucide-react';
import { ReleaseData } from './types/releaseTypes';
import { getStatusLabel, getStatusColor } from './utils/releaseUtils';
import { Badge } from '@/components/ui/badge';
import AdvancedModerationInterface from './releases/AdvancedModerationInterface';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ContentModeratorProps {
  releases?: ReleaseData[];
  onApprove?: (id: string) => void;
  onReject?: (id: string, feedback?: string) => void;
  onDelete?: (id: string) => void;
  onToggleMonitoring?: (id: string) => void;
  contents?: any[];
  onUpdateStatus?: (id: string, status: 'approved' | 'rejected', feedback?: string) => void;
}

const ContentModerator: React.FC<ContentModeratorProps> = ({ 
  contents, 
  onUpdateStatus,
  releases: propReleases,
  onApprove: propOnApprove,
  onReject: propOnReject,
  onDelete: propOnDelete,
  onToggleMonitoring: propOnToggleMonitoring
}) => {
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("standard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);

  useEffect(() => {
    if (propReleases) {
      setReleases(propReleases);
      setLoading(false);
      return;
    }
    
    // Mock data loading quando não recebemos releases via props
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
        content: 'Um novo estudo realizado pelo Observatório Ambiental revela dados alarmantes sobre os impactos da poluição atmosférica em grandes centros urbanos. De acordo com a pesquisa, a qualidade do ar em metrópoles como São Paulo tem diminuído consistentemente nos últimos 5 anos, com concentrações de material particulado ultrapassando em até 3 vezes os limites recomendados pela OMS.',
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
        content: 'A Empresa Sustentável SA anunciou hoje seu novo programa de responsabilidade ambiental, com metas ambiciosas para redução de emissões de carbono e eliminação de resíduos. De acordo com o CEO da empresa, João Pereira, o investimento inicial será de R$ 50 milhões, com foco em eficiência energética e adoção de fontes renováveis.',
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
        content: 'O Instituto de Pesquisas Climáticas divulgou hoje os resultados preliminares de seu estudo sobre mudanças nos padrões de precipitação na região Sudeste. Segundo os dados coletados nos últimos 18 meses, houve um aumento significativo na frequência de eventos extremos, com chuvas intensas concentradas em períodos mais curtos.',
        subtitle: 'Novos dados sobre mudanças nos padrões de chuva no Sudeste',
        author: 'Ana Rodrigues',
        monitoringActive: false
      },
      {
        id: '4',
        title: 'Comunicado oficial sobre nova legislação ambiental',
        clientName: 'Secretaria Estadual de Meio Ambiente',
        clientType: 'institution',
        mediaOutlet: 'Agência Brasil',
        publicationUrl: 'https://agenciabrasil.ebc.com.br',
        publicationDate: '2023-07-28',
        publicationTime: '16:45',
        status: 'approved',
        content: 'A Secretaria Estadual de Meio Ambiente emitiu hoje um comunicado oficial detalhando as novas diretrizes para licenciamento ambiental de empreendimentos industriais. As mudanças, que entram em vigor em 60 dias, visam agilizar o processo para projetos de baixo impacto, enquanto estabelecem critérios mais rigorosos para atividades potencialmente poluidoras.',
        subtitle: 'Novas regras para licenciamento ambiental',
        author: 'Departamento de Comunicação',
        monitoringActive: true
      },
      {
        id: '5',
        title: 'Análise das propostas ambientais dos candidatos',
        clientName: 'Deputado João Silva',
        clientType: 'politician',
        mediaOutlet: 'O Estado de S. Paulo',
        publicationUrl: 'https://estadao.com.br',
        publicationDate: '2023-07-31',
        publicationTime: '11:30',
        status: 'pending',
        content: 'Em declaração à imprensa, o deputado João Silva apresentou uma análise comparativa das propostas ambientais dos principais candidatos à prefeitura da capital. Segundo o parlamentar, apenas dois dos cinco candidatos possuem planos concretos para enfrentar os problemas de poluição urbana e gestão de resíduos sólidos.',
        subtitle: 'Deputado comenta planos dos candidatos à prefeitura',
        author: 'Assessoria de Imprensa',
        monitoringActive: false
      }
    ];

    setTimeout(() => {
      setReleases(mockReleases);
      setLoading(false);
    }, 500);
  }, [propReleases]);

  const handleApprove = (id: string) => {
    if (propOnApprove) {
      propOnApprove(id);
    } else {
      setReleases(releases.map(release =>
        release.id === id ? { ...release, status: 'approved' } : release
      ));
    }
    
    if (onUpdateStatus && contents) {
      onUpdateStatus(id, 'approved');
    }
  };

  const openRejectDialog = (id: string) => {
    setSelectedReleaseId(id);
    setRejectionFeedback("");
    setRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!selectedReleaseId) return;
    
    const id = selectedReleaseId;
    const feedback = rejectionFeedback.trim();
    
    if (propOnReject) {
      propOnReject(id, feedback || undefined);
    } else {
      setReleases(releases.map(release =>
        release.id === id ? { ...release, status: 'rejected', feedback } : release
      ));
    }
    
    if (onUpdateStatus && contents) {
      onUpdateStatus(id, 'rejected', feedback || undefined);
    }

    setRejectDialogOpen(false);
    setSelectedReleaseId(null);
    setRejectionFeedback("");
    
    toast({
      title: "Conteúdo rejeitado",
      description: "O feedback foi registrado e enviado para o cliente.",
    });
  };

  const handleDelete = (id: string) => {
    if (propOnDelete) {
      propOnDelete(id);
    } else {
      setReleases(releases.filter(release => release.id !== id));
    }
  };

  const handleToggleMonitoring = (id: string) => {
    if (propOnToggleMonitoring) {
      propOnToggleMonitoring(id);
    } else {
      setReleases(releases.map(release => {
        if (release.id === id) {
          return { ...release, monitoringActive: !release.monitoringActive };
        }
        return release;
      }));
    }
  };

  const filteredReleases = releases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleFilter = (filter: any) => {
    if (filter.searchTerm !== undefined) {
      setSearchTerm(filter.searchTerm);
    }
    
    if (filter.status !== undefined) {
      setStatusFilter(filter.status);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderação de Conteúdo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Moderação Padrão</TabsTrigger>
            <TabsTrigger value="advanced">Moderação Avançada</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard">
            {loading ? (
              <p>Carregando releases...</p>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Input
                    placeholder="Pesquisar por título ou cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="rejected">Rejeitados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReleases.map(release => (
                      <TableRow key={release.id}>
                        <TableCell>{release.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(release.status)}>
                            {getStatusLabel(release.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {release.status === 'pending' && (
                              <>
                                <Button size="sm" onClick={() => handleApprove(release.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Aprovar
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => openRejectDialog(release.id)}>
                                  <X className="h-4 w-4 mr-2" />
                                  Rejeitar
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(release.id)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Excluir
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleMonitoring(release.id)}
                            >
                              {release.monitoringActive ? (
                                <>
                                  <BellOff className="h-4 w-4 mr-2" />
                                  Desativar Monitoramento
                                </>
                              ) : (
                                <>
                                  <Bell className="h-4 w-4 mr-2" />
                                  Ativar Monitoramento
                                </>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced">
            {loading ? (
              <p>Carregando interface avançada...</p>
            ) : (
              <AdvancedModerationInterface
                releases={releases}
                onApprove={handleApprove}
                onReject={openRejectDialog}
                onFilter={handleFilter}
              />
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Justificativa para rejeição</DialogTitle>
              <DialogDescription>
                Forneça uma justificativa para a rejeição do conteúdo. Esta informação ajudará o cliente a entender os problemas e fazer as correções necessárias.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Descreva o motivo da rejeição e forneça orientações para correção..."
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
              className="min-h-[120px]"
            />
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Rejeitar com Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContentModerator;

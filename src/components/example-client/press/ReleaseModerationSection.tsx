
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Eye, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados mockados para simular releases pendentes de moderação
const mockPendingReleases = [
  {
    id: "1",
    title: "Novo programa de impacto social na região metropolitana",
    clientName: "ONG Viver Melhor",
    date: "2024-05-20",
    status: "pending",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl."
  },
  {
    id: "2",
    title: "Lançamento da campanha de conscientização ambiental",
    clientName: "Instituto Verde",
    date: "2024-05-19",
    status: "pending",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl."
  },
  {
    id: "3",
    title: "Resultados da pesquisa sobre hábitos de consumo sustentável",
    clientName: "Consumo Consciente SA",
    date: "2024-05-18",
    status: "pending",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl."
  }
];

// Dados mockados para simular releases já moderados
const mockModeratedReleases = [
  {
    id: "4",
    title: "Inauguração do novo centro de pesquisa",
    clientName: "Instituto Científico",
    date: "2024-05-17",
    status: "approved",
    publishDate: "2024-05-18",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl."
  },
  {
    id: "5",
    title: "Resultados financeiros do primeiro trimestre",
    clientName: "Empresa XYZ",
    date: "2024-05-16",
    status: "rejected",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.",
    feedback: "O conteúdo contém informações financeiras que precisam ser verificadas. Por favor, adicione fontes para os dados apresentados e detalhe melhor a metodologia utilizada para os cálculos."
  },
  {
    id: "6",
    title: "Novo sistema de gestão ambiental implementado",
    clientName: "Sustentabilidade Corp",
    date: "2024-05-15",
    status: "approved",
    publishDate: "2024-05-16",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl."
  }
];

interface ReleaseModerationSectionProps {
  onRefresh?: () => void;
}

const ReleaseModerationSection: React.FC<ReleaseModerationSectionProps> = ({ onRefresh }) => {
  const [pendingReleases, setPendingReleases] = useState(mockPendingReleases);
  const [moderatedReleases, setModeratedReleases] = useState(mockModeratedReleases);
  const [viewingRelease, setViewingRelease] = useState<any>(null);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    // Simulação de aprovação do release
    setPendingReleases(pendingReleases.filter(release => release.id !== id));
    const approvedRelease = pendingReleases.find(release => release.id === id);
    if (approvedRelease) {
      const now = new Date();
      const publishDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      
      setModeratedReleases([
        {
          ...approvedRelease,
          status: "approved",
          publishDate
        },
        ...moderatedReleases
      ]);
      
      toast({
        title: "Release aprovado",
        description: `O release "${approvedRelease.title}" foi aprovado com sucesso.`,
      });
    }
    setViewingRelease(null);
  };

  const handleReject = (id: string) => {
    // Simulação de rejeição do release
    setPendingReleases(pendingReleases.filter(release => release.id !== id));
    const rejectedRelease = pendingReleases.find(release => release.id === id);
    if (rejectedRelease) {
      setModeratedReleases([
        {
          ...rejectedRelease,
          status: "rejected",
          feedback: viewingRelease.feedback || "Seu release foi rejeitado. Entre em contato com o moderador para mais informações."
        },
        ...moderatedReleases
      ]);
      
      toast({
        title: "Release rejeitado",
        description: `O release "${rejectedRelease.title}" foi rejeitado.`,
        variant: "destructive"
      });
    }
    setViewingRelease(null);
  };

  const viewRelease = (release: any) => {
    // Inicialize o feedback como vazio se estiver vendo um release para dar feedback
    setViewingRelease({
      ...release,
      feedback: release.feedback || ""
    });
  };

  const closeViewRelease = () => {
    setViewingRelease(null);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setViewingRelease({
      ...viewingRelease,
      feedback: e.target.value
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprovado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderação de Releases</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="flex gap-2">
              <Clock className="h-4 w-4" />
              Pendentes ({pendingReleases.length})
            </TabsTrigger>
            <TabsTrigger value="moderated" className="flex gap-2">
              <CheckCircle className="h-4 w-4" />
              Moderados ({moderatedReleases.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingReleases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Não há releases pendentes de moderação.</p>
              </div>
            ) : (
              pendingReleases.map((release) => (
                <div key={release.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">Cliente: {release.clientName}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                        <div className="ml-2">{getStatusBadge(release.status)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => viewRelease(release)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="moderated" className="space-y-4">
            {moderatedReleases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Não há releases moderados.</p>
              </div>
            ) : (
              moderatedReleases.map((release) => (
                <div key={release.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">Cliente: {release.clientName}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                        {release.publishDate && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="text-sm text-muted-foreground">Publicado: {release.publishDate}</span>
                          </>
                        )}
                        <div className="ml-2">{getStatusBadge(release.status)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => viewRelease(release)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                      {release.status === 'rejected' && release.feedback && (
                        <Badge className="bg-red-50 text-red-700 flex items-center gap-1 cursor-help" title={release.feedback}>
                          <AlertCircle className="h-3 w-3" />
                          Feedback disponível
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {viewingRelease && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{viewingRelease.title}</h2>
                  <p className="text-sm text-muted-foreground">Cliente: {viewingRelease.clientName}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{viewingRelease.date}</span>
                    {viewingRelease.publishDate && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="text-sm text-muted-foreground">Publicado: {viewingRelease.publishDate}</span>
                      </>
                    )}
                    <div className="ml-2">{getStatusBadge(viewingRelease.status)}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeViewRelease}>X</Button>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <p className="whitespace-pre-line">{viewingRelease.content}</p>
              </div>
              
              {viewingRelease.status === 'rejected' && viewingRelease.feedback && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <h3 className="text-red-700 font-medium flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    Feedback do moderador
                  </h3>
                  <p className="text-red-700 whitespace-pre-line">{viewingRelease.feedback}</p>
                </div>
              )}
              
              {viewingRelease.status === 'pending' && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1 border-red-500 text-red-500 hover:bg-red-50"
                    onClick={() => handleReject(viewingRelease.id)}
                  >
                    <XCircle className="h-4 w-4" />
                    Rejeitar
                  </Button>
                  <Button 
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(viewingRelease.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Aprovar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseModerationSection;

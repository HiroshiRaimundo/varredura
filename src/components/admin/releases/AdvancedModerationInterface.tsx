
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ReleaseData } from "../types/releaseTypes";
import { ReleaseAnalysis, ReleaseModeration } from "@/types/adminTypes";
import { getMockReleaseAnalysis } from "@/types/adminTypes";
import { AlertCircle, Check, FileText, AlertTriangle, Clock, ThumbsUp, BarChart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdvancedModerationInterfaceProps {
  releases: ReleaseData[];
  onApprove: (id: string) => void;
  onReject: (id: string, feedback?: string) => void;
  onFilter: (filter: any) => void;
}

const AdvancedModerationInterface: React.FC<AdvancedModerationInterfaceProps> = ({
  releases,
  onApprove,
  onReject,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedRelease, setSelectedRelease] = useState<ReleaseData | null>(null);
  const [releaseAnalysis, setReleaseAnalysis] = useState<ReleaseAnalysis | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [moderationHistory, setModerationHistory] = useState<ReleaseModeration[]>([]);

  // Load release analysis when a release is selected
  useEffect(() => {
    if (selectedRelease) {
      // In a real application, this would be an API call
      const analysis = getMockReleaseAnalysis(selectedRelease.id);
      setReleaseAnalysis(analysis);
      
      // Mock moderation history
      setModerationHistory([
        {
          id: `mod-${Math.random().toString(36).substring(7)}`,
          releaseId: selectedRelease.id,
          moderatorId: "mod-1",
          moderatorName: "Ana Silva",
          action: "edit",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          comments: "Ajustei alguns termos para evitar problemas de compliance.",
          editedContent: "Texto editado do release..."
        },
        {
          id: `mod-${Math.random().toString(36).substring(7)}`,
          releaseId: selectedRelease.id,
          moderatorId: "mod-2",
          moderatorName: "Carlos Oliveira",
          action: "comment",
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          comments: "Por favor, adicione mais dados técnicos e reduza o conteúdo promocional."
        }
      ]);
    }
  }, [selectedRelease]);

  // Calculate priority score based on keywords, client type, etc.
  const calculatePriority = (release: ReleaseData): 'high' | 'medium' | 'low' => {
    const keywordsList = ["urgente", "importante", "lançamento", "exclusivo"];
    
    const hasKeywords = keywordsList.some(keyword => 
      release.title.toLowerCase().includes(keyword) || 
      (release.content?.toLowerCase().includes(keyword) ?? false)
    );
    
    if (hasKeywords || release.clientType === 'politician') {
      return 'high';
    } else if (release.clientType === 'institution' || release.clientType === 'journalist') {
      return 'medium';
    } else {
      return 'low';
    }
  };

  // Filter releases based on search term, priority, and status
  const filteredReleases = releases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          release.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const priority = calculatePriority(release);
    const matchesPriority = priorityFilter === 'all' || priorityFilter === priority;
    
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Sort releases by priority (high first)
  const sortedReleases = [...filteredReleases].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const aPriority = calculatePriority(a);
    const bPriority = calculatePriority(b);
    
    return priorityOrder[aPriority] - priorityOrder[bPriority];
  });

  const handleViewRelease = (release: ReleaseData) => {
    setSelectedRelease(release);
  };

  const handleApprove = () => {
    if (selectedRelease) {
      onApprove(selectedRelease.id);
      toast({
        title: "Release aprovado",
        description: `O release "${selectedRelease.title}" foi aprovado com sucesso.`
      });
      setSelectedRelease(null);
    }
  };

  const handleOpenReject = () => {
    setFeedbackOpen(true);
  };

  const handleReject = () => {
    if (selectedRelease) {
      onReject(selectedRelease.id, feedback);
      toast({
        title: "Release rejeitado",
        description: `O release "${selectedRelease.title}" foi rejeitado.`
      });
      setSelectedRelease(null);
      setFeedbackOpen(false);
      setFeedback("");
    }
  };

  const handleHighlight = () => {
    // In a real app, this would add the highlighted text to a feedback
    if (highlightedText) {
      setFeedback(prev => 
        prev + `\n\nTrecho destacado: "${highlightedText}"\nSugestão: Revise este trecho.`
      );
      toast({
        title: "Trecho destacado",
        description: "O trecho foi adicionado ao feedback."
      });
      setHighlightedText("");
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setHighlightedText(selection.toString());
    }
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    const classes = {
      high: "bg-red-100 text-red-800 hover:bg-red-100",
      medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      low: "bg-blue-100 text-blue-800 hover:bg-blue-100"
    };
    
    const labels = {
      high: "Alta",
      medium: "Média",
      low: "Baixa"
    };
    
    return <Badge className={classes[priority]}>{labels[priority]}</Badge>;
  };

  const getFeedbackTemplate = (type: string) => {
    const templates = {
      promotional: "Conteúdo promocional excessivo → reescreva com dados técnicos",
      length: "Conteúdo muito extenso → condense em parágrafos mais diretos",
      claims: "Afirmações sem embasamento → inclua fontes ou dados",
      format: "Formatação inadequada → siga o template padrão"
    };
    
    setFeedback(prev => prev + `\n\n${templates[type as keyof typeof templates]}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Moderação Avançada de Releases</CardTitle>
          <CardDescription>
            Aprove, rejeite ou solicite melhorias em releases com ferramentas avançadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Pesquisar por título ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              
              <Select 
                value={priorityFilter} 
                onValueChange={setPriorityFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="approved">Aprovados</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Sugestão</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReleases.length > 0 ? (
                    sortedReleases.map((release) => (
                      <TableRow key={release.id}>
                        <TableCell className="font-medium">{release.title}</TableCell>
                        <TableCell>{release.clientName}</TableCell>
                        <TableCell>{getPriorityBadge(calculatePriority(release))}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              release.status === 'approved' ? 'bg-green-100 text-green-800' :
                              release.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {release.status === 'approved' ? 'Aprovado' : 
                             release.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                          </Badge>
                        </TableCell>
                        <TableCell>{release.publicationDate || 'N/A'}</TableCell>
                        <TableCell>
                          {release.status === 'pending' && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {Math.random() > 0.5 ? 'Aprovar' : 'Revisar'}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRelease(release)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Nenhum release encontrado com os filtros aplicados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedRelease && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedRelease.title}</CardTitle>
                <CardDescription>
                  Cliente: {selectedRelease.clientName} · Enviado em: {selectedRelease.publicationDate || 'N/A'}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setSelectedRelease(null)}>×</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
                <TabsTrigger value="analysis">Análise Inteligente</TabsTrigger>
                <TabsTrigger value="history">Histórico de Moderação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="space-y-4 pt-4">
                <div 
                  className="border p-4 rounded-md bg-white min-h-[200px]"
                  onMouseUp={handleTextSelection}
                >
                  <h3 className="text-xl font-bold mb-2">{selectedRelease.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    Por {selectedRelease.author || 'Autor não especificado'} · {selectedRelease.mediaOutlet || 'Veículo não especificado'}
                  </p>
                  <div className="whitespace-pre-line">
                    {selectedRelease.content || 
                     `Este é um conteúdo de exemplo para o release "${selectedRelease.title}".
                      
                     O release contém informações detalhadas sobre o tema, incluindo dados técnicos, citações e informações sobre o cliente.
                     
                     O release foi enviado para moderação e está aguardando aprovação para ser distribuído para a imprensa.`}
                  </div>
                </div>
                
                {highlightedText && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                    <p className="font-medium">Trecho selecionado:</p>
                    <p className="text-sm italic">"{highlightedText}"</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={handleHighlight}>
                        Adicionar ao feedback
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleOpenReject}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Rejeitar com feedback
                  </Button>
                  <Button onClick={handleApprove}>
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar release
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-6 pt-4">
                {releaseAnalysis && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">{releaseAnalysis.similarityScore.toFixed(1)}%</div>
                            <p className="text-sm text-muted-foreground">Similaridade com conteúdo aprovado</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600 mb-1">{releaseAnalysis.riskScore.toFixed(1)}%</div>
                            <p className="text-sm text-muted-foreground">Risco de termos bloqueados</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">{releaseAnalysis.engagementPrediction.toFixed(1)}%</div>
                            <p className="text-sm text-muted-foreground">Previsão de engajamento</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Termos destacados:</h3>
                      {releaseAnalysis.flaggedTerms.length > 0 ? (
                        <ul className="space-y-2">
                          {releaseAnalysis.flaggedTerms.map((term, index) => (
                            <li key={index} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-md">
                              <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                                term.severity === 'high' ? 'text-red-500' : 
                                term.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                              }`} />
                              <div>
                                <p className="font-medium">"{term.term}"</p>
                                <p className="text-sm text-muted-foreground">
                                  Severidade: {
                                    term.severity === 'high' ? 'Alta' : 
                                    term.severity === 'medium' ? 'Média' : 'Baixa'
                                  }
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">Nenhum termo problemático encontrado.</p>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          releaseAnalysis.suggestedAction === 'approve' ? 'bg-green-100' : 
                          releaseAnalysis.suggestedAction === 'review' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {releaseAnalysis.suggestedAction === 'approve' ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : releaseAnalysis.suggestedAction === 'review' ? (
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Sugestão do sistema: {
                            releaseAnalysis.suggestedAction === 'approve' ? 'Aprovar' : 
                            releaseAnalysis.suggestedAction === 'review' ? 'Revisar' : 'Rejeitar'
                          }</h3>
                          <p className="text-sm text-muted-foreground">{releaseAnalysis.reasoning}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="pt-4">
                {moderationHistory.length > 0 ? (
                  <ul className="space-y-4">
                    {moderationHistory.map((history) => (
                      <li key={history.id} className="border-b pb-4">
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{history.moderatorName}</span>
                            <Badge variant="outline">
                              {history.action === 'approve' ? 'Aprovou' : 
                               history.action === 'reject' ? 'Rejeitou' : 
                               history.action === 'edit' ? 'Editou' : 'Comentou'}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(history.timestamp).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {history.comments && (
                          <p className="mt-2 text-sm whitespace-pre-line">{history.comments}</p>
                        )}
                        {history.editedContent && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                            <p className="font-medium">Conteúdo editado:</p>
                            <p className="mt-1 whitespace-pre-line">{history.editedContent}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Nenhum histórico de moderação disponível.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback para rejeição</DialogTitle>
            <DialogDescription>
              Forneça feedback detalhado sobre por que o release está sendo rejeitado.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Digite o feedback para o cliente..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[150px]"
            />
            
            <div>
              <p className="text-sm font-medium mb-2">Modelos de feedback rápido:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => getFeedbackTemplate('promotional')}
                >
                  Conteúdo promocional
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => getFeedbackTemplate('length')}
                >
                  Muito extenso
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => getFeedbackTemplate('claims')}
                >
                  Afirmações sem embasamento
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => getFeedbackTemplate('format')}
                >
                  Formatação inadequada
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setFeedbackOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
            >
              Rejeitar Release
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvancedModerationInterface;

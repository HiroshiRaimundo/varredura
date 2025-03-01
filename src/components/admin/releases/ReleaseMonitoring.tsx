
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReleaseData, ReleaseMonitoring, ReleaseMonitoringResult } from "../types/releaseTypes";
import { Bell, BellOff, RefreshCw, Globe, Calendar, Clock, Check, X, ExternalLink } from "lucide-react";
import { checkReleasePublications, createMonitoringFromRelease } from "../utils/releaseUtils";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface ReleaseMonitoringProps {
  release: ReleaseData;
}

const ReleaseMonitoring: React.FC<ReleaseMonitoringProps> = ({ release }) => {
  const [monitoring, setMonitoring] = useState<ReleaseMonitoring | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize monitoring if release has monitoringActive flag
    if (release.monitoringActive && !monitoring) {
      setMonitoring(createMonitoringFromRelease(release));
    }
  }, [release, monitoring]);

  const handleToggleMonitoring = () => {
    if (monitoring) {
      setMonitoring(prev => prev ? { ...prev, status: prev.status === 'active' ? 'paused' : 'active' } : null);
      
      toast({
        title: monitoring.status === 'active' ? "Monitoramento pausado" : "Monitoramento ativado",
        description: `O monitoramento para "${release.title}" foi ${monitoring.status === 'active' ? 'pausado' : 'reativado'}.`
      });
    } else {
      const newMonitoring = createMonitoringFromRelease(release);
      setMonitoring(newMonitoring);
      
      toast({
        title: "Monitoramento iniciado",
        description: `O monitoramento para "${release.title}" foi iniciado.`
      });
    }
  };

  const handleRefreshMonitoring = async () => {
    if (!monitoring) return;
    
    setIsLoading(true);
    
    try {
      // Simulate checking for new publications
      const results = await checkReleasePublications(monitoring);
      
      if (results.length > 0) {
        setMonitoring(prev => {
          if (!prev) return null;
          return {
            ...prev,
            lastChecked: new Date().toISOString(),
            results: [...prev.results, ...results]
          };
        });
        
        toast({
          title: "Publicações encontradas!",
          description: `Foram encontradas ${results.length} novas publicações para o release.`
        });
      } else {
        setMonitoring(prev => {
          if (!prev) return null;
          return {
            ...prev,
            lastChecked: new Date().toISOString()
          };
        });
        
        toast({
          title: "Verificação concluída",
          description: "Nenhuma nova publicação foi encontrada."
        });
      }
    } catch (error) {
      console.error("Erro ao verificar publicações:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao verificar publicações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Monitoramento de Publicações</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal">
              {monitoring?.status === 'active' ? 'Ativo' : 'Inativo'}
            </span>
            <Switch 
              checked={monitoring?.status === 'active'} 
              onCheckedChange={handleToggleMonitoring}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {monitoring ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Monitorando <span className="font-medium">{monitoring.targetWebsites.length}</span> sites para o release <span className="font-medium">"{monitoring.releaseTitle}"</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Última verificação: {formatDate(monitoring.lastChecked)} às {formatTime(monitoring.lastChecked)}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshMonitoring}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Verificar agora</span>
              </Button>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Sites monitorados:</h3>
              <div className="flex flex-wrap gap-2">
                {monitoring.targetWebsites.map((site, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {site}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Resultados encontrados:</h3>
              {monitoring.results.length > 0 ? (
                <ScrollArea className="h-[250px] rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Trecho</TableHead>
                        <TableHead>Verificado</TableHead>
                        <TableHead className="w-[80px]">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monitoring.results.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>{result.websiteName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(result.foundDate)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {result.foundTime}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {result.excerptFound}
                          </TableCell>
                          <TableCell>
                            {result.verified ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-600" />
                            )}
                          </TableCell>
                          <TableCell>
                            <a 
                              href={result.foundUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-primary hover:underline"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Abrir</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <p className="text-muted-foreground">Nenhuma publicação encontrada ainda.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Monitoramento não ativado para este release.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={handleToggleMonitoring}
            >
              Iniciar monitoramento
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseMonitoring;

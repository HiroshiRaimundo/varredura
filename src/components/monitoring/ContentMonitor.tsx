import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, AlertCircle, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface Publication {
  id: string;
  url: string;
  website: string;
  title: string;
  publishedAt: string;
  relevance: number; // 0-100 baseado na similaridade do título
  status: 'new' | 'viewed' | 'archived';
  excerpt: string;
}

interface ContentMonitorProps {
  contentId: string;
  contentTitle: string;
  distributedAt: string;
  distributedTo: string[];
}

const ContentMonitor: React.FC<ContentMonitorProps> = ({
  contentId,
  contentTitle,
  distributedAt,
  distributedTo
}) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastCheck, setLastCheck] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [customMonitoringTerms, setCustomMonitoringTerms] = useState<string[]>([]);

  // Mock data - substituir por chamada real à API de monitoramento
  const mockPublications: Publication[] = [
    {
      id: '1',
      url: 'https://g1.globo.com/exemplo',
      website: 'G1',
      title: contentTitle,
      publishedAt: '2025-03-05T10:30:00',
      relevance: 95,
      status: 'new',
      excerpt: 'O artigo aborda...'
    },
    {
      id: '2',
      url: 'https://folha.com/exemplo',
      website: 'Folha de São Paulo',
      title: 'Título similar com algumas palavras diferentes',
      publishedAt: '2025-03-05T11:15:00',
      relevance: 87,
      status: 'viewed',
      excerpt: 'A matéria discute...'
    }
  ];

  useEffect(() => {
    // Simula o monitoramento contínuo
    const interval = setInterval(() => {
      if (isMonitoring) {
        checkForNewPublications();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring, contentTitle, customMonitoringTerms]);

  const checkForNewPublications = () => {
    // Aqui você implementaria a lógica real de busca por publicações
    // usando o título original e os termos de monitoramento personalizados
    
    // Simula a busca por novas publicações
    const newPubs = mockPublications.filter(
      pub => !publications.find(p => p.id === pub.id)
    );

    if (newPubs.length > 0) {
      setPublications(prev => [...prev, ...newPubs]);
      toast({
        title: "Novas publicações encontradas!",
        description: `Encontramos ${newPubs.length} novas publicações relacionadas ao seu conteúdo.`,
      });
    }

    setLastCheck(new Date());
  };

  const addMonitoringTerm = (term: string) => {
    if (term && !customMonitoringTerms.includes(term)) {
      setCustomMonitoringTerms(prev => [...prev, term]);
      toast({
        title: "Termo adicionado",
        description: `"${term}" foi adicionado aos termos de monitoramento.`,
      });
    }
  };

  const removeMonitoringTerm = (term: string) => {
    setCustomMonitoringTerms(prev => prev.filter(t => t !== term));
  };

  const markAsViewed = (pubId: string) => {
    setPublications(prev =>
      prev.map(pub =>
        pub.id === pubId
          ? { ...pub, status: 'viewed' }
          : pub
      )
    );
  };

  const getRelevanceBadge = (relevance: number) => {
    if (relevance >= 90) return <Badge className="bg-green-500">Alta Similaridade</Badge>;
    if (relevance >= 70) return <Badge className="bg-yellow-500">Média Similaridade</Badge>;
    return <Badge className="bg-red-500">Baixa Similaridade</Badge>;
  };

  const filteredPublications = publications.filter(pub =>
    searchTerm
      ? pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.website.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Monitoramento de Publicações</h3>
          <p className="text-sm text-muted-foreground">
            Título monitorado: {contentTitle}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkForNewPublications}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar agora
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Termos de Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Adicionar termo para monitoramento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchTerm) {
                    addMonitoringTerm(searchTerm);
                    setSearchTerm('');
                  }
                }}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  if (searchTerm) {
                    addMonitoringTerm(searchTerm);
                    setSearchTerm('');
                  }
                }}
              >
                Adicionar
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {contentTitle}
                <span className="ml-2 text-xs">(principal)</span>
              </Badge>
              {customMonitoringTerms.map(term => (
                <Badge
                  key={term}
                  variant="outline"
                  className="px-3 py-1 cursor-pointer"
                  onClick={() => removeMonitoringTerm(term)}
                >
                  {term}
                  <span className="ml-2 text-xs">(×)</span>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Status do Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{publications.length}</p>
              <p className="text-sm text-muted-foreground">Publicações encontradas</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{distributedTo.length}</p>
              <p className="text-sm text-muted-foreground">Canais monitorados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {publications.filter(p => p.relevance >= 90).length}
              </p>
              <p className="text-sm text-muted-foreground">Alta similaridade</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {publications.filter(p => p.relevance >= 70 && p.relevance < 90).length}
              </p>
              <p className="text-sm text-muted-foreground">Média similaridade</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Publicações Encontradas</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar publicações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className={`p-4 border rounded-lg ${
                    pub.status === 'new' ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{pub.website}</h4>
                          {pub.status === 'new' && (
                            <Badge variant="outline" className="text-green-500">
                              Novo
                            </Badge>
                          )}
                          {getRelevanceBadge(pub.relevance)}
                        </div>
                        <p className="font-medium">{pub.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {pub.excerpt}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => {
                          window.open(pub.url, '_blank');
                          markAsViewed(pub.id);
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver publicação
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Publicado em: {new Date(pub.publishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {filteredPublications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>Ainda não encontramos publicações do seu conteúdo.</p>
                  <p className="text-sm">Continuamos monitorando...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentMonitor;

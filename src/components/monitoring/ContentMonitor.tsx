import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Publication {
  id: string;
  title: string;
  source: string;
  url: string;
  category: string;
  date: string;
  keywords: string[];
  content: string;
  status: 'new' | 'read' | 'archived';
}

// Dados de exemplo para publicações
const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Abertura de Licitação: Aquisição de Equipamentos de TI',
    source: 'Portal da Transparência',
    url: 'https://www.portaltransparencia.gov.br/licitacoes/123456',
    category: 'Licitações',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
    keywords: ['licitação', 'TI', 'equipamentos'],
    content: 'Processo licitatório para aquisição de computadores, notebooks e periféricos para modernização do parque tecnológico...',
    status: 'new'
  },
  {
    id: '2',
    title: 'Nomeação de Novos Servidores',
    source: 'Diário Oficial',
    url: 'https://www.in.gov.br/123456',
    category: 'Diário Oficial',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 horas atrás
    keywords: ['nomeação', 'servidor', 'cargo'],
    content: 'Ato de nomeação dos candidatos aprovados no concurso público para os cargos de Analista e Técnico...',
    status: 'read'
  },
  {
    id: '3',
    title: 'Atualização do IPCA - Fevereiro 2025',
    source: 'IBGE',
    url: 'https://www.ibge.gov.br/indicadores/ipca/2025-02',
    category: 'Indicadores',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    keywords: ['IPCA', 'inflação', 'índice'],
    content: 'O Índice Nacional de Preços ao Consumidor Amplo (IPCA) do mês de fevereiro de 2025 apresentou variação de...',
    status: 'read'
  },
  {
    id: '4',
    title: 'Novo Decreto Regulamenta Lei de Licitações',
    source: 'Planalto',
    url: 'https://www.planalto.gov.br/decretos/2025/123456',
    category: 'Legislação',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    keywords: ['decreto', 'licitações', 'regulamentação'],
    content: 'Publicado decreto que regulamenta aspectos da nova Lei de Licitações, estabelecendo procedimentos para...',
    status: 'archived'
  },
  {
    id: '5',
    title: 'Contrato de Prestação de Serviços de Manutenção',
    source: 'Portal da Transparência',
    url: 'https://www.portaltransparencia.gov.br/contratos/789012',
    category: 'Contratos',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 dias atrás
    keywords: ['contrato', 'manutenção', 'serviços'],
    content: 'Assinatura de contrato para prestação de serviços de manutenção preventiva e corretiva das instalações...',
    status: 'archived'
  }
];

const ContentMonitor: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [filter, setFilter] = useState('');
  const [lastCheck, setLastCheck] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewPublications();
    }, 5000); // Verifica a cada 5 segundos (apenas para demonstração)

    return () => clearInterval(interval);
  }, [publications]);

  const checkForNewPublications = () => {
    // Simula a chegada de novas publicações
    const randomNew = Math.random() > 0.7;
    if (randomNew) {
      const newPub: Publication = {
        id: Date.now().toString(),
        title: 'Nova Licitação Publicada',
        source: 'Portal da Transparência',
        url: 'https://www.portaltransparencia.gov.br/licitacoes/new',
        category: 'Licitações',
        date: new Date().toISOString(),
        keywords: ['licitação', 'novo', 'serviços'],
        content: 'Nova licitação publicada para contratação de serviços...',
        status: 'new'
      };

      setPublications(prev => [newPub, ...prev]);
      toast({
        title: "Nova Publicação",
        description: "Uma nova publicação foi encontrada e adicionada à lista."
      });
    }
    setLastCheck(new Date());
  };

  const markAsRead = (id: string) => {
    setPublications(prev =>
      prev.map(pub =>
        pub.id === id ? { ...pub, status: 'read' as const } : pub
      )
    );
  };

  const archivePublication = (id: string) => {
    setPublications(prev =>
      prev.map(pub =>
        pub.id === id ? { ...pub, status: 'archived' as const } : pub
      )
    );
  };

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(filter.toLowerCase()) ||
    pub.content.toLowerCase().includes(filter.toLowerCase()) ||
    pub.keywords.some(k => k.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Publicações Monitoradas</h2>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Última verificação: {lastCheck.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar publicações..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-[300px]"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredPublications.map(publication => (
            <Card key={publication.id} className={publication.status === 'new' ? 'border-primary' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{publication.title}</h3>
                      {publication.status === 'new' && (
                        <Badge>Novo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {publication.source} • {new Date(publication.date).toLocaleString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {publication.keywords.map(keyword => (
                        <Badge key={keyword} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm mt-2">
                      {publication.content}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={publication.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Abrir
                      </a>
                    </Button>
                    {publication.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(publication.id)}
                      >
                        Marcar como Lido
                      </Button>
                    )}
                    {publication.status === 'read' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => archivePublication(publication.id)}
                      >
                        Arquivar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContentMonitor;

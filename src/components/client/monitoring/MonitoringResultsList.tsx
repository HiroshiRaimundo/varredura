
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";

interface MonitoringResult {
  id: string;
  term: string;
  title: string;
  source: string;
  date: string;
  url: string;
  excerpt: string;
}

const mockResults: MonitoringResult[] = [
  {
    id: "1",
    term: "sustentabilidade",
    title: "Empresas brasileiras destacam-se em sustentabilidade",
    source: "G1",
    date: "2025-04-05T08:30:00",
    url: "https://g1.globo.com/economia/noticia/2025/04/05/empresas-brasileiras-destacam-se-em-sustentabilidade.ghtml",
    excerpt: "Diversas empresas brasileiras têm se destacado em iniciativas de sustentabilidade..."
  },
  {
    id: "2",
    term: "ESG",
    title: "O impacto das práticas ESG no mercado financeiro",
    source: "Valor Econômico",
    date: "2025-04-04T14:15:00",
    url: "https://valor.globo.com/financas/noticia/2025/04/04/o-impacto-das-praticas-esg-no-mercado-financeiro.ghtml",
    excerpt: "Investidores têm valorizado cada vez mais as empresas que adotam práticas ESG..."
  },
  {
    id: "3",
    term: "inovação",
    title: "Inovação tecnológica impulsiona crescimento econômico",
    source: "Exame",
    date: "2025-04-03T10:45:00",
    url: "https://exame.com/tecnologia/inovacao-tecnologica-impulsiona-crescimento-economico/",
    excerpt: "O investimento em inovação tecnológica tem sido um dos principais fatores..."
  }
];

const MonitoringResultsList: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Termo</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Fonte</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>
                <Badge variant="outline">{result.term}</Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {result.excerpt}
                  </p>
                </div>
              </TableCell>
              <TableCell>{result.source}</TableCell>
              <TableCell>{formatDate(result.date)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalhes</span>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Abrir link</span>
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonitoringResultsList;

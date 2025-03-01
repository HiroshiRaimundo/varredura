
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, FileText, Calendar, Clock, AlertTriangle } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

interface PressReleaseData {
  id: string;
  title: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'approved' | 'rejected';
}

// Dados de exemplo para demonstração
const mockData: PressReleaseData[] = [
  {
    id: '1',
    title: 'Nova tecnologia ambiental lançada no mercado',
    mediaOutlet: 'Folha de São Paulo',
    publicationUrl: 'https://exemplo.com/noticia1',
    publicationDate: '10/06/2023',
    publicationTime: '14:30',
    status: 'published'
  },
  {
    id: '2',
    title: 'Resultados do estudo sobre qualidade do ar divulgados',
    mediaOutlet: 'G1',
    publicationUrl: 'https://exemplo.com/noticia2',
    publicationDate: '15/05/2023',
    publicationTime: '10:00',
    status: 'published'
  },
  {
    id: '3',
    title: 'Novo programa de monitoramento ambiental',
    mediaOutlet: 'Estadão',
    publicationUrl: '',
    publicationDate: '20/06/2023',
    publicationTime: '09:00',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Relatório anual de sustentabilidade',
    mediaOutlet: 'Valor Econômico',
    publicationUrl: '',
    publicationDate: '01/07/2023',
    publicationTime: '11:30',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Avanços na tecnologia de filtragem de água',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'approved'
  },
  {
    id: '6',
    title: 'Análise de impacto ambiental no setor industrial',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'rejected'
  }
];

interface PressReleaseDashboardProps {
  clientType: string;
}

const PressReleaseDashboard: React.FC<PressReleaseDashboardProps> = ({ clientType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [releases, setReleases] = useState<PressReleaseData[]>(mockData);
  const [showAlert, setShowAlert] = useState(true);

  // Filtragem dos releases com base no termo de busca
  const filteredReleases = releases.filter(release => 
    release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    release.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Verificar se há releases recentemente aprovados ou rejeitados para mostrar alerta
  const hasApprovedReleases = releases.some(release => release.status === 'approved');
  const hasRejectedReleases = releases.some(release => release.status === 'rejected');

  // Função para gerar um código de cor com base no status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Função para formatar o status para exibição
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'pending':
        return 'Pendente';
      case 'scheduled':
        return 'Agendado';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Acompanhamento de Releases</CardTitle>
        <div className="flex items-center gap-2 w-full md:w-auto md:max-w-[300px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar release ou veículo" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        {showAlert && hasApprovedReleases && (
          <Alert className="mb-4 bg-emerald-50 border-emerald-200">
            <AlertTriangle className="h-4 w-4 text-emerald-600" />
            <AlertTitle className="text-emerald-700">Release aprovado!</AlertTitle>
            <AlertDescription className="text-emerald-600">
              Um ou mais releases foram aprovados e serão enviados para a imprensa. 
              Acompanhe o status na tabela abaixo.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-6 w-6 p-0" 
              onClick={() => setShowAlert(false)}
            >
              ×
            </Button>
          </Alert>
        )}

        {showAlert && hasRejectedReleases && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-700">Release rejeitado</AlertTitle>
            <AlertDescription className="text-red-600">
              Um ou mais releases foram rejeitados. Entre em contato com a equipe para 
              fazer as alterações necessárias.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-6 w-6 p-0" 
              onClick={() => setShowAlert(false)}
            >
              ×
            </Button>
          </Alert>
        )}

        {filteredReleases.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[160px]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Data
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Hora
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReleases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {release.title}
                      </div>
                    </TableCell>
                    <TableCell>{release.mediaOutlet || 'N/A'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(release.status)}`}>
                        {getStatusLabel(release.status)}
                      </span>
                    </TableCell>
                    <TableCell>{release.publicationDate || 'N/A'}</TableCell>
                    <TableCell>{release.publicationTime || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      {release.status === 'published' && release.publicationUrl ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(release.publicationUrl, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Abrir link</span>
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum release encontrado.</p>
          </div>
        )}
        
        <div className="mt-4 flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Publicado: Release já veiculado na mídia</span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Pendente: Release enviado, aguardando análise</span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Agendado: Release programado para envio futuro</span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm">Aprovado: Release analisado e aprovado para envio</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Rejeitado: Release precisa de ajustes antes de ser enviado</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PressReleaseDashboard;

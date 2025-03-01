
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Edit, 
  Trash, 
  FileText, 
  Calendar,
  Clock,
  UserCircle,
  Building,
  BookOpen,
  Newspaper,
  Filter
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReleaseData {
  id: string;
  title: string;
  clientName: string;
  clientType: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'draft';
}

// Dados de exemplo para demonstração
const mockReleases: ReleaseData[] = [
  {
    id: '1',
    title: 'Nova tecnologia ambiental lançada no mercado',
    clientName: 'Instituto Verde',
    clientType: 'observatory',
    mediaOutlet: 'Folha de São Paulo',
    publicationUrl: 'https://exemplo.com/noticia1',
    publicationDate: '10/06/2023',
    publicationTime: '14:30',
    status: 'published'
  },
  {
    id: '2',
    title: 'Resultados do estudo sobre qualidade do ar divulgados',
    clientName: 'Dr. Ana Silva',
    clientType: 'researcher',
    mediaOutlet: 'G1',
    publicationUrl: 'https://exemplo.com/noticia2',
    publicationDate: '15/05/2023',
    publicationTime: '10:00',
    status: 'published'
  },
  {
    id: '3',
    title: 'Novo programa de monitoramento ambiental',
    clientName: 'Prefeitura de São Paulo',
    clientType: 'politician',
    mediaOutlet: 'Estadão',
    publicationUrl: '',
    publicationDate: '20/06/2023',
    publicationTime: '09:00',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Relatório anual de sustentabilidade',
    clientName: 'Universidade Federal',
    clientType: 'institution',
    mediaOutlet: 'Valor Econômico',
    publicationUrl: '',
    publicationDate: '01/07/2023',
    publicationTime: '11:30',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Entrevista exclusiva sobre políticas ambientais',
    clientName: 'Carlos Mendes',
    clientType: 'journalist',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'draft'
  }
];

const ReleaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [releases, setReleases] = useState<ReleaseData[]>(mockReleases);

  // Filtragem dos releases com base nos filtros aplicados
  const filteredReleases = releases.filter(release => {
    const matchesSearch = 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    const matchesType = typeFilter === 'all' || release.clientType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Função para deletar um release
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este release?')) {
      setReleases(releases.filter(release => release.id !== id));
    }
  };

  // Função para editar um release (apenas simulada para demonstração)
  const handleEdit = (id: string) => {
    console.log(`Editando release ${id}`);
    // Aqui seria implementada a lógica para editar o release
  };

  // Funções para formatação e estilização
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'pending':
        return 'Pendente';
      case 'scheduled':
        return 'Agendado';
      case 'draft':
        return 'Rascunho';
      default:
        return 'Desconhecido';
    }
  };

  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case 'observatory':
        return <BookOpen className="h-4 w-4" />;
      case 'researcher':
        return <UserCircle className="h-4 w-4" />;
      case 'politician':
        return <Building className="h-4 w-4" />;
      case 'institution':
        return <Building className="h-4 w-4" />;
      case 'journalist':
        return <Newspaper className="h-4 w-4" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };

  const getClientTypeLabel = (type: string) => {
    switch (type) {
      case 'observatory':
        return 'Observatório';
      case 'researcher':
        return 'Pesquisador';
      case 'politician':
        return 'Político';
      case 'institution':
        return 'Instituição';
      case 'journalist':
        return 'Jornalista';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Releases</CardTitle>
        <CardDescription>
          Gerencie todos os releases de assessoria de imprensa em um só lugar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por título, cliente ou veículo" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtros:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos tipos</SelectItem>
                <SelectItem value="observatory">Observatório</SelectItem>
                <SelectItem value="researcher">Pesquisador</SelectItem>
                <SelectItem value="politician">Político</SelectItem>
                <SelectItem value="institution">Instituição</SelectItem>
                <SelectItem value="journalist">Jornalista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredReleases.length > 0 ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Data
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReleases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">{release.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{release.clientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getClientTypeIcon(release.clientType)}
                        {getClientTypeLabel(release.clientType)}
                      </Badge>
                    </TableCell>
                    <TableCell>{release.mediaOutlet || 'N/A'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(release.status)}`}>
                        {getStatusLabel(release.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {release.publicationDate ? (
                        <div className="text-sm">
                          {release.publicationDate}
                          <span className="text-xs text-muted-foreground ml-1">
                            {release.publicationTime}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(release.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(release.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum release encontrado com os filtros aplicados.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseManagement;

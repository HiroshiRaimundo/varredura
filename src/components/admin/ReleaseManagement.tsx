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
  Filter,
  Check,
  X,
  Mail,
  Phone,
  Globe,
  AtSign
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface JournalistContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
}

interface ReleaseData {
  id: string;
  title: string;
  clientName: string;
  clientType: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'draft' | 'approved' | 'rejected';
  content?: string;
  subtitle?: string;
  author?: string;
}

const mockJournalists: JournalistContact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@folha.com.br',
    phone: '(11) 98765-4321',
    website: 'folha.com.br',
    socialMedia: '@mariasilva'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@g1.com',
    phone: '(21) 91234-5678',
    website: 'g1.com',
    socialMedia: '@joaosantos'
  }
];

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
    status: 'published',
    content: 'Texto completo do release...',
    subtitle: 'Inovação em monitoramento ambiental',
    author: 'Dr. Carlos Mendes'
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
    status: 'published',
    content: 'Texto completo do release...',
    subtitle: 'Dados revelam melhoria na qualidade do ar',
    author: 'Dra. Ana Silva'
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
    status: 'scheduled',
    content: 'Texto completo do release...',
    subtitle: 'Prefeitura inicia nova fase de monitoramento',
    author: 'Secretaria do Meio Ambiente'
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
    status: 'pending',
    content: 'Texto completo do release...',
    subtitle: 'Universidade divulga resultados anuais',
    author: 'Prof. Ricardo Almeida'
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
    status: 'draft',
    content: 'Texto completo do release...',
    subtitle: 'Análise crítica das políticas atuais',
    author: 'Carlos Mendes'
  }
];

interface JournalistFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
}

const ReleaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [releases, setReleases] = useState<ReleaseData[]>(mockReleases);
  const [selectedRelease, setSelectedRelease] = useState<ReleaseData | null>(null);
  const [viewingRelease, setViewingRelease] = useState(false);
  const [showJournalistForm, setShowJournalistForm] = useState(false);
  const [journalists, setJournalists] = useState<JournalistContact[]>(mockJournalists);
  
  const journalistForm = useForm<JournalistFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      socialMedia: ''
    }
  });

  const filteredReleases = releases.filter(release => {
    const matchesSearch = 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    const matchesType = typeFilter === 'all' || release.clientType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este release?')) {
      setReleases(releases.filter(release => release.id !== id));
    }
  };

  const handleView = (release: ReleaseData) => {
    setSelectedRelease(release);
    setViewingRelease(true);
  };

  const handleApprove = (id: string) => {
    setReleases(releases.map(release => 
      release.id === id ? { ...release, status: 'approved' } : release
    ));
    
    toast({
      title: "Release aprovado",
      description: "O release foi aprovado e será enviado aos jornalistas."
    });
  };

  const handleReject = (id: string) => {
    setReleases(releases.map(release => 
      release.id === id ? { ...release, status: 'rejected' } : release
    ));
    
    toast({
      title: "Release rejeitado",
      description: "O release foi rejeitado e não será enviado."
    });
  };

  const handleAddJournalist = (data: JournalistFormValues) => {
    const newJournalist: JournalistContact = {
      id: Date.now().toString(),
      ...data
    };
    
    setJournalists([...journalists, newJournalist]);
    journalistForm.reset();
    setShowJournalistForm(false);
    
    toast({
      title: "Jornalista adicionado",
      description: "Contato adicionado com sucesso ao banco de dados."
    });
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
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Desconhecido';
    }
  };

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
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
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
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
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

        <div className="flex justify-between mb-4">
          <Dialog open={showJournalistForm} onOpenChange={setShowJournalistForm}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserCircle className="h-4 w-4" />
                Adicionar Jornalista
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Contato de Jornalista</DialogTitle>
                <DialogDescription>
                  Cadastre informações de contato de jornalistas para envio de releases
                </DialogDescription>
              </DialogHeader>
              
              <Form {...journalistForm}>
                <form onSubmit={journalistForm.handleSubmit(handleAddJournalist)} className="space-y-4">
                  <FormField
                    control={journalistForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do jornalista" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalistForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalistForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalistForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site/Veículo</FormLabel>
                        <FormControl>
                          <Input placeholder="exemplo.com.br" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalistForm.control}
                    name="socialMedia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Redes Sociais</FormLabel>
                        <FormControl>
                          <Input placeholder="@usuario" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Salvar Contato</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleView(release)}
                          className="h-8 w-8 p-0"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                        
                        {release.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleApprove(release.id)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Aprovar</span>
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReject(release.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Rejeitar</span>
                            </Button>
                          </>
                        )}
                        
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
        
        <Dialog open={viewingRelease} onOpenChange={setViewingRelease}>
          {selectedRelease && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedRelease.title}</DialogTitle>
                <DialogDescription>{selectedRelease.subtitle}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserCircle className="h-4 w-4" />
                  <span>Autor: {selectedRelease.author}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="prose max-w-none">
                    <p>{selectedRelease.content}</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <h4 className="font-medium mb-2">Detalhes de publicação</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cliente:</span> {selectedRelease.clientName}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Veículo:</span> {selectedRelease.mediaOutlet || 'N/A'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Data:</span> {selectedRelease.publicationDate || 'N/A'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span> {getStatusLabel(selectedRelease.status)}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                {selectedRelease.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => {
                        handleApprove(selectedRelease.id);
                        setViewingRelease(false);
                      }}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Aprovar e Enviar
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleReject(selectedRelease.id);
                        setViewingRelease(false);
                      }}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Rejeitar
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Banco de Contatos de Jornalistas</h3>
          
          {journalists.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Site/Veículo</TableHead>
                    <TableHead>Redes Sociais</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalists.map((journalist) => (
                    <TableRow key={journalist.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-muted-foreground" />
                          {journalist.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {journalist.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {journalist.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          {journalist.website}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AtSign className="h-4 w-4 text-muted-foreground" />
                          {journalist.socialMedia}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">Nenhum contato de jornalista cadastrado.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseManagement;

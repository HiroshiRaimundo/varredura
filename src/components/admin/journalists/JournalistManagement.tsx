
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle, Mail, Phone, Globe, AtSign, Filter, Search, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { JournalistContact, JournalistFormValues, JournalistFilters, PaginationState } from "../types/releaseTypes";
import { Textarea } from "@/components/ui/textarea";

interface JournalistManagementProps {
  journalists: JournalistContact[];
  setJournalists: React.Dispatch<React.SetStateAction<JournalistContact[]>>;
}

const JournalistManagement: React.FC<JournalistManagementProps> = ({ journalists, setJournalists }) => {
  const [showJournalistForm, setShowJournalistForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<JournalistFilters>({});
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: Math.ceil(journalists.length / 5)
  });
  
  const journalistForm = useForm<JournalistFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      socialMedia: '',
      mediaOutlet: '',
      category: '',
      region: ''
    }
  });

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

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
  };
  
  // Get unique values for filter dropdowns
  const getUniqueValues = (key: keyof JournalistContact): string[] => {
    const values = journalists
      .map(journalist => journalist[key])
      .filter(value => value) as string[];
    
    return [...new Set(values)].sort();
  };
  
  // Filter and search journalists
  const filteredJournalists = journalists.filter(journalist => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      journalist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journalist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (journalist.mediaOutlet && journalist.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = !filters.category || journalist.category === filters.category;
    
    // Media outlet filter
    const matchesMediaOutlet = !filters.mediaOutlet || journalist.mediaOutlet === filters.mediaOutlet;
    
    // Region filter
    const matchesRegion = !filters.region || journalist.region === filters.region;
    
    return matchesSearch && matchesCategory && matchesMediaOutlet && matchesRegion;
  });
  
  // Update pagination when filtered list changes
  React.useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalPages: Math.ceil(filteredJournalists.length / prev.itemsPerPage),
      currentPage: 1, // Reset to first page on filter change
    }));
  }, [filteredJournalists.length]);
  
  // Paginate the filtered journalists
  const displayedJournalists = filteredJournalists.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Banco de Contatos de Jornalistas</h3>
        
        <Dialog open={showJournalistForm} onOpenChange={setShowJournalistForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserCircle className="h-4 w-4" />
              Adicionar Jornalista
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={journalistForm.control}
                    name="mediaOutlet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Veículo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do veículo" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalistForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="politics">Política</SelectItem>
                            <SelectItem value="economy">Economia</SelectItem>
                            <SelectItem value="environment">Meio Ambiente</SelectItem>
                            <SelectItem value="technology">Tecnologia</SelectItem>
                            <SelectItem value="culture">Cultura</SelectItem>
                            <SelectItem value="health">Saúde</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={journalistForm.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Região</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="norte">Norte</SelectItem>
                          <SelectItem value="nordeste">Nordeste</SelectItem>
                          <SelectItem value="centro-oeste">Centro-Oeste</SelectItem>
                          <SelectItem value="sudeste">Sudeste</SelectItem>
                          <SelectItem value="sul">Sul</SelectItem>
                          <SelectItem value="nacional">Nacional</SelectItem>
                          <SelectItem value="internacional">Internacional</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={journalistForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
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
                      <FormDescription>
                        Principal rede social do jornalista
                      </FormDescription>
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
      
      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar jornalistas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {(filters.category || filters.mediaOutlet || filters.region) && (
            <span className="ml-1 rounded-full bg-primary w-2 h-2"></span>
          )}
        </Button>
      </div>
      
      {/* Advanced filters */}
      {showFilters && (
        <div className="bg-muted/40 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <FormLabel className="text-sm">Categoria</FormLabel>
              <Select 
                value={filters.category || ""} 
                onValueChange={(value) => setFilters({...filters, category: value || undefined})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {getUniqueValues("category").map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "politics" ? "Política" : 
                       category === "economy" ? "Economia" : 
                       category === "environment" ? "Meio Ambiente" : 
                       category === "technology" ? "Tecnologia" : 
                       category === "culture" ? "Cultura" : 
                       category === "health" ? "Saúde" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <FormLabel className="text-sm">Veículo</FormLabel>
              <Select 
                value={filters.mediaOutlet || ""} 
                onValueChange={(value) => setFilters({...filters, mediaOutlet: value || undefined})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os veículos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os veículos</SelectItem>
                  {getUniqueValues("mediaOutlet").map((outlet) => (
                    <SelectItem key={outlet} value={outlet}>{outlet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <FormLabel className="text-sm">Região</FormLabel>
              <Select 
                value={filters.region || ""} 
                onValueChange={(value) => setFilters({...filters, region: value || undefined})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as regiões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as regiões</SelectItem>
                  {getUniqueValues("region").map((region) => (
                    <SelectItem key={region} value={region}>
                      {region === "norte" ? "Norte" : 
                       region === "nordeste" ? "Nordeste" : 
                       region === "centro-oeste" ? "Centro-Oeste" : 
                       region === "sudeste" ? "Sudeste" : 
                       region === "sul" ? "Sul" : 
                       region === "nacional" ? "Nacional" : 
                       region === "internacional" ? "Internacional" : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>
      )}
      
      {displayedJournalists.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Região</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedJournalists.map((journalist) => (
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
                      {journalist.mediaOutlet || journalist.website}
                    </div>
                  </TableCell>
                  <TableCell>
                    {journalist.category && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {journalist.category === "politics" ? "Política" : 
                         journalist.category === "economy" ? "Economia" : 
                         journalist.category === "environment" ? "Meio Ambiente" : 
                         journalist.category === "technology" ? "Tecnologia" : 
                         journalist.category === "culture" ? "Cultura" : 
                         journalist.category === "health" ? "Saúde" : journalist.category}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {journalist.region && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {journalist.region === "norte" ? "Norte" : 
                         journalist.region === "nordeste" ? "Nordeste" : 
                         journalist.region === "centro-oeste" ? "Centro-Oeste" : 
                         journalist.region === "sudeste" ? "Sudeste" : 
                         journalist.region === "sul" ? "Sul" : 
                         journalist.region === "nacional" ? "Nacional" : 
                         journalist.region === "internacional" ? "Internacional" : journalist.region}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-muted-foreground">Nenhum contato de jornalista encontrado.</p>
        </div>
      )}
      
      {/* Pagination */}
      {filteredJournalists.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={pagination.currentPage === 1}
          >
            Primeira
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Anterior
          </Button>
          
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            // Show current page in the middle when possible
            const startPage = Math.max(
              1,
              pagination.currentPage > 2 
                ? pagination.currentPage - 2 
                : 1
            );
            const pageNumber = startPage + i;
            
            if (pageNumber <= pagination.totalPages) {
              return (
                <Button
                  key={pageNumber}
                  variant={pagination.currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            }
            return null;
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Próxima
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Última
          </Button>
        </div>
      )}
    </div>
  );
};

export default JournalistManagement;

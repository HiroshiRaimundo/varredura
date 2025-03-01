
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { JournalistContact, JournalistFilters, PaginationState } from "../types/releaseTypes";
import { Mail, Phone, Globe, Twitter, Trash, Edit, Search } from "lucide-react";
import { getPaginatedItems, calculateTotalPages } from "../utils/releaseUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JournalistListProps {
  journalists: JournalistContact[];
  onEdit: (journalist: JournalistContact) => void;
  onDelete: (id: string) => void;
}

const JournalistList: React.FC<JournalistListProps> = ({ journalists, onEdit, onDelete }) => {
  const [filters, setFilters] = useState<JournalistFilters>({});
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1
  });
  const [filteredJournalists, setFilteredJournalists] = useState<JournalistContact[]>(journalists);

  // Get unique values for filter dropdowns
  const uniqueMediaOutlets = [...new Set(journalists.map(j => j.mediaOutlet).filter(Boolean))];
  const uniqueCategories = [...new Set(journalists.map(j => j.category).filter(Boolean))];
  const uniqueRegions = [...new Set(journalists.map(j => j.region).filter(Boolean))];

  // Apply filters when they change
  useEffect(() => {
    let result = journalists;
    
    if (filters.name) {
      result = result.filter(j => 
        j.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    
    if (filters.mediaOutlet) {
      result = result.filter(j => j.mediaOutlet === filters.mediaOutlet);
    }
    
    if (filters.category) {
      result = result.filter(j => j.category === filters.category);
    }
    
    if (filters.region) {
      result = result.filter(j => j.region === filters.region);
    }
    
    setFilteredJournalists(result);
    
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: calculateTotalPages(result.length, prev.itemsPerPage)
    }));
  }, [filters, journalists]);

  // Update totalPages when itemsPerPage changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalPages: calculateTotalPages(filteredJournalists.length, prev.itemsPerPage)
    }));
  }, [filteredJournalists.length, pagination.itemsPerPage]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (value: string) => {
    setPagination(prev => ({
      ...prev,
      itemsPerPage: parseInt(value),
      currentPage: 1,
      totalPages: calculateTotalPages(filteredJournalists.length, parseInt(value))
    }));
  };

  const paginatedJournalists = getPaginatedItems(
    filteredJournalists,
    pagination.currentPage,
    pagination.itemsPerPage
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nome</label>
              <div className="relative">
                <Input
                  placeholder="Buscar por nome..."
                  value={filters.name || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Veículo</label>
              <Select
                value={filters.mediaOutlet || ''}
                onValueChange={(value) => setFilters(prev => ({ ...prev, mediaOutlet: value || undefined }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os veículos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os veículos</SelectItem>
                  {uniqueMediaOutlets.map((outlet) => (
                    <SelectItem key={outlet} value={outlet!}>{outlet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Categoria</label>
              <Select
                value={filters.category || ''}
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category!}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Região</label>
              <Select
                value={filters.region || ''}
                onValueChange={(value) => setFilters(prev => ({ ...prev, region: value || undefined }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as regiões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as regiões</SelectItem>
                  {uniqueRegions.map((region) => (
                    <SelectItem key={region} value={region!}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">
              {filteredJournalists.length} jornalistas encontrados
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Mostrar:</span>
              <Select
                value={pagination.itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {paginatedJournalists.length > 0 ? (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedJournalists.map((journalist) => (
                  <TableRow key={journalist.id}>
                    <TableCell className="font-medium">{journalist.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" /> {journalist.email}
                        </span>
                        <span className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" /> {journalist.phone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-sm">
                          <Globe className="h-3 w-3 mr-1" /> {journalist.website}
                        </span>
                        <span className="flex items-center text-sm">
                          <Twitter className="h-3 w-3 mr-1" /> {journalist.socialMedia}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{journalist.category || 'N/A'}</TableCell>
                    <TableCell>{journalist.region || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEdit(journalist)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDelete(journalist.id)}
                          className="h-8 w-8 p-0 text-destructive"
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

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
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
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                // Show pages around current page
                let pageToShow;
                const middleIndex = 2; // Middle of the 5 buttons
                
                if (pagination.totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageToShow = pagination.totalPages - 4 + i;
                } else {
                  pageToShow = pagination.currentPage - middleIndex + i;
                }
                
                return (
                  <Button
                    key={pageToShow}
                    variant={pagination.currentPage === pageToShow ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageToShow)}
                  >
                    {pageToShow}
                  </Button>
                );
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
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum jornalista encontrado com os filtros aplicados.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setFilters({})}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default JournalistList;

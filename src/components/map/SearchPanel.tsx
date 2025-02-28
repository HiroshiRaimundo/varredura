import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ResearchStudy } from "@/types/research";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchPanelProps {
  studies: ResearchStudy[];
  onSearchResults: (results: ResearchStudy[]) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ studies, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredStudies, setFilteredStudies] = useState<ResearchStudy[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    if (!hasSearched) {
      setFilteredStudies([]);
      onSearchResults([]);
    }
  }, [studies, hasSearched, onSearchResults]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredStudies([]);
      setHasSearched(false);
      onSearchResults([]);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    const filtered = studies.filter(study => {
      if (searchType === "all") {
        return (
          study.title.toLowerCase().includes(lowerSearchTerm) ||
          study.author.toLowerCase().includes(lowerSearchTerm) ||
          study.location.toLowerCase().includes(lowerSearchTerm) ||
          study.summary.toLowerCase().includes(lowerSearchTerm)
        );
      } else if (searchType === "title") {
        return study.title.toLowerCase().includes(lowerSearchTerm);
      } else if (searchType === "author") {
        return study.author.toLowerCase().includes(lowerSearchTerm);
      } else if (searchType === "location") {
        return study.location.toLowerCase().includes(lowerSearchTerm);
      } else if (searchType === "type") {
        return study.type.toLowerCase().includes(lowerSearchTerm);
      }
      return false;
    });

    setFilteredStudies(filtered);
    setHasSearched(true);
    onSearchResults(filtered);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchType("all");
    setFilteredStudies([]);
    setHasSearched(false);
    onSearchResults([]);
  };

  React.useEffect(() => {
    if (searchTerm === "") {
      setFilteredStudies([]);
      setHasSearched(false);
      onSearchResults([]);
    }
  }, [searchTerm, onSearchResults]);

  const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudies.slice(indexOfFirstItem, indexOfLastItem);
  
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full border rounded-md p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Repositório</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar estudos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-12"
          />
          <div className="absolute right-0 top-0 h-full flex items-center pr-2">
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-8 w-8"
              >
                <X size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 w-8"
            >
              <Filter size={16} />
            </Button>
          </div>
        </div>
        {showFilters && (
          <div className="p-2 bg-muted rounded-md space-y-2">
            <p className="text-sm font-medium mb-2">Filtrar por:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="searchType"
                  value="all"
                  checked={searchType === "all"}
                  onChange={() => setSearchType("all")}
                  className="mr-2"
                />
                <Label htmlFor="all">Todos</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="title"
                  name="searchType"
                  value="title"
                  checked={searchType === "title"}
                  onChange={() => setSearchType("title")}
                  className="mr-2"
                />
                <Label htmlFor="title">Título</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="author"
                  name="searchType"
                  value="author"
                  checked={searchType === "author"}
                  onChange={() => setSearchType("author")}
                  className="mr-2"
                />
                <Label htmlFor="author">Autor</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="location"
                  name="searchType"
                  value="location"
                  checked={searchType === "location"}
                  onChange={() => setSearchType("location")}
                  className="mr-2"
                />
                <Label htmlFor="location">Localização</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="type"
                  name="searchType"
                  value="type"
                  checked={searchType === "type"}
                  onChange={() => setSearchType("type")}
                  className="mr-2"
                />
                <Label htmlFor="type">Tipo</Label>
              </div>
            </div>
          </div>
        )}
        <Button 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleSearch}
        >
          <Search size={16} />
          Buscar
        </Button>
        <Separator />
        <div>
          <h4 className="text-sm font-medium mb-2">
            {hasSearched ? 
              `Estudos encontrados: ${filteredStudies.length}` : 
              "Faça uma busca para ver resultados"}
          </h4>
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {hasSearched && filteredStudies.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">
                Nenhum estudo corresponde à sua busca.
              </p>
            ) : (
              currentItems.map((study) => (
                <div key={study.id} className="p-2 border rounded-md text-sm hover:bg-muted">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{study.title}</p>
                    {study.repositoryUrl && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href={study.repositoryUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center ml-2 text-primary hover:text-primary/80"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Acessar estudo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Autor: {study.author}</p>
                    <p>Local: {study.location}</p>
                    <p>Tipo: {study.type}</p>
                    {study.repositoryUrl && (
                      <a 
                        href={study.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center mt-1"
                      >
                        <span>Ver estudo completo</span>
                        <ExternalLink size={12} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {hasSearched && totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={16} />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;

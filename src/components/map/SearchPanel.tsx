
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ResearchStudy } from "@/types/research";

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
              filteredStudies.map((study) => (
                <div key={study.id} className="p-2 border rounded-md text-sm hover:bg-muted">
                  <p className="font-medium">{study.title}</p>
                  <div className="text-xs text-muted-foreground">
                    <p>Autor: {study.author}</p>
                    <p>Local: {study.location}</p>
                    <p>Tipo: {study.type}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;

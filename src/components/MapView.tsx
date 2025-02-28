
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Map from "@/components/Map";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "outro";
}

interface MapViewProps {
  studies: ResearchStudy[];
}

const MapView: React.FC<MapViewProps> = ({ studies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<string>("all");
  const [filteredStudies, setFilteredStudies] = useState<ResearchStudy[]>(studies);
  const [showFilters, setShowFilters] = useState(false);

  // Atualiza o filteredStudies quando studies muda
  React.useEffect(() => {
    setFilteredStudies(studies);
  }, [studies]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredStudies(studies);
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
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchType("all");
    setFilteredStudies(studies);
  };

  // Quando o termo de busca muda
  React.useEffect(() => {
    if (searchTerm === "") {
      setFilteredStudies(studies);
    }
  }, [searchTerm, studies]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização Geográfica</CardTitle>
        <CardDescription>
          Mapa do Amapá com localização dos estudos registrados. 
          Clique nos marcadores para ver mais detalhes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Mapa na esquerda (ou em cima em telas menores) */}
          <div className="w-full lg:w-3/4">
            <Map points={filteredStudies} />
          </div>

          {/* Repositório/Buscador na direita (ou embaixo em telas menores) */}
          <div className="w-full lg:w-1/4 border rounded-md p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Repositório</h3>
              
              {/* Barra de pesquisa */}
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

              {/* Filtros (exibidos quando showFilters é true) */}
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
              
              {/* Resultados da busca */}
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Estudos encontrados: {filteredStudies.length}
                </h4>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {filteredStudies.length === 0 ? (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;

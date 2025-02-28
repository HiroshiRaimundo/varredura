
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ResearchStudy } from "@/types/research";

// Import the new components
import SearchInput from "./search/SearchInput";
import FilterPanel from "./search/FilterPanel";
import SearchResults from "./search/SearchResults";

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

  useEffect(() => {
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

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredStudies([]);
      setHasSearched(false);
      onSearchResults([]);
    }
  }, [searchTerm, onSearchResults]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudies.slice(indexOfFirstItem, indexOfLastItem);
  
  // Pagination handlers
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
        
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          clearSearch={clearSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        {showFilters && (
          <FilterPanel
            searchType={searchType}
            setSearchType={setSearchType}
          />
        )}
        
        <Button 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleSearch}
        >
          <Search size={16} />
          Buscar
        </Button>
        
        <Separator />
        
        <SearchResults
          hasSearched={hasSearched}
          filteredStudies={filteredStudies}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default SearchPanel;

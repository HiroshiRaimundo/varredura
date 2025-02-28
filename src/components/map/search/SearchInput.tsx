
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  clearSearch,
  showFilters,
  setShowFilters,
}) => {
  return (
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
  );
};

export default SearchInput;

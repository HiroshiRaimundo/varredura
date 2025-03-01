
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto md:max-w-[300px]">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Buscar release ou veículo" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-9"
      />
    </div>
  );
};

export default SearchBar;


import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ReleaseFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  typeFilter: string;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ReleaseFilters: React.FC<ReleaseFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter
}) => {
  return (
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
  );
};

export default ReleaseFilters;

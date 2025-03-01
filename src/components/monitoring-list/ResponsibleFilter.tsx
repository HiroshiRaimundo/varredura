
import React from "react";

interface ResponsibleFilterProps {
  responsibleFilter: string;
  onFilterChange: (responsible: string) => void;
  uniqueResponsibles: string[];
}

const ResponsibleFilter: React.FC<ResponsibleFilterProps> = ({
  responsibleFilter,
  onFilterChange,
  uniqueResponsibles
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="responsibleFilter" className="text-sm text-muted-foreground">
        Filtrar por responsável:
      </label>
      <select
        id="responsibleFilter"
        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={responsibleFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Todos</option>
        {uniqueResponsibles.map((responsible, index) => (
          <option key={index} value={responsible}>
            {responsible}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResponsibleFilter;

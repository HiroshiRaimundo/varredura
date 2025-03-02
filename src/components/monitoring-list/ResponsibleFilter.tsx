
import React from "react";

interface ResponsibleFilterProps {
  responsibleFilter: string;
  onFilterChange: (value: string) => void;
  uniqueResponsibles: string[];
}

const ResponsibleFilter: React.FC<ResponsibleFilterProps> = ({
  responsibleFilter,
  onFilterChange,
  uniqueResponsibles
}) => {
  // If there are no responsibles to filter by, don't show the filter
  if (uniqueResponsibles.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="responsibleFilter" className="text-sm font-medium">
        Filtrar por responsável:
      </label>
      <select
        id="responsibleFilter"
        className="h-9 rounded-md border border-input px-3 py-1 text-sm"
        value={responsibleFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Todos</option>
        {uniqueResponsibles.map((responsible) => (
          <option key={responsible} value={responsible}>
            {responsible}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResponsibleFilter;

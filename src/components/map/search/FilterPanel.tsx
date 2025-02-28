
import React from "react";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  searchType: string;
  setSearchType: (type: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchType,
  setSearchType,
}) => {
  return (
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
  );
};

export default FilterPanel;

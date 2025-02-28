
import React from "react";
import { ResearchStudy } from "@/types/research";
import StudyCard from "./StudyCard";
import Pagination from "./Pagination";

interface SearchResultsProps {
  hasSearched: boolean;
  filteredStudies: ResearchStudy[];
  currentItems: ResearchStudy[];
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  hasSearched,
  filteredStudies,
  currentItems,
  currentPage,
  totalPages,
  goToNextPage,
  goToPrevPage,
  goToPage,
}) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">
        {hasSearched
          ? `Estudos encontrados: ${filteredStudies.length}`
          : "Faça uma busca para ver resultados"}
      </h4>
      <div className="max-h-[400px] overflow-y-auto space-y-2">
        {hasSearched && filteredStudies.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            Nenhum estudo corresponde à sua busca.
          </p>
        ) : (
          currentItems.map((study) => <StudyCard key={study.id} study={study} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default SearchResults;

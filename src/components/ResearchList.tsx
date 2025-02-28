
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchStudy } from "@/types/research";

interface ResearchListProps {
  studies: ResearchStudy[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const ResearchList: React.FC<ResearchListProps> = ({ studies, onDelete, isLoading = false }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination values
  const totalPages = Math.ceil(studies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudies = studies.slice(indexOfFirstItem, indexOfLastItem);
  
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

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Estudos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-muted-foreground">Carregando estudos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (studies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Estudos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhum estudo cadastrado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudos Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {currentStudies.map((study) => (
            <li key={study.id} className="border p-4 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-medium">{truncateText(study.title, 40)}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive" 
                  onClick={() => onDelete(study.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Autor:</span> {truncateText(study.author, 30)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Local:</span> {truncateText(study.location, 25)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Tipo:</span> {study.type}
              </p>
            </li>
          ))}
        </ul>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResearchList;

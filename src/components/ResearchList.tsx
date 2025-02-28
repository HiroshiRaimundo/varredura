
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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

interface ResearchListProps {
  studies: ResearchStudy[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const ResearchList: React.FC<ResearchListProps> = ({ studies, onDelete, isLoading = false }) => {
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
          {studies.map((study) => (
            <li key={study.id} className="border p-4 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-medium">{study.title}</h3>
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
                <span className="font-medium">Autor:</span> {study.author}
                {study.coAuthors && <span> | <span className="font-medium">Co-autores:</span> {study.coAuthors}</span>}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Local:</span> {study.location}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Tipo:</span> {study.type}
              </p>
              {study.summary && (
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="font-medium">Resumo:</span>{" "}
                    {study.summary.length > 150
                      ? `${study.summary.substring(0, 150)}...`
                      : study.summary}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResearchList;

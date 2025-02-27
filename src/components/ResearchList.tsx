
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
}

const ResearchList: React.FC<ResearchListProps> = ({ studies }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudos Registrados</CardTitle>
        <CardDescription>
          {studies.length} {studies.length === 1 ? 'estudo acadêmico' : 'estudos acadêmicos'} no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {studies.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum estudo acadêmico registrado ainda.
            </p>
          ) : (
            studies.map((study) => (
              <Card key={study.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{study.title}</h3>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {study.type === 'artigo' ? 'Artigo' : 
                         study.type === 'dissertacao' ? 'Dissertação' : 
                         study.type === 'tese' ? 'Tese' : 'Outro'}
                      </span>
                    </div>
                    <p className="text-sm">Autor: {study.author}</p>
                    <p className="text-sm">Localização: {study.location}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{study.summary}</p>
                    {study.repositoryUrl && (
                      <a 
                        href={study.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Ver repositório
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchList;

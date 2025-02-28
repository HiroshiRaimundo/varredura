
import React from "react";
import { ResearchStudy } from "@/types/research";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StudyCardProps {
  study: ResearchStudy;
}

const StudyCard: React.FC<StudyCardProps> = ({ study }) => {
  return (
    <div className="p-2 border rounded-md text-sm hover:bg-muted">
      <div className="flex justify-between items-start">
        <p className="font-medium">{study.title}</p>
        {study.repositoryUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={study.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center ml-2 text-primary hover:text-primary/80"
                >
                  <ExternalLink size={14} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Acessar estudo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="text-xs text-muted-foreground">
        <p>Autor: {study.author}</p>
        <p>Local: {study.location}</p>
        <p>Tipo: {study.type}</p>
        {study.repositoryUrl && (
          <a
            href={study.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center mt-1"
          >
            <span>Ver estudo completo</span>
            <ExternalLink size={12} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default StudyCard;

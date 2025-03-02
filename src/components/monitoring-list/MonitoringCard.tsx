
import React from "react";
import { MonitoringItem } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Clock, Tag, User, Building, FileText } from "lucide-react";

interface MonitoringCardProps {
  item: MonitoringItem;
  onDelete: (id: string) => void;
}

const MonitoringCard: React.FC<MonitoringCardProps> = ({ item, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o monitoramento "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  const frequencyMap: Record<string, string> = {
    diario: "Diário",
    semanal: "Semanal",
    quinzenal: "Quinzenal",
    mensal: "Mensal"
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-start">
          <span className="line-clamp-2">{item.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline line-clamp-1 break-all"
            >
              {item.url}
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{frequencyMap[item.frequency] || item.frequency}</span>
          </div>
          
          {item.category && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="capitalize">{item.category}</span>
            </div>
          )}
          
          {item.responsible && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{item.responsible}</span>
            </div>
          )}
          
          {item.institution && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{item.institution}</span>
            </div>
          )}
          
          {item.keywords && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span className="line-clamp-2">{item.keywords}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="destructive" 
          size="sm" 
          className="w-full"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" /> Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MonitoringCard;

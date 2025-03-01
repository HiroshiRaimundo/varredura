
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Link2, 
  Link, 
  Trash2, 
  User, 
  Clock, 
  FileText 
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { MonitoringItem } from "./types";
import { getFrequencyColor, getCategoryBorderColor } from "./utils";

interface MonitoringCardProps {
  item: MonitoringItem;
  onDelete: (id: string) => void;
}

const MonitoringCard: React.FC<MonitoringCardProps> = ({ item, onDelete }) => {
  return (
    <Card 
      className="overflow-hidden border-l-4" 
      style={{ borderLeftColor: getCategoryBorderColor(item.category) }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800">
                {item.category}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getFrequencyColor(item.frequency)} bg-slate-100`}>
                      <Clock size={12} className="mr-1" />
                      {item.frequency}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Frequência de atualização</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mt-2">
              <Link2 size={14} />
              <span className="break-all">Fonte: {item.url}</span>
            </div>
            {item.api_url && (
              <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                <Link size={14} />
                <span className="break-all">API: {item.api_url}</span>
              </div>
            )}
            {item.keywords && (
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Palavras-chave: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.keywords.split(',').map((keyword, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-slate-100 rounded-full">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {item.responsible && (
              <div className="flex items-center text-sm font-medium gap-1 mt-2">
                <User size={14} className="text-primary" />
                <span>Responsável: {item.responsible}</span>
              </div>
            )}
            {item.notes && (
              <div className="mt-2 p-2 bg-slate-50 rounded text-sm">
                <div className="flex items-center gap-1 text-slate-600 mb-1">
                  <FileText size={14} />
                  <span className="font-medium">Anotações:</span>
                </div>
                <p className="whitespace-pre-line">{item.notes}</p>
              </div>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="ml-4 mt-1"
          >
            <Trash2 size={16} className="mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringCard;

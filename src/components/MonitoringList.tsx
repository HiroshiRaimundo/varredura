
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Link, Trash2, User } from "lucide-react";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  responsible?: string;
  keywords?: string;
}

interface MonitoringListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  onFilterChange?: (responsible: string) => void;
}

const MonitoringList: React.FC<MonitoringListProps> = ({ 
  items, 
  onDelete, 
  isLoading = false,
  uniqueResponsibles = [],
  responsibleFilter = "",
  onFilterChange = () => {}
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Monitoramentos Ativos</CardTitle>
          
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
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-muted-foreground">Carregando monitoramentos...</p>
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {responsibleFilter 
              ? "Não foram encontrados monitoramentos para este responsável." 
              : "Nenhum item sendo monitorado ainda."}
          </p>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Categoria: {item.category}</p>
                      <div className="flex items-center text-sm text-muted-foreground gap-1">
                        <Link2 size={14} />
                        <span>Fonte: {item.url}</span>
                      </div>
                      {item.api_url && (
                        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                          <Link size={14} />
                          <span>API: {item.api_url}</span>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">Frequência: {item.frequency}</p>
                      {item.responsible && (
                        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                          <User size={14} />
                          <span>Responsável: {item.responsible}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;

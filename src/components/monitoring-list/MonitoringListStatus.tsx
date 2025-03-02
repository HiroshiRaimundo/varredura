
import React from "react";
import { CircleSlash, Search, Loader2 } from "lucide-react";

interface MonitoringListStatusProps {
  isLoading: boolean;
  isEmpty: boolean;
  responsibleFilter: string;
}

const MonitoringListStatus: React.FC<MonitoringListStatusProps> = ({ 
  isLoading, 
  isEmpty, 
  responsibleFilter 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p>Carregando monitoramentos...</p>
      </div>
    );
  }

  if (isEmpty && responsibleFilter) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <Search className="h-10 w-10 mb-4" />
        <p>Nenhum monitoramento encontrado para o filtro selecionado.</p>
        <p className="text-sm mt-1">Tente selecionar outro responsável ou limpar o filtro.</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <CircleSlash className="h-10 w-10 mb-4" />
        <p>Nenhum monitoramento cadastrado.</p>
        <p className="text-sm mt-1">Adicione um novo monitoramento utilizando o formulário acima.</p>
      </div>
    );
  }

  return null;
};

export default MonitoringListStatus;

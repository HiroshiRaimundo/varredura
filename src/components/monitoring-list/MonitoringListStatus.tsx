
import React from "react";
import { AlertTriangle } from "lucide-react";

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
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
        </div>
        <p className="mt-2 text-muted-foreground">Carregando monitoramentos...</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-10 border border-dashed rounded-lg">
        <AlertTriangle size={36} className="mx-auto text-yellow-500 mb-2" />
        <p className="text-muted-foreground">
          {responsibleFilter 
            ? "Não foram encontrados monitoramentos para este responsável." 
            : "Nenhum item sendo monitorado ainda."}
        </p>
        {responsibleFilter && (
          <p className="text-sm text-muted-foreground mt-2">
            Tente selecionar outro responsável ou volte para "Todos".
          </p>
        )}
        {!responsibleFilter && (
          <p className="text-sm text-muted-foreground mt-2">
            Utilize o formulário acima para adicionar seu primeiro monitoramento.
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default MonitoringListStatus;

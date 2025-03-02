
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMonitoring } from "@/hooks/useMonitoring";
import { ClientType } from "../ClientTypes";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/monitoring-list";

interface MonitoringTabProps {
  clientType: ClientType;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ clientType }) => {
  const {
    monitoringItems,
    isLoading,
    form,
    handleAddMonitoring,
    handleDeleteMonitoring,
    responsibleFilter,
    setResponsibleFilter,
    getUniqueResponsibles
  } = useMonitoring();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Monitoramento</CardTitle>
          <CardDescription>
            Adicione e gerencie seus itens de monitoramento personalizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonitoringForm 
            form={form} 
            onSubmit={handleAddMonitoring} 
            clientType={clientType}
          />
          
          <MonitoringList 
            items={monitoringItems} 
            onDelete={handleDeleteMonitoring}
            isLoading={isLoading}
            uniqueResponsibles={getUniqueResponsibles()}
            responsibleFilter={responsibleFilter}
            onFilterChange={setResponsibleFilter}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringTab;

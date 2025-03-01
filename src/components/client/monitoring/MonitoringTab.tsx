
import React from "react";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";

interface MonitoringTabProps {
  clientType: ClientType;
  monitoringItems: any[];
  form: any;
  handleAddMonitoring: (data: any) => void;
  isLoading: boolean;
  responsibleFilter: string;
  setResponsibleFilter: (filter: string) => void;
  getUniqueResponsibles: () => string[];
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({
  clientType,
  monitoringItems,
  form,
  handleAddMonitoring,
  isLoading,
  responsibleFilter,
  setResponsibleFilter,
  getUniqueResponsibles
}) => {
  return (
    <div className="space-y-6">
      <MonitoringForm 
        form={form} 
        onSubmit={handleAddMonitoring}
        clientType={clientType}
      />
      
      <MonitoringList 
        items={monitoringItems} 
        onDelete={() => {}} // We'll pass this in the main component
        isLoading={isLoading}
        uniqueResponsibles={getUniqueResponsibles()}
        responsibleFilter={responsibleFilter}
        onFilterChange={setResponsibleFilter}
      />
    </div>
  );
};

export default MonitoringTab;

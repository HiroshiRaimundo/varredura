
import React from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import MonitoringList from "@/components/monitoring-list";

interface MonitoringTabProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ 
  items, 
  onDelete,
  isLoading = false
}) => {
  return (
    <div className="grid gap-6">
      <MonitoringList 
        items={items}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MonitoringTab;

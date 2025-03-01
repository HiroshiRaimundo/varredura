
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsibleFilter from "./ResponsibleFilter";
import MonitoringListStatus from "./MonitoringListStatus";
import MonitoringCardList from "./MonitoringCardList";
import { MonitoringListProps } from "./types";

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
          <div className="flex items-center gap-2">
            <CardTitle>Monitoramentos Ativos</CardTitle>
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <ResponsibleFilter 
            responsibleFilter={responsibleFilter}
            onFilterChange={onFilterChange}
            uniqueResponsibles={uniqueResponsibles}
          />
        </div>
      </CardHeader>
      <CardContent>
        <MonitoringListStatus 
          isLoading={isLoading}
          isEmpty={items.length === 0}
          responsibleFilter={responsibleFilter}
        />
        
        {!isLoading && items.length > 0 && (
          <MonitoringCardList items={items} onDelete={onDelete} />
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;

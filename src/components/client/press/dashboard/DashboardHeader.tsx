
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  isRefreshing: boolean;
  refreshData: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  timeRange, 
  setTimeRange, 
  isRefreshing, 
  refreshData 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard de Assessoria de Imprensa</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho dos seus releases e publicações na mídia
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={refreshData} 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        
        <select 
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="last7days">Últimos 7 dias</option>
          <option value="last30days">Últimos 30 dias</option>
          <option value="last90days">Últimos 90 dias</option>
          <option value="thisyear">Este ano</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardHeader;

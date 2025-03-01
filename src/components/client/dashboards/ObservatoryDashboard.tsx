
import React from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import StudiesChart from "@/components/dashboard/StudiesChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SystemUpdatesChart from "@/components/dashboard/SystemUpdatesChart";

interface ObservatoryDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
}

const ObservatoryDashboard: React.FC<ObservatoryDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StudiesChart data={trendData} />
        <CategoryChart data={categoryData} />
        <FrequencyChart data={frequencyData} />
      </div>
      
      <SystemUpdatesChart data={trendData} />
    </div>
  );
};

export default ObservatoryDashboard;

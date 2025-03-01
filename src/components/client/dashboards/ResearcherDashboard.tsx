
import React from "react";
import CategoryChart from "@/components/dashboard/CategoryChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import ResearchersChart from "@/components/dashboard/ResearchersChart";
import SystemUpdatesChart from "@/components/dashboard/SystemUpdatesChart";

interface ResearcherDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
  responsibleData: any[];
  radarData: any[];
}

const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData,
  responsibleData,
  radarData
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryChart data={categoryData} />
        <SourceTypeChart data={radarData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrequencyChart data={frequencyData} />
        <ResearchersChart data={responsibleData} />
      </div>
      
      <SystemUpdatesChart data={trendData} />
    </div>
  );
};

export default ResearcherDashboard;

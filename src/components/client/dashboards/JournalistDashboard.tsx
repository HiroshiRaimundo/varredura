
import React from "react";
import StudiesChart from "@/components/dashboard/StudiesChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import CategoryChart from "@/components/dashboard/CategoryChart";

interface JournalistDashboardProps {
  trendData: any[];
  categoryData: any[];
  frequencyData: any[];
  radarData: any[];
}

const JournalistDashboard: React.FC<JournalistDashboardProps> = ({
  trendData,
  categoryData,
  frequencyData,
  radarData
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudiesChart data={trendData} />
        <CategoryChart data={categoryData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrequencyChart data={frequencyData} />
        <SourceTypeChart data={radarData} />
      </div>
    </div>
  );
};

export default JournalistDashboard;


import React from "react";
import StudiesChart from "@/components/dashboard/StudiesChart";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";

interface PoliticianDashboardProps {
  trendData: any[];
  frequencyData: any[];
  radarData: any[];
}

const PoliticianDashboard: React.FC<PoliticianDashboardProps> = ({
  trendData,
  frequencyData,
  radarData
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudiesChart data={trendData} />
        <FrequencyChart data={frequencyData} />
      </div>
      
      <SourceTypeChart data={radarData} />
    </div>
  );
};

export default PoliticianDashboard;

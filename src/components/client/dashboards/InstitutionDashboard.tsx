
import React from "react";
import StudiesChart from "@/components/dashboard/StudiesChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import SourceTypeChart from "@/components/dashboard/SourceTypeChart";
import ResearchersChart from "@/components/dashboard/ResearchersChart";

interface InstitutionDashboardProps {
  trendData: any[];
  categoryData: any[];
  radarData: any[];
  responsibleData: any[];
}

const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({
  trendData,
  categoryData,
  radarData,
  responsibleData
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StudiesChart data={trendData} />
        <CategoryChart data={categoryData} />
        <SourceTypeChart data={radarData} />
      </div>
      
      <ResearchersChart data={responsibleData} />
    </div>
  );
};

export default InstitutionDashboard;

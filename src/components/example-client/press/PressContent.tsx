
import React from "react";
import { ClientType } from "@/components/client/ClientTypes";
import DashboardSection from "./DashboardSection";
import ReleasesSection from "./ReleasesSection";

interface PressContentProps {
  activeTab: string;
  clientType: ClientType;
  mockData: any;
}

const PressContent: React.FC<PressContentProps> = ({ 
  activeTab, 
  clientType,
  mockData 
}) => {
  return (
    <div>
      {activeTab === "dashboard" && (
        <DashboardSection clientType={clientType} mockData={mockData} />
      )}

      {activeTab === "releases" && (
        <ReleasesSection clientType={clientType} />
      )}
    </div>
  );
};

export default PressContent;


import React from "react";
import { ClientType } from "@/components/client/ClientTypes";
import DashboardSection from "./DashboardSection";
import ReleasesSection from "./ReleasesSection";
import PublishedReleasesSection from "./PublishedReleasesSection";

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
        <>
          <ReleasesSection clientType={clientType} />
          <div className="mt-8">
            <PublishedReleasesSection clientType={clientType} mockData={mockData} />
          </div>
        </>
      )}
    </div>
  );
};

export default PressContent;

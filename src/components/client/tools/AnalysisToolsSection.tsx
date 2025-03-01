
import React from "react";
import { ClientType } from "@/components/client/ClientUtils";
import AnalysisToolsCard from "@/components/client/AnalysisToolsCard";

interface AnalysisToolsSectionProps {
  clientType: ClientType;
  onDatasetDownload: () => void;
  onComparisonView: () => void;
}

const AnalysisToolsSection: React.FC<AnalysisToolsSectionProps> = ({
  clientType,
  onDatasetDownload,
  onComparisonView
}) => {
  return (
    <AnalysisToolsCard 
      clientType={clientType} 
      onDatasetDownload={onDatasetDownload} 
      onComparisonView={onComparisonView} 
    />
  );
};

export default AnalysisToolsSection;

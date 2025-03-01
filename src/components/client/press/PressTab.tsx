
import React from "react";
import PressReleaseTab from "@/components/client/PressReleaseTab";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return <PressReleaseTab clientType={clientType} />;
};

export default PressTab;

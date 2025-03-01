
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import { mockData } from "./dashboard/types";
import SearchBar from "./dashboard/SearchBar";
import ReleaseAlerts from "./dashboard/ReleaseAlerts";
import ReleaseTable from "./dashboard/ReleaseTable";
import StatusLegend from "./dashboard/StatusLegend";

interface PressReleaseDashboardProps {
  clientType: string;
}

const PressReleaseDashboard: React.FC<PressReleaseDashboardProps> = ({ clientType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [releases, setReleases] = useState(mockData);
  const [showAlert, setShowAlert] = useState(true);

  // Filtering releases based on search term
  const filteredReleases = releases.filter(release => 
    release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    release.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if there are recently approved or rejected releases to show alert
  const hasApprovedReleases = releases.some(release => release.status === 'approved');
  const hasRejectedReleases = releases.some(release => release.status === 'rejected');

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Acompanhamento de Releases</CardTitle>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </CardHeader>
      <CardContent>
        <ReleaseAlerts 
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          hasApprovedReleases={hasApprovedReleases}
          hasRejectedReleases={hasRejectedReleases}
        />

        <ReleaseTable releases={filteredReleases} />
        
        <StatusLegend />
      </CardContent>
    </Card>
  );
};

export default PressReleaseDashboard;

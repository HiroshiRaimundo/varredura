
import React from 'react';

export interface ReleaseMonitoringDashboardProps {
  releases: any[];
}

const ReleaseMonitoringDashboard: React.FC<ReleaseMonitoringDashboardProps> = ({ releases }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monitoramento de Releases</h2>
      <p>Total de releases monitorados: {releases.length}</p>
    </div>
  );
};

export default ReleaseMonitoringDashboard;

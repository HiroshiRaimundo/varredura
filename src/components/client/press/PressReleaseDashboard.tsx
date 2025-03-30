
import React from 'react';

export interface PressReleaseDashboardProps {
  clientType: string;
}

const PressReleaseDashboard: React.FC<PressReleaseDashboardProps> = ({ clientType }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard de Releases</h2>
      <p>Dashboard para o tipo de cliente: {clientType}</p>
    </div>
  );
};

export default PressReleaseDashboard;

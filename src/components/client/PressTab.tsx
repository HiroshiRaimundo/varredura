
import React from 'react';
import { ClientType } from '@/components/client/ClientTypes';

export interface PressTabProps {
  clientType: ClientType;
  activeTab: string;
}

const PressTab: React.FC<PressTabProps> = ({ clientType, activeTab }) => {
  return (
    <div>
      <h2>Press Tab Content for {clientType}</h2>
      <p>Active tab: {activeTab}</p>
    </div>
  );
};

export default PressTab;

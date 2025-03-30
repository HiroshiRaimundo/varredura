
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PressReleaseForm from './PressReleaseForm';
import PressReleaseDashboard from './PressReleaseDashboard';
import ReleaseMonitoringDashboard from './ReleaseMonitoringDashboard';
import PressReleaseHelp from './PressReleaseHelp';

export interface PressTabProps {
  clientType: string;
}

interface ReleaseMonitoringItem {
  id: string;
  title: string;
  date: string;
  media: string[];
  status: string;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dados mockados para o monitoramento de releases
  const releaseMonitoring: ReleaseMonitoringItem[] = [
    { 
      id: '1', 
      title: 'Nova Parceria Estratégica', 
      date: '2023-05-10', 
      media: ['g1.com', 'uol.com.br', 'exame.com'], 
      status: 'active' 
    },
    { 
      id: '2', 
      title: 'Lançamento do Produto X', 
      date: '2023-05-15', 
      media: ['estadao.com.br', 'valor.com.br'], 
      status: 'active' 
    },
    { 
      id: '3', 
      title: 'Relatório Anual', 
      date: '2023-05-20', 
      media: ['infomoney.com.br'], 
      status: 'active' 
    }
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="new">Novo Release</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        <TabsTrigger value="help">Ajuda</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <PressReleaseDashboard clientType={clientType} />
      </TabsContent>
      
      <TabsContent value="new">
        <PressReleaseForm clientType={clientType} />
      </TabsContent>
      
      <TabsContent value="monitoring">
        <ReleaseMonitoringDashboard 
          title="Monitoramento de Publicações" 
          description="Acompanhe a publicação dos seus releases na imprensa e nas redes sociais"
          releases={releaseMonitoring}
        />
      </TabsContent>
      
      <TabsContent value="help">
        <PressReleaseHelp />
      </TabsContent>
    </Tabs>
  );
};

export default PressTab;

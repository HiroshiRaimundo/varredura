
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublishedReleasesTab from './PublishedReleasesTab';
import ActivityTab from './ActivityTab';
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

interface DashboardTabsProps {
  releases: ReleaseMonitoringItem[];
  recentActivity: any[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ releases, recentActivity }) => {
  return (
    <Tabs defaultValue="published" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="published">Publicados</TabsTrigger>
        <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
      </TabsList>

      <TabsContent value="published">
        <PublishedReleasesTab releases={releases} />
      </TabsContent>

      <TabsContent value="activity">
        <ActivityTab activities={recentActivity} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

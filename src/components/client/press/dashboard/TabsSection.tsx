
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DashboardTabsUI from './DashboardTabsUI';
import ActivityTab from './ActivityTab';
import PublishedReleasesTab from './PublishedReleasesTab';
import { ReleaseMonitoringItem } from '@/hooks/monitoring/types';

interface TabsSectionProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  publishedReleases: ReleaseMonitoringItem[];
}

const TabsSection: React.FC<TabsSectionProps> = ({ 
  activeTab, 
  setActiveTab,
  publishedReleases
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <DashboardTabsUI activeTab={activeTab} setActiveTab={setActiveTab} />
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="overview" className="mt-0">
            <div className="grid gap-6">
              <h3 className="text-lg font-medium">Visão Geral</h3>
              {/* Conteúdo da visão geral */}
            </div>
          </TabsContent>
          <TabsContent value="activity" className="mt-0">
            <ActivityTab activities={[]} />
          </TabsContent>
          <TabsContent value="publications" className="mt-0">
            <PublishedReleasesTab releases={publishedReleases} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabsSection;

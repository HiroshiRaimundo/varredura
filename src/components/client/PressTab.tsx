
import React from "react";
import { Card } from "@/components/ui/card";
import { ClientType } from "@/components/client/ClientTypes";
import PressReleaseForm from "./press/PressReleaseForm";
import PressReleaseDashboard from "./press/PressReleaseDashboard";
import ReleaseMonitoringDashboard from "./press/ReleaseMonitoringDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return (
    <Card className="p-6">
      <Tabs defaultValue="releases" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="releases">
          <PressReleaseForm clientType={clientType} />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <PressReleaseDashboard clientType={clientType} />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <ReleaseMonitoringDashboard clientType={clientType} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PressTab;

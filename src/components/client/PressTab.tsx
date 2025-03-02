
import React from "react";
import { ClientType } from "./ClientTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PressReleaseDashboard from "./press/PressReleaseDashboard";
import PressReleaseForm from "./press/PressReleaseForm";
import ReleaseMonitoringDashboard from "./press/ReleaseMonitoringDashboard";
import PressReleaseHelp from "./press/PressReleaseHelp";

export interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  // Mock data
  const hasActiveReleases = true;
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
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
          {hasActiveReleases ? (
            <ReleaseMonitoringDashboard clientType={clientType} />
          ) : (
            <div className="p-6 text-center bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Você não possui releases ativos para monitoramento. Crie um novo release para começar.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="help">
          <PressReleaseHelp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;

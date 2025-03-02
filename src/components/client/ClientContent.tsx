
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClientType, clientTypeDetails } from "./ClientTypes";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import MonitoringTab from "./monitoring/MonitoringTab";
import PressReleaseTab from "./PressReleaseTab";
import PressTab from "./press/PressTab";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ClientContentProps {
  clientType: ClientType;
}

const ClientContent: React.FC<ClientContentProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];

  // Determine which tabs to show based on client type
  const showPressTab = clientType === "press";
  const showReleaseTab = ["politician", "researcher", "institution", "observatory"].includes(clientType);

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 flex w-full flex-wrap">
          <TabsTrigger key="dashboard" value="dashboard" className="flex-grow">
            Dashboard
          </TabsTrigger>
          <TabsTrigger key="monitoring" value="monitoring" className="flex-grow">
            Monitoramento
          </TabsTrigger>
          {showReleaseTab && (
            <TabsTrigger key="releases" value="releases" className="flex-grow">
              Releases
            </TabsTrigger>
          )}
          {showPressTab && (
            <TabsTrigger key="press" value="press" className="flex-grow">
              Assessoria de Imprensa
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard">
          <ClientDashboardTab clientType={clientType} />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringTab clientType={clientType} />
        </TabsContent>

        {showReleaseTab && (
          <TabsContent value="releases">
            <PressReleaseTab clientType={clientType} />
          </TabsContent>
        )}

        {showPressTab && (
          <TabsContent value="press">
            <PressTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ClientContent;

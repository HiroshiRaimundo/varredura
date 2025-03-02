
import React from "react";
import { ClientType } from "../ClientTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PressDashboard from "./PressDashboard";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="media">Mídia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <PressDashboard clientType={clientType} />
        </TabsContent>
        
        <TabsContent value="media">
          <div className="p-6 text-center bg-muted rounded-lg">
            <p className="text-muted-foreground">
              Serviço de monitoramento de mídia em desenvolvimento.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;

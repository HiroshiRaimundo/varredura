
import React from "react";
import { ClientType } from "./ClientTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClientDashboardTab from "./dashboard/ClientDashboardTab";
import MonitoringTab from "./monitoring/MonitoringTab";
import PressTab from "./PressTab";

interface ClientContentProps {
  clientType: ClientType;
  clientName: string;
}

const ClientContent: React.FC<ClientContentProps> = ({ clientType, clientName }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo à sua área privada</CardTitle>
          <CardDescription>
            Acesse todos os recursos disponíveis para {clientName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
              <TabsTrigger value="press">Assessoria de Imprensa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <ClientDashboardTab clientType={clientType} />
            </TabsContent>
            
            <TabsContent value="monitoring">
              <MonitoringTab clientType={clientType} />
            </TabsContent>
            
            <TabsContent value="press">
              <PressTab clientType={clientType} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientContent;

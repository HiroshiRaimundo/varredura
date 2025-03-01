
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PressReleaseForm from "./press/PressReleaseForm";
import PressReleaseHelp from "./press/PressReleaseHelp";
import PressReleaseDashboard from "./press/PressReleaseDashboard";

interface PressReleaseTabProps {
  clientType: string;
}

const PressReleaseTab: React.FC<PressReleaseTabProps> = ({ clientType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessoria de Imprensa</CardTitle>
        <CardDescription>
          Gerencie seus releases e acompanhe a veiculação na mídia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="create">Criar Release</TabsTrigger>
            <TabsTrigger value="dashboard">Acompanhamento</TabsTrigger>
            <TabsTrigger value="help">Ajuda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <PressReleaseForm clientType={clientType} />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <PressReleaseDashboard clientType={clientType} />
          </TabsContent>
          
          <TabsContent value="help">
            <PressReleaseHelp />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PressReleaseTab;

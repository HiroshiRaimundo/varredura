
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ClientTypePreview from "./client-area/ClientTypePreview";
import useClientAreaActions from "./client-area/ActionHandlers";

const ClientAreaPreview: React.FC = () => {
  const [selectedClientType, setSelectedClientType] = useState<ClientType>("observatory");
  const { 
    handlePreviewClientArea, 
    handleAccessClientArea,
    handleEditClientArea,
    handleClientSettings
  } = useClientAreaActions();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Áreas de Clientes</CardTitle>
          <CardDescription>
            Visualize, edite e gerencie as áreas restritas de cada tipo de cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <AlertTitle className="text-amber-800">Gerenciamento de Áreas de Clientes</AlertTitle>
            <AlertDescription className="text-amber-700">
              Você pode visualizar e editar as áreas de clientes reais ou acessar o exemplo interativo para simulação.
            </AlertDescription>
          </Alert>

          <Tabs 
            defaultValue="observatory" 
            value={selectedClientType}
            onValueChange={(value) => setSelectedClientType(value as ClientType)}
            className="w-full"
          >
            <TabsList className="mb-4 flex w-full flex-wrap">
              {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
                <TabsTrigger key={type} value={type} className="flex-grow">
                  {clientTypeDetails[type].title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Tabs content for each client type */}
            {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
              <TabsContent key={type} value={type}>
                <ClientTypePreview 
                  clientType={type} 
                  onPreview={handlePreviewClientArea}
                  onAccess={handleAccessClientArea}
                  onEdit={handleEditClientArea}
                  onSettings={handleClientSettings}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAreaPreview;

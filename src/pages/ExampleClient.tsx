import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientHeader from "@/components/example-client/ClientHeader";
import ClientInfo from "@/components/example-client/ClientInfo";
import { ClientType } from "@/types/clientTypes";
import { Mail, Eye } from "lucide-react";
import PressContent from "@/components/press/PressContent";
import MonitoringContent from "@/components/monitoring/MonitoringContent";
import AnalysisContent from "@/components/analysis/AnalysisContent";

const ExampleClient: React.FC = () => {
  const [clientType] = useState<ClientType>("press");

  const getClientIcon = () => {
    return <Mail className="h-6 w-6 text-indigo-600" />;
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Eye className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Você está visualizando a interface do cliente como administrador. Isso permite que você veja exatamente o que o cliente vê para fornecer suporte adequado.
            </p>
          </div>
        </div>
      </div>

      <ClientHeader clientType={clientType} getClientIcon={getClientIcon} />
      
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <ClientInfo clientType={clientType} />
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="press" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="press" className="flex-1">Assessoria de Imprensa</TabsTrigger>
                  <TabsTrigger value="monitoring" className="flex-1">Monitoramento</TabsTrigger>
                  <TabsTrigger value="analysis" className="flex-1">Análise</TabsTrigger>
                </TabsList>

                <TabsContent value="press">
                  <PressContent clientType={clientType} />
                </TabsContent>

                <TabsContent value="monitoring">
                  <MonitoringContent />
                </TabsContent>

                <TabsContent value="analysis">
                  <AnalysisContent />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExampleClient;

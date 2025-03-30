
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
  const [activeTab, setActiveTab] = useState("press");

  const getClientIcon = () => {
    return <Mail className="h-6 w-6 text-indigo-600" />;
  };

  return (
    <div className="container py-6 max-w-7xl">
      {/* Alerta de visualização */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Eye className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Você está visualizando a interface do cliente como administrador.
            </p>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <ClientHeader clientType={clientType} getClientIcon={getClientIcon} />
      
      {/* Conteúdo principal */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        {/* Barra lateral */}
        <div className="md:col-span-1">
          <ClientInfo clientType={clientType} />
        </div>
        
        {/* Conteúdo principal */}
        <div className="md:col-span-3">
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Tabs defaultValue="press" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full bg-muted/50 p-1 rounded-t-lg">
                  <TabsTrigger value="press" className="flex-1 py-2">Assessoria de Imprensa</TabsTrigger>
                  <TabsTrigger value="monitoring" className="flex-1 py-2">Monitoramento</TabsTrigger>
                  <TabsTrigger value="analysis" className="flex-1 py-2">Análise</TabsTrigger>
                </TabsList>

                <TabsContent value="press" className="p-6">
                  <PressContent clientType={clientType} />
                </TabsContent>

                <TabsContent value="monitoring" className="p-6">
                  <MonitoringContent />
                </TabsContent>

                <TabsContent value="analysis" className="p-6">
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

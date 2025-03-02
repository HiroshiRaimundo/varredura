
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ClientHeader from "@/components/example-client/ClientHeader";
import ClientTabs from "@/components/example-client/ClientTabs";
import ClientInfo from "@/components/example-client/ClientInfo";
import DefaultContent from "@/components/example-client/DefaultContent";
import { ClientType } from "@/components/client/ClientTypes";
import { Landmark, Database, BookOpen, Building, FileText, Mail } from "lucide-react";
import PressContent from "@/components/example-client/press/PressContent";
import generateMockData from "@/components/example-client/utils/mockDataGenerator";

const ExampleClient: React.FC = () => {
  const [clientType, setClientType] = useState<ClientType>("press");
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");
  const mockData = generateMockData();

  const getClientIcon = (type: ClientType) => {
    switch (type) {
      case "observatory":
        return <Database className="h-6 w-6 text-sky-600" />;
      case "researcher":
        return <BookOpen className="h-6 w-6 text-emerald-600" />;
      case "politician":
        return <Landmark className="h-6 w-6 text-violet-600" />;
      case "institution":
        return <Building className="h-6 w-6 text-amber-600" />;
      case "journalist":
        return <FileText className="h-6 w-6 text-rose-600" />;
      case "press":
        return <Mail className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <div className="container py-6 max-w-7xl">
      <ClientHeader clientType={clientType} getClientIcon={getClientIcon} />
      
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <ClientInfo clientType={clientType} />
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <ClientTabs activeTab={activeTab} setActiveTab={setActiveTab} clientType={clientType} />
              
              <div className="p-6">
                {clientType === "press" ? (
                  <PressContent 
                    activeTab={activeTab} 
                    clientType={clientType}
                    mockData={mockData}
                  />
                ) : (
                  <DefaultContent activeTab={activeTab} clientType={clientType} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExampleClient;

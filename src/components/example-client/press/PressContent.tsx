
import React, { useState } from "react";
import { ClientType } from "@/components/client/ClientTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DashboardSection from "./DashboardSection";
import ReleasesSection from "./ReleasesSection";
import PublishedReleasesSection from "./PublishedReleasesSection";

interface PressContentProps {
  clientType: ClientType;
}

// Interface completa para MockData
interface MockData {
  releases: {
    id: string;
    title: string;
    date: string;
    status: string;
  }[];
  stats: {
    total: number;
    published: number;
    pending: number;
  };
  releaseStats: any[];
  monthlyData: any[];
  mediaOutlets: any[];
  recentReleases: any[];
}

const PressContent: React.FC<PressContentProps> = ({ clientType }) => {
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  
  // Dados mockados para exemplo
  const mockData: MockData = {
    releases: [
      { id: "1", title: "Lançamento de produto sustentável", date: "2023-05-15", status: "published" },
      { id: "2", title: "Nova iniciativa ambiental", date: "2023-05-10", status: "draft" }
    ],
    stats: {
      total: 24,
      published: 18,
      pending: 6
    },
    releaseStats: [],
    monthlyData: [],
    mediaOutlets: [],
    recentReleases: []
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="mb-4 w-full max-w-md mx-auto bg-muted/50">
              <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
              <TabsTrigger value="releases" className="flex-1">Releases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="animate-in fade-in-50">
              <DashboardSection clientType={clientType} mockData={mockData} />
            </TabsContent>
            
            <TabsContent value="releases" className="animate-in fade-in-50">
              <div className="space-y-8">
                <ReleasesSection clientType={clientType} />
                <PublishedReleasesSection clientType={clientType} mockData={mockData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressContent;

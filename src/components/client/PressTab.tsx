import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientType } from "@/types/clientTypes";
import PressDashboard from "@/components/example-client/press/PressDashboard";
import ReleaseMonitoringDashboard from "@/components/example-client/press/ReleaseMonitoringDashboard";

interface PressTabProps {
  clientType?: ClientType;
}

interface ReleaseMonitoringItem {
  id: string;
  title: string;
  data: any;
}

const PressTab: React.FC<PressTabProps> = ({ clientType = "press" }) => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "releases" | "monitoring">("dashboard");
  
  const totalReleases = 50;
  const publishedCount = 35;
  const pendingCount = 10;
  const rejectedCount = 5;

  const byOutlet = [
    { outlet: "Estadão", count: 15 },
    { outlet: "Folha de São Paulo", count: 12 },
    { outlet: "O Globo", count: 8 },
    { outlet: "Valor Econômico", count: 5 },
  ];

  const recentPublications = [
    { title: "Nova parceria impulsiona o crescimento da empresa", outlet: "Estadão", date: "2024-08-01" },
    { title: "Empresa lança produto inovador no mercado", outlet: "Folha de São Paulo", date: "2024-07-25" },
  ];
  
  const handleReleaseSubmit = (data: any) => {
    console.log("Release submitted:", data);
  };
  
  const PressReleaseForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ title, content });
      setTitle("");
      setContent("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título do Release</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do release"
          />
        </div>
        <div>
          <Label htmlFor="content">Conteúdo do Release</Label>
          <Input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Conteúdo do release"
          />
        </div>
        <Button type="submit">Enviar Release</Button>
      </form>
    );
  };
  
  const monitoringData = [
    {
      id: "1",
      title: "Resumo de Monitoramento",
      data: {
        totalReleases,
        publishedCount,
        pendingCount,
        rejectedCount,
        byOutlet,
        recentPublications
      }
    }
  ];

  return (
    <div>
      <Tabs defaultValue="dashboard" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <PressDashboard 
            totalReleases={totalReleases} 
            publishedCount={publishedCount}
            pendingCount={pendingCount}
            rejectedCount={rejectedCount}
            byOutlet={byOutlet}
          />
        </TabsContent>
        
        <TabsContent value="releases">
          <PressReleaseForm onSubmit={handleReleaseSubmit} />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <ReleaseMonitoringDashboard 
            monitoringData={monitoringData}
            clientType={clientType}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressTab;

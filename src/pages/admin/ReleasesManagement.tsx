
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import ReleasesList from "@/components/client/releases/ReleasesList";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ReleasesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");
  
  const handleApproveRelease = (releaseId: string) => {
    toast({
      title: "Release aprovado",
      description: `Release #${releaseId} foi aprovado com sucesso.`
    });
  };
  
  const handleRejectRelease = (releaseId: string) => {
    toast({
      title: "Release rejeitado",
      description: `Release #${releaseId} foi rejeitado.`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Releases</CardTitle>
          <CardDescription>
            Aprove, rejeite ou revise releases enviados pelos clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="pt-6">
              <ReleasesList filter="pending" />
              
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleRejectRelease("123")}>
                  Rejeitar Selecionados
                </Button>
                <Button onClick={() => handleApproveRelease("123")}>
                  Aprovar Selecionados
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="approved" className="pt-6">
              <ReleasesList filter="approved" />
            </TabsContent>
            
            <TabsContent value="rejected" className="pt-6">
              <ReleasesList filter="rejected" />
            </TabsContent>
            
            <TabsContent value="all" className="pt-6">
              <ReleasesList filter="all" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleasesManagement;


import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PressReleaseForm from "./press/PressReleaseForm";
import PressReleaseHelp from "./press/PressReleaseHelp";
import PressReleaseDashboard from "./press/PressReleaseDashboard";
import PressDashboard from "./press/PressDashboard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PressReleaseTabProps {
  clientType: string;
}

const PressReleaseTab: React.FC<PressReleaseTabProps> = ({ clientType }) => {
  const [showInfoAlert, setShowInfoAlert] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessoria de Imprensa</CardTitle>
        <CardDescription>
          Gerencie seus releases e acompanhe a veiculação na mídia
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showInfoAlert && (
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-700">Processo de Release</AlertTitle>
            <AlertDescription className="text-blue-600">
              Todos os releases passam por uma análise antes do envio à imprensa. 
              Após aprovação, eles serão enviados aos jornalistas cadastrados em nossa base.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-6 w-6 p-0" 
              onClick={() => setShowInfoAlert(false)}
            >
              ×
            </Button>
          </Alert>
        )}
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="create">Criar Release</TabsTrigger>
            <TabsTrigger value="monitor">Acompanhamento</TabsTrigger>
            <TabsTrigger value="help">Ajuda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <PressDashboard clientType={clientType} />
          </TabsContent>
          
          <TabsContent value="create">
            <PressReleaseForm clientType={clientType} />
          </TabsContent>
          
          <TabsContent value="monitor">
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

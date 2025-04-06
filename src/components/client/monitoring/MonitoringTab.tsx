
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import ActiveMonitorings from "./ActiveMonitorings";
import MonitoringResultsList from "./MonitoringResultsList";
import NewMonitoringForm from "./NewMonitoringForm";

const MonitoringTab: React.FC = () => {
  const [showNewMonitoringForm, setShowNewMonitoringForm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Monitoramento de Mídia</CardTitle>
            <CardDescription>
              Configure e acompanhe o monitoramento de termos na mídia
            </CardDescription>
          </div>
          {!showNewMonitoringForm && (
            <Button 
              onClick={() => setShowNewMonitoringForm(true)} 
              className="flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Novo Monitoramento</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showNewMonitoringForm ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => setShowNewMonitoringForm(false)} 
              className="mb-4 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para monitoramentos
            </Button>
            <NewMonitoringForm onSubmitSuccess={() => setShowNewMonitoringForm(false)} />
          </div>
        ) : (
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Monitoramentos Ativos</TabsTrigger>
              <TabsTrigger value="results">Resultados</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ActiveMonitorings />
            </TabsContent>
            <TabsContent value="results">
              <MonitoringResultsList />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringTab;

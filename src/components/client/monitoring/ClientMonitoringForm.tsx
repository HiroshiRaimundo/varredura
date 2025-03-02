
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ClientType } from "@/components/client/ClientTypes";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  notes?: string;
}

const ClientMonitoringForm: React.FC = () => {
  const { clientType } = useParams<{ clientType: string }>();
  const effectiveClientType = clientType as ClientType || "observatory";
  const colorClasses = getColorClasses(effectiveClientType);
  
  const form = useForm<MonitoringItem>({
    defaultValues: {
      name: "",
      url: "",
      frequency: "diario",
      category: "",
      responsible: "",
      keywords: "",
      notes: ""
    }
  });

  const handleAddMonitoring = async (data: MonitoringItem) => {
    console.log("Adding monitoring item for client:", effectiveClientType, data);
    
    // In a real app, this would send data to the server
    toast({
      title: "Monitoramento adicionado",
      description: `O monitoramento de "${data.name}" foi configurado com sucesso.`,
    });
    
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Card className={`border-l-4 ${colorClasses.border}`}>
        <CardHeader>
          <CardTitle>Adicionar Novo Monitoramento</CardTitle>
          <CardDescription>
            Configure um novo item para monitoramento automático de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonitoringForm 
            form={form} 
            onSubmit={handleAddMonitoring} 
            clientType={effectiveClientType} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientMonitoringForm;

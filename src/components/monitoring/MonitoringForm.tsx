
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import MonitoringFormInputs from "./MonitoringFormInputs";

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

interface MonitoringFormProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
  clientType?: "observatory" | "researcher" | "politician" | "institution" | "journalist";
}

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit, clientType }) => {
  // Get title based on client type
  const getTitle = () => {
    switch (clientType) {
      case "observatory":
        return "Sistema de Monitoramento para Observatórios";
      case "researcher":
        return "Sistema de Monitoramento para Pesquisadores";
      case "politician":
        return "Sistema de Alertas para Gestores Públicos";
      case "institution":
        return "Sistema de Monitoramento Institucional";
      case "journalist":
        return "Sistema de Monitoramento de Fontes e Pautas";
      default:
        return "Sistema de Monitoramento";
    }
  };
  
  // Get description based on client type
  const getDescription = () => {
    switch (clientType) {
      case "observatory":
        return "Configure análises comparativas e acesso a datasets completos";
      case "researcher":
        return "Identifique correlações e tendências para suas pesquisas";
      case "politician":
        return "Acompanhe indicadores de impacto e novas legislações";
      case "institution":
        return "Monitore dados relevantes para sua instituição";
      case "journalist":
        return "Acompanhe tendências e identifique novas pautas";
      default:
        return "Gerencie monitoramentos automáticos de fontes de dados";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>
          {getDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MonitoringFormInputs form={form} onSubmit={onSubmit} clientType={clientType} />
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;

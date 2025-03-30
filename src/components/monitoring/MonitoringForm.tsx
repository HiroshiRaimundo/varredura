
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import MonitoringFormInputs from "./MonitoringFormInputs";
import { ClientType } from "@/types/clientTypes";
import { getMonitoringFormTitle, getMonitoringFormDescription } from "./utils/clientTypeUtils";

export interface MonitoringItem {
  id?: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  notes?: string;
}

interface MonitoringFormProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
  clientType?: ClientType;
}

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit, clientType }) => {
  console.log("MonitoringForm rendering with clientType:", clientType);
  
  // Ensure form is valid before rendering
  if (!form) {
    console.error("MonitoringForm received undefined form");
    return (
      <Card>
        <CardHeader>
          <CardTitle>Erro no Formulário</CardTitle>
          <CardDescription>
            Ocorreu um erro ao carregar o formulário de monitoramento. Por favor, recarregue a página.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <MonitoringFormInputs form={form} onSubmit={onSubmit} clientType={clientType} />
  );
};

export default MonitoringForm;

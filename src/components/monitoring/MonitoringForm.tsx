
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Monitoramento</CardTitle>
        <CardDescription>
          Gerencie monitoramentos automáticos de fontes de dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MonitoringFormInputs form={form} onSubmit={onSubmit} clientType={clientType} />
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;

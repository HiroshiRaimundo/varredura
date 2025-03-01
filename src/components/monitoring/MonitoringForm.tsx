
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import MonitoringFormInputs from "./MonitoringFormInputs";
import { ClientType, getMonitoringFormTitle, getMonitoringFormDescription } from "./utils/clientTypeUtils";

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
  clientType?: ClientType;
}

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit, clientType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getMonitoringFormTitle(clientType)}</CardTitle>
        <CardDescription>
          {getMonitoringFormDescription(clientType)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MonitoringFormInputs form={form} onSubmit={onSubmit} clientType={clientType} />
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;

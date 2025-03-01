
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClientType, getClientTypeInfo } from "./utils/clientTypeUtils";

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

interface BasicFormFieldsProps {
  form: UseFormReturn<MonitoringItem>;
  clientType?: ClientType;
}

const BasicFormFields: React.FC<BasicFormFieldsProps> = ({ form, clientType }) => {
  const clientInfo = getClientTypeInfo(clientType);
  
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Monitoramento</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
            </FormControl>
            <FormDescription>
              {clientInfo.description}
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da Fonte</FormLabel>
            <FormControl>
              <Input placeholder="https://dados.gov.br/exemplo" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="api_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da API (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="https://api.exemplo.com/dados" {...field} />
            </FormControl>
            <FormDescription>
              Insira o endpoint da API para monitoramento via integração direta
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicFormFields;

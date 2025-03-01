
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface AdvancedFormFieldsProps {
  form: UseFormReturn<MonitoringItem>;
}

const AdvancedFormFields: React.FC<AdvancedFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Palavras-chave (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Desmatamento, meio ambiente, amazônia" {...field} />
            </FormControl>
            <FormDescription>
              Separe as palavras-chave por vírgula
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="responsible"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Responsável</FormLabel>
            <FormControl>
              <Input placeholder="Nome do pesquisador ou responsável" {...field} />
            </FormControl>
            <FormDescription>
              Informe o nome do pesquisador responsável por este monitoramento
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Anotações (opcional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Observações relevantes sobre este monitoramento..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default AdvancedFormFields;

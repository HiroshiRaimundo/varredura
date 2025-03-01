
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ClientType, getClientTypeInfo, getDefaultCategories } from "./utils/clientTypeUtils";
import ClientAlert from "./ClientAlert";
import CategoryManager from "./CategoryManager";
import BasicFormFields from "./BasicFormFields";
import AdvancedFormFields from "./AdvancedFormFields";

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

interface MonitoringFormInputsProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
  clientType?: ClientType;
}

const MonitoringFormInputs: React.FC<MonitoringFormInputsProps> = ({ form, onSubmit, clientType }) => {
  const [allCategories, setAllCategories] = useState<string[]>(getDefaultCategories(clientType));
  const clientInfo = getClientTypeInfo(clientType);
  
  const handleCategoriesUpdated = (categories: string[]) => {
    setAllCategories(categories);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ClientAlert alertText={clientInfo.alert} />
        
        <BasicFormFields form={form} clientType={clientType} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">Selecione uma categoria</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <CategoryManager 
            clientType={clientType} 
            onCategoryAdded={handleCategoriesUpdated}
          />
        </div>

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequência de Atualização</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Selecione uma frequência</option>
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        <AdvancedFormFields form={form} />

        <Button type="submit">Adicionar Monitoramento</Button>
      </form>
    </Form>
  );
};

export default MonitoringFormInputs;

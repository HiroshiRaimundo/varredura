
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
}

interface MonitoringFormProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
}

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Monitoramento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Monitoramento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
                  </FormControl>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Desmatamento, Legislação, Demografia" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de Atualização</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Diário, Semanal, Mensal" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Adicionar Monitoramento</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;

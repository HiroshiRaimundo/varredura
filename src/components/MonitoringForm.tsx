
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrapyStructure from "./ScrapyStructure";

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
        <CardTitle>Sistema de Monitoramento</CardTitle>
        <CardDescription>
          Gerencie monitoramentos automáticos de fontes de dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Adicionar Monitoramento</TabsTrigger>
            <TabsTrigger value="structure">Estrutura do Projeto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
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
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="governo">Governo</option>
                          <option value="indicadores">Indicadores</option>
                          <option value="legislacao">Legislação</option>
                        </select>
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

                <Button type="submit">Adicionar Monitoramento</Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="structure">
            <ScrapyStructure />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;

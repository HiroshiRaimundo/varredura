
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import Map from "@/components/Map";

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
}

const Index = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const form = useForm<MonitoringItem>();

  const onSubmit = (data: MonitoringItem) => {
    setMonitoringItems([...monitoringItems, data]);
    form.reset();
    toast({
      title: "Item adicionado",
      description: `Monitoramento de ${data.name} foi configurado.`
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulário de Monitoramento */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Sistema de Monitoramento Regional</CardTitle>
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

          {/* Mapa */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Visualização Geográfica</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
              <Map />
            </CardContent>
          </Card>
        </div>

        {/* Lista de Monitoramentos */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoramentos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            {monitoringItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Nenhum item sendo monitorado ainda.
              </p>
            ) : (
              <div className="grid gap-4">
                {monitoringItems.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Categoria: {item.category}</p>
                          <p className="text-sm text-muted-foreground">Fonte: {item.url}</p>
                          <p className="text-sm text-muted-foreground">Frequência: {item.frequency}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

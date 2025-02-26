
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
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
        <Card>
          <CardHeader>
            <CardTitle>Sistema de Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Preço do Produto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL para Monitorar</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequência de Monitoramento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 30 minutos" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Adicionar Monitoramento</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itens Monitorados</CardTitle>
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
                          <p className="text-sm text-muted-foreground">{item.url}</p>
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

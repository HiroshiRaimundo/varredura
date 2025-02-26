
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonitoringItem {
  name: string;
  url: string;
  frequency: string;
  category: string;
}

// Dados de exemplo para o dashboard
const mockData = [
  { name: 'Jan', desmatamento: 400, legislacao: 240, demografia: 240 },
  { name: 'Fev', desmatamento: 300, legislacao: 139, demografia: 221 },
  { name: 'Mar', desmatamento: 200, legislacao: 980, demografia: 229 },
  { name: 'Abr', desmatamento: 278, legislacao: 390, demografia: 200 },
  { name: 'Mai', desmatamento: 189, legislacao: 480, demografia: 218 },
];

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
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="map">Mapa Interativo</TabsTrigger>
          </TabsList>

          {/* Aba do Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="desmatamento" stroke="#8884d8" />
                        <Line type="monotone" dataKey="legislacao" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="demografia" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monitoramentos Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{monitoringItems.length}</div>
                    <p className="text-muted-foreground">Total de fontes monitoradas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertas Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">7</div>
                    <p className="text-muted-foreground">Últimas 24 horas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Atualizações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24</div>
                    <p className="text-muted-foreground">Dados atualizados hoje</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba de Monitoramento */}
          <TabsContent value="monitoring">
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

            {/* Lista de Monitoramentos */}
            <Card className="mt-6">
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
          </TabsContent>

          {/* Aba do Mapa */}
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Visualização Geográfica</CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

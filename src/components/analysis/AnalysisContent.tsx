import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Filter, AlertCircle, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MonitoringStats {
  totalMonitorings: number;
  activeMonitorings: number;
  byCategory: { name: string; value: number }[];
  byFrequency: { name: string; value: number }[];
  byResponsible: { name: string; value: number }[];
  recentUpdates: {
    id: string;
    name: string;
    type: string;
    date: string;
    changes: number;
  }[];
}

const AnalysisContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Dados simulados - serão substituídos pelos dados reais
  const stats: MonitoringStats = {
    totalMonitorings: 15,
    activeMonitorings: 12,
    byCategory: [
      { name: 'Governo', value: 6 },
      { name: 'Indicadores', value: 5 },
      { name: 'Legislação', value: 4 }
    ],
    byFrequency: [
      { name: 'Horária', value: 2 },
      { name: 'Diária', value: 8 },
      { name: 'Semanal', value: 3 },
      { name: 'Mensal', value: 2 }
    ],
    byResponsible: [
      { name: 'João', value: 4 },
      { name: 'Maria', value: 3 },
      { name: 'Pedro', value: 5 },
      { name: 'Ana', value: 3 }
    ],
    recentUpdates: [
      {
        id: '1',
        name: 'Portal da Transparência',
        type: 'Governo',
        date: '2025-03-05T14:30:00',
        changes: 15
      },
      {
        id: '2',
        name: 'IBGE - Indicadores',
        type: 'Indicadores',
        date: '2025-03-05T13:45:00',
        changes: 8
      }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Análise de Monitoramentos</h2>
          <p className="text-muted-foreground">
            Estatísticas e insights sobre os monitoramentos ativos
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
            <SelectItem value="1y">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Monitoramentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMonitorings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeMonitorings} ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Categorias
          </TabsTrigger>
          <TabsTrigger value="updates" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Atualizações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.byCategory}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {stats.byCategory.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Frequência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.byFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoramentos por Responsável</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.byResponsible.map((responsible, index) => (
                    <div key={responsible.name} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{responsible.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {responsible.value} monitoramentos
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(responsible.value / stats.totalMonitorings) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Atualizações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentUpdates.map(update => (
                  <div
                    key={update.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{update.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {update.type} • {new Date(update.date).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {update.changes} alterações
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisContent;

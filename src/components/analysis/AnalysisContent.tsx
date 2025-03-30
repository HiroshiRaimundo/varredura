import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Filter, AlertCircle, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";

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
  dailyActivity: {
    date: string;
    changes: number;
    newItems: number;
  }[];
  keywordStats: {
    keyword: string;
    mentions: number;
    trend: number;
  }[];
}

const generateDailyActivity = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      changes: Math.floor(Math.random() * 50) + 10,
      newItems: Math.floor(Math.random() * 20)
    });
  }
  return data;
};

const AnalysisContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Dados de exemplo expandidos
  const stats: MonitoringStats = {
    totalMonitorings: 15,
    activeMonitorings: 12,
    byCategory: [
      { name: 'Licitações', value: 6 },
      { name: 'Diário Oficial', value: 5 },
      { name: 'Indicadores', value: 4 },
      { name: 'Legislação', value: 3 },
      { name: 'Contratos', value: 2 }
    ],
    byFrequency: [
      { name: 'Horária', value: 2 },
      { name: 'Diária', value: 8 },
      { name: 'Semanal', value: 3 },
      { name: 'Mensal', value: 2 }
    ],
    byResponsible: [
      { name: 'João Silva', value: 4 },
      { name: 'Maria Santos', value: 3 },
      { name: 'Pedro Costa', value: 5 },
      { name: 'Ana Oliveira', value: 3 }
    ],
    recentUpdates: [
      {
        id: '1',
        name: 'Portal da Transparência',
        type: 'Licitações',
        date: '2025-03-05T14:30:00',
        changes: 15
      },
      {
        id: '2',
        name: 'IBGE - Indicadores',
        type: 'Indicadores',
        date: '2025-03-05T13:45:00',
        changes: 8
      },
      {
        id: '3',
        name: 'Diário Oficial',
        type: 'Legislação',
        date: '2025-03-05T12:30:00',
        changes: 12
      }
    ],
    dailyActivity: generateDailyActivity(),
    keywordStats: [
      { keyword: 'licitação', mentions: 145, trend: 12 },
      { keyword: 'contrato', mentions: 98, trend: -5 },
      { keyword: 'edital', mentions: 76, trend: 8 },
      { keyword: 'pregão', mentions: 65, trend: 15 },
      { keyword: 'dispensa', mentions: 43, trend: -2 }
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alterações Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dailyActivity[stats.dailyActivity.length - 1].changes}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.dailyActivity[stats.dailyActivity.length - 1].newItems} novos itens
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Palavras-chave Monitoradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.keywordStats.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.keywordStats.reduce((acc, curr) => acc + curr.mentions, 0)} menções totais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responsáveis Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byResponsible.length}</div>
            <p className="text-xs text-muted-foreground">
              Gerenciando {stats.totalMonitorings} monitoramentos
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
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Atividade
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Palavras-chave
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
                      <Legend />
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

        <TabsContent value="activity">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="changes" stroke="#8884d8" name="Alterações" />
                      <Line type="monotone" dataKey="newItems" stroke="#82ca9d" name="Novos Itens" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Palavras-chave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.keywordStats.map(keyword => (
                  <div key={keyword.keyword} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        <p className="text-sm text-muted-foreground">
                          {keyword.mentions} menções totais
                        </p>
                      </div>
                      <Badge variant={keyword.trend > 0 ? "default" : "secondary"}>
                        {keyword.trend > 0 ? '+' : ''}{keyword.trend}% em 30 dias
                      </Badge>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${(keyword.mentions / stats.keywordStats[0].mentions) * 100}%`
                        }}
                      />
                    </div>
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

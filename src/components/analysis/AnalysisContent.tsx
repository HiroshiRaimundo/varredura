import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Filter, AlertCircle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Tipos de dados coletados pelo sistema
interface CollectedData {
  id: string;
  source: string;
  type: 'governo' | 'indicadores' | 'legislacao';
  date: string;
  value: number;
  metadata: {
    category?: string;
    region?: string;
    indicator?: string;
    description?: string;
  };
}

const AnalysisContent: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('trends');

  // Dados simulados - serão substituídos pelos dados reais do sistema
  const collectedData: CollectedData[] = [
    {
      id: '1',
      source: 'IBGE',
      type: 'indicadores',
      date: '2025-03-01',
      value: 102.5,
      metadata: {
        category: 'Desenvolvimento',
        region: 'Sudeste',
        indicator: 'IDH',
        description: 'Índice de Desenvolvimento Humano'
      }
    },
    // ... mais dados
  ];

  // Análise de tendências temporais
  const trendData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleString('default', { month: 'short' }),
    value: Math.random() * 100 + 50
  }));

  // Distribuição por região
  const regionalData = [
    { name: 'Norte', value: 25 },
    { name: 'Nordeste', value: 35 },
    { name: 'Centro-Oeste', value: 20 },
    { name: 'Sudeste', value: 45 },
    { name: 'Sul', value: 30 }
  ];

  // Análise de variação
  const variationData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    variation: Math.random() * 20 - 10
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Análise de Dados</h2>
          <p className="text-muted-foreground">
            Análise automatizada dos dados coletados pelo sistema de monitoramento
          </p>
        </div>
        <div className="flex items-center gap-4">
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tendências
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Distribuição Regional
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Alertas e Variações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Temporal dos Indicadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Tendências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Tendência Principal</h4>
                    <p>Crescimento consistente nos últimos 3 meses, com variação média de +15%</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Sazonalidade</h4>
                    <p>Padrão sazonal identificado com picos nos meses de março e setembro</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Projeção</h4>
                    <p>Tendência de crescimento para os próximos 2 meses baseada no modelo preditivo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Região</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionalData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label
                      >
                        {regionalData.map((entry, index) => (
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
                <CardTitle>Análise Regional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalData.map((region, index) => (
                    <div key={region.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{region.name}</h4>
                        <span className="text-sm font-medium" style={{ color: COLORS[index] }}>
                          {region.value}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${region.value}%`,
                            backgroundColor: COLORS[index]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variação dos Indicadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={variationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="variation"
                        fill={(entry) => entry.variation > 0 ? '#10B981' : '#EF4444'}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas e Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">Variação Significativa</h4>
                    <p className="text-sm">Aumento de 25% no indicador de desenvolvimento regional</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Novo Padrão Identificado</h4>
                    <p className="text-sm">Correlação forte entre investimentos e crescimento do IDH</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Meta Atingida</h4>
                    <p className="text-sm">Indicador de educação alcançou a meta estabelecida</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisContent;

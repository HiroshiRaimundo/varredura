import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Share2, Bell, Filter, ChevronDown, Copy, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface AnalyticsData {
  timeRange: string;
  metrics: {
    totalMonitorings: number;
    activeMonitorings: number;
    successRate: number;
    averageUpdateTime: number;
    alertsGenerated: number;
  };
  trends: {
    date: string;
    updates: number;
    alerts: number;
  }[];
  distribution: {
    type: string;
    count: number;
  }[];
}

interface AlertConfig {
  metric: string;
  threshold: number;
  enabled: boolean;
}

export const MonitoringAnalytics: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [exportFormat, setExportFormat] = useState("csv");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [drillDownLevel, setDrillDownLevel] = useState(0);
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>([
    { metric: "successRate", threshold: 95, enabled: true },
    { metric: "averageUpdateTime", threshold: 60, enabled: true },
    { metric: "alertsGenerated", threshold: 50, enabled: true }
  ]);

  // Dados mockados para exemplo
  const analyticsData: AnalyticsData = {
    timeRange: "7d",
    metrics: {
      totalMonitorings: 150,
      activeMonitorings: 120,
      successRate: 98.5,
      averageUpdateTime: 45,
      alertsGenerated: 25
    },
    trends: [
      { date: "2024-03-01", updates: 45, alerts: 3 },
      { date: "2024-03-02", updates: 52, alerts: 5 },
      { date: "2024-03-03", updates: 48, alerts: 2 },
    ],
    distribution: [
      { type: "Governo", count: 45 },
      { type: "Notícias", count: 35 },
      { type: "Licitações", count: 40 },
      { type: "Diário Oficial", count: 30 }
    ]
  };

  // Compartilhamento de insights
  const handleShare = (type: 'url' | 'email') => {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}?tab=${activeTab}&timeRange=${timeRange}`;
    
    if (type === 'url') {
      navigator.clipboard.writeText(shareUrl);
      toast.success("URL copiada para a área de transferência");
    } else {
      window.location.href = `mailto:?subject=Análise de Monitoramento&body=${encodeURIComponent(shareUrl)}`;
    }
  };

  // Alertas baseados em análises
  const handleAlertConfigChange = (index: number, field: keyof AlertConfig, value: any) => {
    const newConfigs = [...alertConfigs];
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setAlertConfigs(newConfigs);

    // Verificar limites e notificar
    const metric = newConfigs[index].metric;
    const currentValue = analyticsData.metrics[metric as keyof typeof analyticsData.metrics];
    if (newConfigs[index].enabled && currentValue > newConfigs[index].threshold) {
      toast.warning(`Alerta: ${metric} ultrapassou o limite definido`);
    }
  };

  // Exploração ad-hoc
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDrillDown = (category: string) => {
    setDrillDownLevel(prev => prev + 1);
    // Aqui você adicionaria lógica para buscar dados mais detalhados
    toast.info(`Detalhando dados para: ${category}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Análise de Monitoramento</h2>
          <p className="text-muted-foreground">
            Análise estatística e tendências dos monitoramentos
          </p>
        </div>
        
        {/* Controles de Compartilhamento */}
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleShare('url')}>
            <Copy className="w-4 h-4 mr-2" />
            Copiar URL
          </Button>
          <Button variant="outline" onClick={() => handleShare('email')}>
            <Mail className="w-4 h-4 mr-2" />
            Compartilhar por Email
          </Button>
        </div>
      </div>

      {/* Filtros Dinâmicos */}
      <Card className="p-4">
        <div className="flex space-x-4 items-center">
          <Filter className="w-4 h-4" />
          <Select value={filters.type || ''} onValueChange={(v) => handleFilterChange('type', v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Monitoramento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="governo">Governo</SelectItem>
              <SelectItem value="noticias">Notícias</SelectItem>
              <SelectItem value="licitacoes">Licitações</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.status || ''} onValueChange={(v) => handleFilterChange('status', v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="erro">Com Erro</SelectItem>
            </SelectContent>
          </Select>

          {Object.keys(filters).length > 0 && (
            <Button variant="ghost" onClick={() => setFilters({})}>
              Limpar Filtros
            </Button>
          )}
        </div>
      </Card>

      {/* Configuração de Alertas */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Configuração de Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertConfigs.map((config, index) => (
              <div key={config.metric} className="flex items-center space-x-4">
                <span className="w-32">{config.metric}</span>
                <Slider
                  value={[config.threshold]}
                  onValueChange={(value) => handleAlertConfigChange(index, 'threshold', value[0])}
                  max={100}
                  step={1}
                  className="w-48"
                />
                <span className="w-12">{config.threshold}</span>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(checked) => handleAlertConfigChange(index, 'enabled', checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo Principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(analyticsData.metrics).map(([key, value]) => (
              <Card key={key} className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown(key)}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {key}
                    <ChevronDown className="w-4 h-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                    {key === 'successRate' && '%'}
                    {key === 'averageUpdateTime' && ' min'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Atividade de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={analyticsData.trends}
                xField="date"
                yFields={["updates", "alerts"]}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={analyticsData.trends}
                xField="date"
                yFields={["updates"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around">
              <div className="w-1/2">
                <PieChart
                  data={analyticsData.distribution}
                  nameField="type"
                  valueField="count"
                  height={300}
                />
              </div>
              <div className="w-1/2">
                <BarChart
                  data={analyticsData.distribution}
                  xField="type"
                  yField="count"
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Previsões de Atualização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Em desenvolvimento. Esta funcionalidade usará machine learning para prever
                padrões de atualização e momentos prováveis de mudanças.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMonitoring } from "@/contexts/MonitoringContext";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MonitoringItem {
  id: string;
  name: string;
  type: string;
  status: string;
  lastUpdate: string;
  source: string;
  url?: string;
  apiEndpoint?: string;
  metrics: {
    successRate: number;
    responseTime: number;
    uptime: number;
  };
}

export const MonitoringList: React.FC = () => {
  const { monitorings } = useMonitoring();
  const activeMonitorings = monitorings.filter(m => m.active);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);

  // Buscar dados de monitoramento
  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        // Aqui você faria uma chamada à API real
        const response = await fetch('/api/monitoring/items');
        const data = await response.json();
        setMonitoringItems(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Em caso de erro, usar dados mockados
        setMonitoringItems([]);
      }
    };

    fetchMonitoringData();
  }, []);

  const filterItems = (items: MonitoringItem[]) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.url?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                          (item.apiEndpoint?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesType = selectedType === "todos" || item.type === selectedType;
      const matchesStatus = selectedStatus === "todos" || item.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const filteredItems = filterItems(monitoringItems);

  // Dados para os gráficos
  const performanceData = monitoringItems.map(item => ({
    name: item.name,
    successRate: item.metrics.successRate,
    responseTime: item.metrics.responseTime,
    uptime: item.metrics.uptime
  }));

  if (activeMonitorings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monitoramentos Ativos</CardTitle>
          <CardDescription>Nenhum monitoramento ativo no momento</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Monitoramentos Ativos</h2>
        <p className="text-muted-foreground">
          Visualize e gerencie suas fontes de monitoramento
        </p>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar monitoramento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="url">URL</SelectItem>
            <SelectItem value="api">API</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
            <SelectItem value="erro">Erro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.type === "url" ? item.url : item.apiEndpoint}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={item.status === "ativo" ? "default" : "destructive"}>
                        {item.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Última atualização: {new Date(item.lastUpdate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monitoramentos Ativos</CardTitle>
            <CardDescription>Lista de todos os monitoramentos atualmente ativos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeMonitorings.map((monitoring) => (
              <Card key={monitoring.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold">{monitoring.name}</h4>
                      <p className="text-sm text-muted-foreground">{monitoring.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {monitoring.analysisTypes.map((type) => (
                          <Badge key={type} variant="secondary">{type}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline">{monitoring.frequency}</Badge>
                      <p className="text-sm text-muted-foreground">
                        Criado {formatDistanceToNow(monitoring.createdAt, { locale: ptBR, addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Responsável: {monitoring.responsible}</p>
                    {monitoring.type === 'url' && monitoring.urls && monitoring.urls.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Endereços monitorados:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {monitoring.urls.map((url, index) => (
                            <li key={index}>{url}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {monitoring.type === 'api' && monitoring.apiEndpoint && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">API: {monitoring.apiEndpoint}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="successRate" name="Taxa de Sucesso" stroke="#8884d8" />
                  <Line type="monotone" dataKey="responseTime" name="Tempo de Resposta" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="uptime" name="Disponibilidade" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

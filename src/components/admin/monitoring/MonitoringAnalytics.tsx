import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  timestamp: string;
  value: number;
  source: string;
}

interface MonitoringSource {
  id: string;
  name: string;
  type: string;
  metrics: string[];
}

export const MonitoringAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sources, setSources] = useState<MonitoringSource[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);

  // Buscar fontes de monitoramento e métricas disponíveis
  useEffect(() => {
    const fetchSources = async () => {
      try {
        // Aqui você faria uma chamada à API real
        const response = await fetch('/api/monitoring/sources');
        const data = await response.json();
        setSources(data);
      } catch (error) {
        console.error('Erro ao buscar fontes:', error);
        setSources([]);
      }
    };

    fetchSources();
  }, []);

  // Atualizar dados do gráfico quando os filtros mudarem
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!dateRange?.from || !dateRange?.to || !selectedMetric || selectedSources.length === 0) {
        return;
      }

      try {
        // Aqui você faria a chamada à API real
        const response = await fetch('/api/monitoring/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: dateRange.from,
            endDate: dateRange.to,
            metric: selectedMetric,
            sources: selectedSources,
          }),
        });
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setAnalyticsData([]);
      }
    };

    fetchAnalyticsData();
  }, [dateRange, selectedMetric, selectedSources]);

  // Obter todas as métricas únicas das fontes selecionadas
  const availableMetrics = Array.from(
    new Set(
      sources
        .filter(source => selectedSources.includes(source.id))
        .flatMap(source => source.metrics)
    )
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Análise de Monitoramento</h2>
        <p className="text-muted-foreground">
          Analise os dados coletados das suas fontes de monitoramento
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período da Análise</label>
              <DatePickerWithRange
                date={dateRange}
                setDate={setDateRange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fontes</label>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                {sources.map((source) => (
                  <div key={source.id} className="flex items-center space-x-2 py-2">
                    <input
                      type="checkbox"
                      id={source.id}
                      checked={selectedSources.includes(source.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSources([...selectedSources, source.id]);
                        } else {
                          setSelectedSources(selectedSources.filter(id => id !== source.id));
                        }
                      }}
                      className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor={source.id} className="text-sm">
                      {source.name} ({source.type})
                    </label>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Métrica</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma métrica" />
                </SelectTrigger>
                <SelectContent>
                  {availableMetrics.map((metric) => (
                    <SelectItem key={metric} value={metric}>
                      {metric}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  {selectedSources.map((sourceId) => {
                    const source = sources.find(s => s.id === sourceId);
                    return (
                      <Line
                        key={sourceId}
                        type="monotone"
                        dataKey={`${source?.name}`}
                        name={source?.name}
                        stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

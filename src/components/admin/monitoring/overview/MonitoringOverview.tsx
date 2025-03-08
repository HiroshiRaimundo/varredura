import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

interface PerformanceData {
  timestamp: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
}

export const MonitoringOverview: React.FC = () => {
  // Dados mockados para exemplo
  const performanceData: PerformanceData[] = [
    { timestamp: "00:00", uptime: 100, responseTime: 250, errorRate: 0 },
    { timestamp: "04:00", uptime: 99.8, responseTime: 280, errorRate: 0.2 },
    { timestamp: "08:00", uptime: 99.9, responseTime: 260, errorRate: 0.1 },
    { timestamp: "12:00", uptime: 100, responseTime: 240, errorRate: 0 },
    { timestamp: "16:00", uptime: 99.7, responseTime: 290, errorRate: 0.3 },
    { timestamp: "20:00", uptime: 99.9, responseTime: 270, errorRate: 0.1 },
  ];

  const sourceDistribution = [
    { source: "Portal de Notícias", count: 8 },
    { source: "Blog Corporativo", count: 5 },
    { source: "Redes Sociais", count: 7 },
    { source: "APIs Externas", count: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Uptime e Taxa de Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="uptime"
                    stroke="#10b981"
                    name="Uptime (%)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="errorRate"
                    stroke="#ef4444"
                    name="Taxa de Erro (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#6366f1"
                    name="Tempo de Resposta (ms)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distribuição por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#6366f1" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

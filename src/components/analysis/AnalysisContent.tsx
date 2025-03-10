import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp, Filter, AlertCircle, ExternalLink, 
  Clock, Activity, BarChart2, PieChart as PieChartIcon,
  AlertTriangle, CheckCircle, XCircle, Info
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';
import { useMonitoring } from "@/contexts/MonitoringContext";
import { cn } from "@/lib/utils";

interface AnalysisMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  status: 'success' | 'warning' | 'error' | 'info';
  description: string;
}

interface KeywordAnalysis {
  keyword: string;
  mentions: number;
  sentiment: number;
  relevance: number;
  trend: number;
  sources: { name: string; count: number }[];
}

interface ContentAnalysis {
  type: string;
  metrics: AnalysisMetric[];
  keywords: KeywordAnalysis[];
  trends: { date: string; value: number }[];
  alerts: {
    id: string;
    type: 'error' | 'warning' | 'info' | 'success';
    message: string;
    details: string;
    timestamp: string;
  }[];
}

const AnalysisContent: React.FC = () => {
  const { monitorings } = useMonitoring();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  // Agrupar monitoramentos por tema
  const monitoringsByTheme = useMemo(() => {
    const themes: { [key: string]: any[] } = {};
    monitorings.forEach(monitoring => {
      const theme = monitoring.theme || 'outros';
      if (!themes[theme]) themes[theme] = [];
      themes[theme].push(monitoring);
    });
    return themes;
  }, [monitorings]);

  // Análise de conteúdo por tema
  const contentAnalysis = useMemo(() => {
    const analysis: { [key: string]: ContentAnalysis } = {};
    
    Object.entries(monitoringsByTheme).forEach(([theme, items]) => {
      analysis[theme] = {
        type: theme,
        metrics: [
          {
            id: '1',
            name: 'Precisão',
            value: 85 + Math.random() * 10,
            trend: 5,
            status: 'success',
            description: 'Taxa de precisão das análises'
          },
          {
            id: '2',
            name: 'Relevância',
            value: 75 + Math.random() * 15,
            trend: -2,
            status: 'warning',
            description: 'Relevância média do conteúdo'
          },
          {
            id: '3',
            name: 'Sentimento',
            value: 65 + Math.random() * 20,
            trend: 8,
            status: 'info',
            description: 'Análise de sentimento geral'
          }
        ],
        keywords: items.flatMap(item => 
          (item.metrics || []).map(metric => ({
            keyword: metric,
            mentions: Math.floor(Math.random() * 1000),
            sentiment: Math.random() * 100,
            relevance: Math.random() * 100,
            trend: Math.random() * 20 - 10,
            sources: [
              { name: 'Web', count: Math.floor(Math.random() * 500) },
              { name: 'News', count: Math.floor(Math.random() * 300) },
              { name: 'Social', count: Math.floor(Math.random() * 200) }
            ]
          }))
        ),
        trends: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          value: Math.random() * 100
        })),
        alerts: [
          {
            id: '1',
            type: 'warning',
            message: 'Aumento significativo nas menções',
            details: 'Detectado um aumento de 25% nas menções negativas',
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            type: 'info',
            message: 'Nova fonte identificada',
            details: 'Nova fonte de dados relevante encontrada',
            timestamp: new Date().toISOString()
          }
        ]
      };
    });

    return analysis;
  }, [monitoringsByTheme]);

  const renderMetricCard = (metric: AnalysisMetric) => (
    <Card key={metric.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
        <CardDescription>{metric.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">
              {metric.value.toFixed(1)}%
            </div>
            <div className={cn(
              "text-sm",
              metric.trend > 0 ? "text-green-600" : "text-red-600"
            )}>
              {metric.trend > 0 ? "+" : ""}{metric.trend}%
            </div>
          </div>
          <div className={cn(
            "rounded-full p-2",
            metric.status === 'success' && "bg-green-100 text-green-600",
            metric.status === 'warning' && "bg-yellow-100 text-yellow-600",
            metric.status === 'error' && "bg-red-100 text-red-600",
            metric.status === 'info' && "bg-blue-100 text-blue-600"
          )}>
            {metric.status === 'success' && <CheckCircle className="h-5 w-5" />}
            {metric.status === 'warning' && <AlertTriangle className="h-5 w-5" />}
            {metric.status === 'error' && <XCircle className="h-5 w-5" />}
            {metric.status === 'info' && <Info className="h-5 w-5" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderKeywordAnalysis = (keywords: KeywordAnalysis[]) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico de Menções */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Menções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={keywords.map(k => ({ name: k.keyword, value: k.mentions }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {keywords.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Multidimensional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="keyword" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Sentimento" dataKey="sentiment" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Relevância" dataKey="relevance" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Palavras-chave */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Palavra-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {keywords.map((keyword, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{keyword.keyword}</h4>
                    <Badge variant={keyword.trend > 0 ? "default" : "secondary"}>
                      {keyword.trend > 0 ? "+" : ""}{keyword.trend.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Menções</p>
                      <p className="font-medium">{keyword.mentions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sentimento</p>
                      <p className="font-medium">{keyword.sentiment.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Relevância</p>
                      <p className="font-medium">{keyword.relevance.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Fontes:</p>
                    <div className="flex gap-2">
                      {keyword.sources.map((source, idx) => (
                        <Badge key={idx} variant="outline">
                          {source.name}: {source.count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Filtros */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Análise de Monitoramentos</h2>
          <p className="text-muted-foreground">
            Análise detalhada por tema e métrica
          </p>
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Alertas Importantes */}
      <div className="space-y-2">
        {Object.values(contentAnalysis).flatMap(analysis => 
          analysis.alerts
            .filter(alert => alert.type === 'warning' || alert.type === 'error')
            .map(alert => (
              <Alert key={alert.id} variant={alert.type === 'error' ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.message}</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{alert.details}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </AlertDescription>
              </Alert>
            ))
        )}
      </div>

      {/* Navegação por Temas */}
      <Tabs defaultValue={Object.keys(contentAnalysis)[0]} className="space-y-4">
        <TabsList className="flex-wrap">
          {Object.keys(contentAnalysis).map(theme => (
            <TabsTrigger key={theme} value={theme} className="capitalize">
              {theme}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(contentAnalysis).map(([theme, analysis]) => (
          <TabsContent key={theme} value={theme} className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid gap-4 md:grid-cols-3">
              {analysis.metrics.map(metric => renderMetricCard(metric))}
            </div>

            {/* Gráfico de Tendências */}
            <Card>
              <CardHeader>
                <CardTitle>Tendências de {theme}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysis.trends}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Análise de Palavras-chave */}
            {renderKeywordAnalysis(analysis.keywords)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AnalysisContent;

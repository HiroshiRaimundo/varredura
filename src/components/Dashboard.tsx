
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Button } from "@/components/ui/button";
import AnalysisTools from "./AnalysisTools";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  responsible?: string;
  keywords?: string;
}

interface DashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
}

// Cores para os gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  // Preparar dados para gráficos adicionais baseados nos monitoringItems
  const categoryData = useMemo(() => {
    const categories: { [key: string]: number } = {};
    
    monitoringItems.forEach(item => {
      if (categories[item.category]) {
        categories[item.category]++;
      } else {
        categories[item.category] = 1;
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
  }, [monitoringItems]);
  
  const frequencyData = useMemo(() => {
    const frequencies: { [key: string]: number } = {};
    
    monitoringItems.forEach(item => {
      if (frequencies[item.frequency]) {
        frequencies[item.frequency]++;
      } else {
        frequencies[item.frequency] = 1;
      }
    });
    
    return Object.keys(frequencies).map(frequency => ({
      frequency,
      quantidade: frequencies[frequency]
    }));
  }, [monitoringItems]);
  
  const responsibleData = useMemo(() => {
    const responsibles: { [key: string]: number } = {};
    
    monitoringItems.forEach(item => {
      if (item.responsible) {
        if (responsibles[item.responsible]) {
          responsibles[item.responsible]++;
        } else {
          responsibles[item.responsible] = 1;
        }
      }
    });
    
    // Limitar a 5 responsáveis para não sobrecarregar o gráfico
    return Object.keys(responsibles)
      .slice(0, 5)
      .map(responsible => ({
        responsible,
        monitoramentos: responsibles[responsible]
      }));
  }, [monitoringItems]);

  // Dados para o gráfico radar
  const radarData = useMemo(() => {
    const sourceTypes = ['governo', 'indicadores', 'legislacao', 'api'];
    
    return sourceTypes.map(type => {
      const count = monitoringItems.filter(item => item.category === type).length;
      return {
        subject: type,
        A: count,
        fullMark: Math.max(10, monitoringItems.length)
      };
    });
  }, [monitoringItems]);

  return (
    <div className="grid gap-6">
      {/* Filtros e Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Controles do Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="timeRange" className="text-sm whitespace-nowrap">Período:</label>
            <select 
              id="timeRange"
              className="rounded-md border p-2"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Total de monitoramentos: <strong>{monitoringItems.length}</strong>
              </span>
            </div>
            
            {isAuthenticated && <Button onClick={handleExport}>Exportar Dados</Button>}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos Principais - Layout em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Estudos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="estudos" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoramentos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Frequência de Atualização - Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle>Frequência de Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="frequency" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Secundários - 2 em uma linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Responsável - Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Responsáveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={responsibleData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="responsible" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="monitoramentos" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cobertura por Tipo - Gráfico Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Cobertura por Tipo de Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Monitoramentos"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atualizações do Sistema - Gráfico de Área */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="atualizacoes" stroke="#ffc658" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ferramentas de Análise - apenas para administradores */}
      {isAuthenticated && <AnalysisTools items={monitoringItems} />}
    </div>
  );
};

export default Dashboard;

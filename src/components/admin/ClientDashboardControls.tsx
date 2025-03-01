
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { Download, ChevronDown, Users, UserPlus, Activity } from "lucide-react";

// Sample data - would be replaced with real data fetching
const clientTypeData = [
  { name: 'Pesquisador', value: 35 },
  { name: 'Instituição', value: 25 },
  { name: 'Político', value: 15 },
  { name: 'Jornalista', value: 25 },
];

const clientActivityData = [
  { name: 'Jan', logins: 24, releases: 4, servicos: 2 },
  { name: 'Fev', logins: 30, releases: 6, servicos: 3 },
  { name: 'Mar', logins: 25, releases: 5, servicos: 4 },
  { name: 'Abr', logins: 33, releases: 8, servicos: 6 },
  { name: 'Mai', logins: 40, releases: 12, servicos: 7 },
  { name: 'Jun', logins: 35, releases: 10, servicos: 5 },
];

const serviceUsageData = [
  { name: 'Monitoramento', quantidade: 42 },
  { name: 'Análise', quantidade: 28 },
  { name: 'Relatórios', quantidade: 16 },
  { name: 'Alertas', quantidade: 35 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface ClientDashboardControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
}

const ClientDashboardControls: React.FC<ClientDashboardControlsProps> = ({ 
  timeRange, 
  setTimeRange, 
  handleExport, 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Dados de Clientes</CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Período:</span>
              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport}
              className="flex items-center gap-1"
            >
              <Download size={16} />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
                <h3 className="text-2xl font-bold">100</h3>
                <p className="text-xs text-green-600">+15% desde o mês passado</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Novos Cadastros</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-green-600">+8% desde o mês passado</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Atividade</p>
                <h3 className="text-2xl font-bold">68%</h3>
                <p className="text-xs text-yellow-600">-3% desde o mês passado</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="distribution">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">Distribuição</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-2 text-center">Clientes por Tipo</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={clientTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {clientTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-2 text-center">Registros Mensais</h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Maior Atividade</p>
                      <h4 className="text-xl font-bold">Segundas</h4>
                      <p className="text-xs text-muted-foreground">Dia da semana</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Horário Pico</p>
                      <h4 className="text-xl font-bold">10-12h</h4>
                      <p className="text-xs text-muted-foreground">Manhã</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Tipo Mais Ativo</p>
                      <h4 className="text-xl font-bold">Pesquisador</h4>
                      <p className="text-xs text-muted-foreground">35% das atividades</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Região Dominante</p>
                      <h4 className="text-xl font-bold">Norte</h4>
                      <p className="text-xs text-muted-foreground">62% dos usuários</p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="w-full">
              <h3 className="text-lg font-medium mb-2 text-center">Atividade de Clientes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={clientActivityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="logins" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="releases" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="servicos" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="w-full">
              <h3 className="text-lg font-medium mb-2 text-center">Uso de Serviços</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={serviceUsageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#8884d8">
                    {serviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClientDashboardControls;

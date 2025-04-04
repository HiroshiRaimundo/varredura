
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Filter, Pause, Play, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface Monitoring {
  id: string;
  name: string;
  group: string;
  status: "active" | "inactive" | "analyzing";
  responsible: string;
  lastUpdate: string;
  uptime: number;
  responseTime: number;
  url: string;
}

interface Filter {
  search: string;
  group: string;
  status: string;
}

export const MonitoringOverview: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    group: "all",
    status: "all"
  });
  const [monitorings, setMonitorings] = useState<Monitoring[]>([
    {
      id: "1",
      name: "Portal Principal",
      group: "Portais",
      status: "active",
      responsible: "João Silva",
      lastUpdate: "2025-03-07 21:45",
      uptime: 99.9,
      responseTime: 250,
      url: "https://portal.exemplo.com"
    },
    {
      id: "2",
      name: "Blog Corporativo",
      group: "Blogs",
      status: "inactive",
      responsible: "Maria Santos",
      lastUpdate: "2025-03-07 21:30",
      uptime: 98.5,
      responseTime: 300,
      url: "https://blog.exemplo.com"
    },
  ]);

  const analysisData = [
    { name: 'Jan', sentiment: 75, relevance: 65, accuracy: 80 },
    { name: 'Fev', sentiment: 82, relevance: 70, accuracy: 85 },
    { name: 'Mar', sentiment: 78, relevance: 75, accuracy: 82 },
    { name: 'Abr', sentiment: 85, relevance: 80, accuracy: 88 },
    { name: 'Mai', sentiment: 90, relevance: 85, accuracy: 90 },
  ];

  const statusData = [
    { name: 'Ativos', value: monitorings.filter(m => m.status === 'active').length },
    { name: 'Inativos', value: monitorings.filter(m => m.status === 'inactive').length },
    { name: 'Em Análise', value: monitorings.filter(m => m.status === 'analyzing').length },
  ];

  const COLORS = ['#10b981', '#6366f1', '#f59e0b'];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(monitorings.length / itemsPerPage);

  const filteredMonitorings = monitorings.filter(monitoring => {
    const matchesSearch = monitoring.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         monitoring.responsible.toLowerCase().includes(filter.search.toLowerCase());
    const matchesGroup = filter.group === "all" || monitoring.group.toLowerCase() === filter.group;
    const matchesStatus = filter.status === "all" || monitoring.status === filter.status;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const paginatedMonitorings = filteredMonitorings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleRemoveMonitoring = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este monitoramento?")) {
      setTimeout(() => {
        setMonitorings(prev => prev.filter(m => m.id !== id));
        toast("Monitoramento Removido", {
          description: "O monitoramento foi removido com sucesso."
        });
      }, 500);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setTimeout(() => {
      setMonitorings(prev => prev.map(m => 
        m.id === id ? { ...m, status: newStatus } : m
      ));
      toast("Status Alterado", {
        description: `O monitoramento foi ${newStatus === "active" ? "ativado" : "desativado"}.`
      });
    }, 500);
  };

  const handleOpenSettings = (monitoring: Monitoring) => {
    toast("Configurações", {
      description: `Abrindo configurações de ${monitoring.name}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      case "analyzing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Administração
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendências de Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sentiment" stroke="#10b981" name="Sentimento" />
                  <Line type="monotone" dataKey="relevance" stroke="#6366f1" name="Relevância" />
                  <Line type="monotone" dataKey="accuracy" stroke="#f59e0b" name="Precisão" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Monitoramentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monitoramentos Ativos</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar monitoramento..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-64"
            />
            <Select
              value={filter.group}
              onValueChange={(value) => setFilter({ ...filter, group: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Grupos</SelectItem>
                <SelectItem value="portais">Portais</SelectItem>
                <SelectItem value="blogs">Blogs</SelectItem>
                <SelectItem value="apis">APIs</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filter.status}
              onValueChange={(value) => setFilter({ ...filter, status: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="analyzing">Em Análise</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Tempo de Resposta</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMonitorings.map((monitoring) => (
                <TableRow key={monitoring.id}>
                  <TableCell>{monitoring.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{monitoring.group}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(monitoring.status)}>
                      {monitoring.status === "active" ? "Ativo" : 
                       monitoring.status === "inactive" ? "Inativo" : "Em Análise"}
                    </Badge>
                  </TableCell>
                  <TableCell>{monitoring.responsible}</TableCell>
                  <TableCell>{monitoring.lastUpdate}</TableCell>
                  <TableCell>{monitoring.uptime}%</TableCell>
                  <TableCell>{monitoring.responseTime}ms</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(monitoring.id, monitoring.status)}
                      title={monitoring.status === "active" ? "Pausar" : "Ativar"}
                    >
                      {monitoring.status === "active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveMonitoring(monitoring.id)}
                      title="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenSettings(monitoring)}
                      title="Configurações"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      aria-disabled={page === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      aria-disabled={page === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

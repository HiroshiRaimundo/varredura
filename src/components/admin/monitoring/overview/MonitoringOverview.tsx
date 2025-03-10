import React, { useState } from "react";
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
import { Filter, Pause, Play, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useMonitoring } from "@/contexts/MonitoringContext";
import cn from 'clsx';

interface Monitoring {
  id: string;
  name: string;
  group?: string;
  status?: "active" | "inactive" | "analyzing";
  responsible: string;
  lastUpdate?: string;
  uptime?: number;
  responseTime?: number;
  url?: string;
  urls?: string[];
  metrics?: string[];
  analysisTypes?: string[];
  frequency?: string;
  description?: string;
}

interface Filter {
  search: string;
  group: string;
  status: string;
}

const frequencies = [
  { value: '1m', label: '1 minuto' },
  { value: '5m', label: '5 minutos' },
  { value: '10m', label: '10 minutos' },
  { value: '30m', label: '30 minutos' },
  { value: '1h', label: '1 hora' },
  { value: '2h', label: '2 horas' },
  { value: '4h', label: '4 horas' },
  { value: '8h', label: '8 horas' },
  { value: '12h', label: '12 horas' },
  { value: '1d', label: '1 dia' },
  { value: '2d', label: '2 dias' },
  { value: '3d', label: '3 dias' },
  { value: '4d', label: '4 dias' },
  { value: '5d', label: '5 dias' },
  { value: '6d', label: '6 dias' },
  { value: '7d', label: '7 dias' },
];

export const MonitoringOverview: React.FC = () => {
  const { monitorings } = useMonitoring();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    group: "all",
    status: "all"
  });

  // Dados mockados para os gráficos
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
    const matchesGroup = filter.group === "all" || monitoring.group?.toLowerCase() === filter.group;
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
        // Implementar lógica para remover o monitoramento do contexto global
        toast({
          title: "Monitoramento Removido",
          description: "O monitoramento foi removido com sucesso."
        });
      }, 500);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setTimeout(() => {
      // Implementar lógica para atualizar o status do monitoramento no contexto global
      toast({
        title: "Status Alterado",
        description: `O monitoramento foi ${newStatus === "active" ? "ativado" : "desativado"}.`
      });
    }, 500);
  };

  const handleOpenSettings = (monitoring: Monitoring) => {
    toast({
      title: "Configurações",
      description: `Abrindo configurações de ${monitoring.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome ou responsável..."
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={filter.status}
                onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                  <SelectItem value="analyzing">Em Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Monitoramentos */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoramentos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>URLs</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Métricas</TableHead>
                  <TableHead>Frequência</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMonitorings.map((monitoring) => (
                  <TableRow key={monitoring.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          monitoring.status === "active" && "bg-green-500",
                          monitoring.status === "inactive" && "bg-red-500",
                          monitoring.status === "analyzing" && "bg-yellow-500",
                          !monitoring.status && "bg-gray-500"
                        )} />
                        <span className="capitalize">
                          {monitoring.status || "Indefinido"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{monitoring.name}</TableCell>
                    <TableCell>
                      {monitoring.urls ? (
                        <div className="flex flex-col gap-1">
                          {monitoring.urls.map((url, index) => (
                            <span key={index} className="text-sm truncate max-w-[200px]">
                              {url}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Nenhuma URL</span>
                      )}
                    </TableCell>
                    <TableCell>{monitoring.responsible}</TableCell>
                    <TableCell>
                      {monitoring.metrics?.length ? (
                        <Badge variant="secondary">
                          {monitoring.metrics.length} métricas
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {monitoring.frequency ? (
                        <Badge variant="outline">
                          {frequencies.find(f => f.value === monitoring.frequency)?.label || monitoring.frequency}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleStatus(monitoring.id, monitoring.status || "")}
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
                          onClick={() => handleOpenSettings(monitoring)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMonitoring(monitoring.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                      className={cn(page === 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setPage(i + 1)}
                        isActive={page === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                      className={cn(page === totalPages && "pointer-events-none opacity-50")}
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


import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Pause, Play, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { useMonitoring, Monitoring } from "@/contexts/MonitoringContext";
import { CustomPagination } from "@/components/ui/custom-pagination";
import cn from 'clsx';

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
  const { monitorings, updateMonitoring, removeMonitoring } = useMonitoring();

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    group: "all",
    status: "all"
  });

  const itemsPerPage = 10;

  // Agrupar monitoramentos por tema
  const groupedMonitorings = useMemo(() => {
    const groups: { [key: string]: Monitoring[] } = {};
    monitorings.forEach(monitoring => {
      const theme = monitoring.theme || monitoring.description?.toLowerCase().split(' ').slice(0, 3).join(' ') || 'outros';
      if (!groups[theme]) {
        groups[theme] = [];
      }
      groups[theme].push(monitoring);
    });
    return groups;
  }, [monitorings]);

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalMonitorings = monitorings.length;
  const totalPages = Math.ceil(totalMonitorings / itemsPerPage);
  const paginatedMonitorings = monitorings.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    try {
      removeMonitoring(id);
      setDeleteConfirm(null);
      toast.success("Monitoramento removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover monitoramento");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus?: string) => {
    try {
      const monitoring = monitorings.find(m => m.id === id);
      if (monitoring) {
        const updatedMonitoring = {
          ...monitoring,
          status: currentStatus === "active" ? "inactive" : "active"
        };
        updateMonitoring(updatedMonitoring);
        toast.success(`Monitoramento ${currentStatus === "active" ? "pausado" : "retomado"} com sucesso!`);
      }
    } catch (error) {
      toast.error("Erro ao alterar status do monitoramento");
    }
  };

  const filteredMonitorings = monitorings.filter(monitoring => {
    const matchesSearch = monitoring.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         monitoring.responsible.toLowerCase().includes(filter.search.toLowerCase());
    const matchesGroup = filter.group === "all" || monitoring.group?.toLowerCase() === filter.group;
    const matchesStatus = filter.status === "all" || monitoring.status === filter.status;
    return matchesSearch && matchesGroup && matchesStatus;
  });

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
                  <TableHead>Tema</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Métricas</TableHead>
                  <TableHead>Frequência</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMonitorings.map((monitoring) => (
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
                      <Badge variant="outline">
                        {monitoring.theme || monitoring.description?.toLowerCase().split(' ').slice(0, 3).join(' ') || 'outros'}
                      </Badge>
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
                          onClick={() => handleToggleStatus(monitoring.id, monitoring.status)}
                          className={cn(
                            monitoring.status === "active" ? "text-yellow-500 hover:text-yellow-700" : "text-green-500 hover:text-green-700"
                          )}
                        >
                          {monitoring.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        {deleteConfirm === monitoring.id ? (
                          <>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(monitoring.id)}
                            >
                              Confirmar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(monitoring.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
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
              <CustomPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

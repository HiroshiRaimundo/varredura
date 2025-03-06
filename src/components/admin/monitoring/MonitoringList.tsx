import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, Trash2, AlertCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Monitoring {
  id: string;
  name: string;
  url: string;
  frequency: string;
  lastCheck: string;
  status: 'active' | 'paused' | 'error';
  alerts: number;
  type: string;
}

const mockData: Monitoring[] = [
  {
    id: "1",
    name: "Portal da Transparência",
    url: "https://www.portaltransparencia.gov.br",
    frequency: "1h",
    lastCheck: "2025-03-06T14:30:00",
    status: "active",
    alerts: 3,
    type: "governo"
  },
  {
    id: "2",
    name: "Diário Oficial",
    url: "https://www.in.gov.br",
    frequency: "30min",
    lastCheck: "2025-03-06T14:45:00",
    status: "active",
    alerts: 0,
    type: "governo"
  }
];

export const MonitoringList: React.FC = () => {
  const [monitorings, setMonitorings] = useState<Monitoring[]>(mockData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMonitorings = monitorings.filter(monitoring => {
    const matchesSearch = monitoring.name.toLowerCase().includes(search.toLowerCase()) ||
                         monitoring.url.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || monitoring.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: string) => {
    setMonitorings(prev => prev.map(monitoring => {
      if (monitoring.id === id) {
        return {
          ...monitoring,
          status: monitoring.status === 'active' ? 'paused' : 'active'
        };
      }
      return monitoring;
    }));
  };

  const deleteMonitoring = (id: string) => {
    setMonitorings(prev => prev.filter(monitoring => monitoring.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar monitoramento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="paused">Pausados</SelectItem>
            <SelectItem value="error">Com Erro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Frequência</TableHead>
            <TableHead>Última Verificação</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Alertas</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMonitorings.map((monitoring) => (
            <TableRow key={monitoring.id}>
              <TableCell className="font-medium">{monitoring.name}</TableCell>
              <TableCell className="text-muted-foreground">{monitoring.url}</TableCell>
              <TableCell>{monitoring.frequency}</TableCell>
              <TableCell>{new Date(monitoring.lastCheck).toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={
                  monitoring.status === 'active' ? 'default' :
                  monitoring.status === 'paused' ? 'secondary' : 'destructive'
                }>
                  {monitoring.status === 'active' ? 'Ativo' :
                   monitoring.status === 'paused' ? 'Pausado' : 'Erro'}
                </Badge>
              </TableCell>
              <TableCell>
                {monitoring.alerts > 0 ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {monitoring.alerts}
                  </Badge>
                ) : (
                  <Badge variant="secondary">0</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleStatus(monitoring.id)}
                  >
                    {monitoring.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMonitoring(monitoring.id)}
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
  );
};

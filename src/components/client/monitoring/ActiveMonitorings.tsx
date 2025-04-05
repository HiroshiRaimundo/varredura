
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Eye, Settings, AlertCircle } from "lucide-react";

interface Monitoring {
  id: string;
  name: string;
  terms: string[];
  sources: string[];
  frequency: "daily" | "weekly" | "realtime";
  active: boolean;
  resultsCount: number;
  lastCheck: string;
}

const mockMonitorings: Monitoring[] = [
  {
    id: "1",
    name: "Sustentabilidade",
    terms: ["sustentabilidade", "ESG", "ambiental"],
    sources: ["news", "blogs"],
    frequency: "daily",
    active: true,
    resultsCount: 45,
    lastCheck: "2025-04-05T08:30:00"
  },
  {
    id: "2",
    name: "Inovação",
    terms: ["inovação", "tecnologia", "transformação digital"],
    sources: ["news", "social"],
    frequency: "realtime",
    active: true,
    resultsCount: 32,
    lastCheck: "2025-04-05T09:15:00"
  },
  {
    id: "3",
    name: "Mercado",
    terms: ["mercado", "economia", "investimentos"],
    sources: ["news", "blogs", "social"],
    frequency: "weekly",
    active: false,
    resultsCount: 18,
    lastCheck: "2025-04-01T14:20:00"
  }
];

const ActiveMonitorings: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Diário";
      case "weekly":
        return "Semanal";
      case "realtime":
        return "Tempo real";
      default:
        return frequency;
    }
  };

  const handleToggleActive = (id: string, newState: boolean) => {
    // Aqui seria feita a chamada para API para atualizar o status
    console.log(`Alterando status do monitoramento ${id} para ${newState ? 'ativo' : 'inativo'}`);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Termos</TableHead>
            <TableHead>Fontes</TableHead>
            <TableHead>Frequência</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead>Última verificação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMonitorings.map((monitoring) => (
            <TableRow key={monitoring.id}>
              <TableCell className="font-medium">{monitoring.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {monitoring.terms.map((term, index) => (
                    <Badge key={index} variant="outline">
                      {term}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {monitoring.sources.map((source, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {source}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{getFrequencyLabel(monitoring.frequency)}</TableCell>
              <TableCell>
                <Switch
                  checked={monitoring.active}
                  onCheckedChange={(checked) => handleToggleActive(monitoring.id, checked)}
                />
              </TableCell>
              <TableCell>{formatDate(monitoring.lastCheck)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/results/${monitoring.id}`}>
                      <AlertCircle className="h-4 w-4" />
                      <span className="sr-only">Ver alertas</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/results/${monitoring.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver resultados</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Configurações</span>
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

export default ActiveMonitorings;

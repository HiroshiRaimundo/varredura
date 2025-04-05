
import React from "react";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: "1",
    title: "Menção na mídia: G1",
    message: "Sua empresa foi mencionada em uma reportagem.",
    date: "2025-04-05T10:30:00",
    type: "media"
  },
  {
    id: "2",
    title: "Release aprovado",
    message: "Seu release 'Nova parceria' foi aprovado e enviado à imprensa.",
    date: "2025-04-04T15:45:00",
    type: "release"
  },
  {
    id: "3",
    title: "Novo termo encontrado",
    message: "O termo 'sustentabilidade' foi encontrado em 3 novos artigos.",
    date: "2025-04-04T09:15:00",
    type: "monitoring"
  },
  {
    id: "4",
    title: "Pico de menções",
    message: "Detectamos um aumento nas menções da sua marca nas redes sociais.",
    date: "2025-04-03T16:20:00",
    type: "media"
  },
  {
    id: "5",
    title: "Relatório mensal disponível",
    message: "O relatório de abril está disponível para download.",
    date: "2025-04-03T08:00:00",
    type: "report"
  }
];

const RecentAlerts: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 pb-3 border-b">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{alert.title}</h4>
            <p className="text-xs text-muted-foreground">{alert.message}</p>
            <span className="text-xs text-gray-400">{formatDate(alert.date)}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" className="w-full">Ver todos os alertas</Button>
    </div>
  );
};

export default RecentAlerts;

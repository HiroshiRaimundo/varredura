
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Eye, ExternalLink, Check } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  type: "media" | "release" | "monitoring";
  url?: string;
  isRead: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Menção em artigo: G1",
    description: "Sua empresa foi mencionada em um artigo sobre sustentabilidade.",
    source: "G1",
    date: "2025-04-05T10:30:00",
    type: "media",
    url: "https://g1.globo.com",
    isRead: false
  },
  {
    id: "2",
    title: "Release aprovado",
    description: "Seu release 'Nova parceria estratégica' foi aprovado.",
    source: "Sistema",
    date: "2025-04-04T15:45:00",
    type: "release",
    isRead: true
  },
  {
    id: "3",
    title: "Pico de menções: Sustentabilidade",
    description: "Detectamos um aumento nas menções do termo 'sustentabilidade'.",
    source: "Monitoramento",
    date: "2025-04-03T09:15:00",
    type: "monitoring",
    isRead: false
  },
  {
    id: "4",
    title: "Menção em vídeo: YouTube",
    description: "Sua empresa foi mencionada em um vídeo sobre tecnologia.",
    source: "YouTube",
    date: "2025-04-02T14:20:00",
    type: "media",
    url: "https://youtube.com",
    isRead: false
  },
  {
    id: "5",
    title: "Release rejeitado",
    description: "Seu release 'Evento corporativo' foi rejeitado. Veja os comentários.",
    source: "Sistema",
    date: "2025-04-01T11:10:00",
    type: "release",
    isRead: true
  }
];

const AlertsTab: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => !alert.isRead);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "media":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mídia</Badge>;
      case "release":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Release</Badge>;
      case "monitoring":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Monitoramento</Badge>;
      default:
        return <Badge>Outro</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>
              Notificações sobre menções na mídia, releases e monitoramentos
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
            >
              Todos
            </Button>
            <Button 
              variant={filter === "unread" ? "default" : "outline"} 
              onClick={() => setFilter("unread")}
            >
              Não lidos ({alerts.filter(alert => !alert.isRead).length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum alerta encontrado</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className={!alert.isRead ? "bg-muted/20" : ""}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {alert.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(alert.type)}</TableCell>
                  <TableCell>{alert.source}</TableCell>
                  <TableCell>{formatDate(alert.date)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!alert.isRead && (
                        <Button variant="ghost" size="icon" onClick={() => markAsRead(alert.id)}>
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Marcar como lido</span>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                      {alert.url && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={alert.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Abrir link</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsTab;

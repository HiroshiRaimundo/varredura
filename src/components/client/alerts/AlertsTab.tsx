
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Eye, Check, X, BarChart, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  type: "media" | "release" | "monitoring" | "system";
  read: boolean;
  url?: string;
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    title: "Menção na mídia: Sustentabilidade",
    description: "Nova menção encontrada nos termos monitorados sobre sustentabilidade",
    date: "2025-04-05T10:30:00",
    source: "Folha de São Paulo",
    type: "media",
    read: false,
    url: "https://exemplo.com/noticia1"
  },
  {
    id: "2",
    title: "Release aprovado",
    description: "Seu release 'Nova política de sustentabilidade' foi aprovado e enviado para a imprensa",
    date: "2025-04-04T15:45:00",
    source: "Sistema",
    type: "release",
    read: true
  },
  {
    id: "3",
    title: "Limite de menções atingido",
    description: "O termo 'investimento verde' atingiu o limite de 10 menções nas últimas 24 horas",
    date: "2025-04-03T08:15:00",
    source: "Monitoramento",
    type: "monitoring",
    read: false
  },
  {
    id: "4",
    title: "Manutenção programada",
    description: "O sistema estará em manutenção no dia 10/04/2025 das 23h às 5h",
    date: "2025-04-02T12:00:00",
    source: "Sistema",
    type: "system",
    read: false
  }
];

const AlertsTab: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = (type: Alert["type"]) => {
    switch (type) {
      case "media": return "Mídia";
      case "release": return "Release";
      case "monitoring": return "Monitoramento";
      case "system": return "Sistema";
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: Alert["type"]) => {
    switch (type) {
      case "media": return "bg-blue-100 text-blue-800";
      case "release": return "bg-green-100 text-green-800";
      case "monitoring": return "bg-yellow-100 text-yellow-800";
      case "system": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    
    toast({
      title: "Alerta marcado como lido",
      description: "O alerta foi marcado como lido com sucesso."
    });
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    
    toast({
      title: "Todos alertas marcados como lidos",
      description: "Todos os alertas foram marcados como lidos com sucesso."
    });
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    
    toast({
      title: "Alerta removido",
      description: "O alerta foi removido com sucesso."
    });
  };

  const viewAlertDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowAlertDetails(true);
    
    // Marcar como lido automaticamente ao visualizar
    if (!alert.read) {
      markAsRead(alert.id);
    }
  };

  const generateReport = (alert: Alert) => {
    toast({
      title: "Gerando relatório",
      description: `Gerando relatório baseado no alerta "${alert.title}".`
    });
    
    // Aqui seria implementada a lógica real de geração de relatório
    setTimeout(() => {
      toast({
        title: "Relatório gerado",
        description: "O relatório foi gerado e está disponível na seção de Relatórios."
      });
    }, 2000);
  };

  const visitSource = (url?: string) => {
    if (url) {
      // Aqui abriríamos o URL em uma nova aba
      window.open(url, '_blank');
      
      toast({
        title: "Abrindo fonte",
        description: "Abrindo a fonte do alerta em uma nova aba."
      });
    } else {
      toast({
        title: "URL não disponível",
        description: "Este alerta não possui uma URL de fonte associada.",
        variant: "destructive"
      });
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    if (filter === "read") return alert.read;
    return true;
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              Alertas
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} não lido{unreadCount > 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Acompanhe os alertas do sistema sobre seus monitoramentos e releases
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Marcar todos como lidos
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={filter === "unread" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Não lidos
          </Button>
          <Button 
            variant={filter === "read" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("read")}
          >
            Lidos
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fonte</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <Bell className="mx-auto h-8 w-8 mb-2 opacity-30" />
                  <p>Nenhum alerta encontrado</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className={!alert.read ? "bg-muted/20" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {!alert.read && <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />}
                      {alert.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(alert.type)}>
                      {getTypeLabel(alert.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.source}</TableCell>
                  <TableCell>{formatDate(alert.date)}</TableCell>
                  <TableCell>
                    <Badge variant={alert.read ? "outline" : "default"}>
                      {alert.read ? "Lido" : "Não lido"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Visualizar detalhes"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!alert.read && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Marcar como lido" 
                          onClick={() => markAsRead(alert.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        title="Remover alerta" 
                        onClick={() => dismissAlert(alert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {alert.type === "media" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Gerar relatório"
                            onClick={() => generateReport(alert)}
                          >
                            <BarChart className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Visitar fonte"
                            onClick={() => visitSource(alert.url)}
                            disabled={!alert.url}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {selectedAlert && (
          <Dialog open={showAlertDetails} onOpenChange={setShowAlertDetails}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedAlert.title}</DialogTitle>
                <DialogDescription>
                  {formatDate(selectedAlert.date)} - {selectedAlert.source}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-4">{selectedAlert.description}</p>
                
                <div className="flex gap-2 mt-6">
                  {selectedAlert.url && (
                    <Button onClick={() => visitSource(selectedAlert.url)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visitar fonte
                    </Button>
                  )}
                  {selectedAlert.type === "media" && (
                    <Button variant="outline" onClick={() => generateReport(selectedAlert)}>
                      <BarChart className="mr-2 h-4 w-4" />
                      Gerar relatório
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsTab;

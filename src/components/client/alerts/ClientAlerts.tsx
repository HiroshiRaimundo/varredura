
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LegislationAlert } from "@/hooks/monitoring/types";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, CheckCircle, ExternalLink, Archive, Star, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ClientType } from "@/types/clientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ClientAlertsProps {
  clientType: ClientType;
  alerts?: LegislationAlert[];
}

const ClientAlerts: React.FC<ClientAlertsProps> = ({ clientType, alerts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [alertsData, setAlertsData] = useState(alerts);
  const colorClasses = getColorClasses(clientType);
  
  // Filtrar alertas com base no termo de pesquisa
  const filteredAlerts = alertsData.filter(alert => 
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.source.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Marcar alerta como lido
  const markAsRead = (id: string) => {
    setAlertsData(alertsData.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
    toast({
      title: "Alerta marcado como lido",
      description: "O alerta foi marcado como lido com sucesso."
    });
  };
  
  // Marcar alerta como importante
  const markAsImportant = (id: string) => {
    setAlertsData(alertsData.map(alert => 
      alert.id === id ? { ...alert, isImportant: !alert.isImportant } : alert
    ));
    
    const isNowImportant = alertsData.find(a => a.id === id)?.isImportant;
    
    toast({
      title: isNowImportant ? "Alerta desmarcado" : "Alerta marcado como importante",
      description: isNowImportant 
        ? "O alerta não está mais marcado como importante."
        : "O alerta foi marcado como importante e será destacado."
    });
  };
  
  // Arquivar alerta
  const archiveAlert = (id: string) => {
    setAlertsData(alertsData.filter(alert => alert.id !== id));
    toast({
      title: "Alerta arquivado",
      description: "O alerta foi arquivado com sucesso."
    });
  };
  
  // Abrir link do alerta
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Alertas</CardTitle>
            <CardDescription>
              Acompanhe os principais alertas e notificações
            </CardDescription>
          </div>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            {filteredAlerts.filter(alert => !alert.isRead).length} novos
          </Badge>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar alertas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Nenhum alerta encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border rounded-md transition-all ${
                  !alert.isRead ? "bg-amber-50 border-amber-200" : "bg-card border-border"
                } ${alert.isImportant ? "border-l-4 border-l-yellow-500" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">
                    {!alert.isRead && (
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    )}
                    {alert.title}
                  </h3>
                  <Badge className={`${colorClasses.bg} hover:${colorClasses.bgHover}`}>
                    {alert.source}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{alert.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {new Date(alert.date).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex space-x-2">
                    {!alert.isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center"
                        onClick={() => markAsRead(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Marcar como lido
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => markAsImportant(alert.id)}
                    >
                      <Star className={`h-4 w-4 mr-1 ${alert.isImportant ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      {alert.isImportant ? "Remover destaque" : "Destacar"}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => archiveAlert(alert.id)}
                    >
                      <Archive className="h-4 w-4 mr-1" />
                      Arquivar
                    </Button>
                    
                    {alert.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center"
                        onClick={() => openLink(alert.url as string)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Abrir
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientAlerts;

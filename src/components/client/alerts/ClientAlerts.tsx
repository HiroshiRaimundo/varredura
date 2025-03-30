import React from "react";
import { LegislationAlert } from "@/hooks/monitoring/types";
import { ClientType } from "@/components/client/ClientTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getColorClasses } from "@/components/service/utils/colorUtils";

export interface ClientAlertsProps {
  alerts: LegislationAlert[];
  clientType: ClientType;
}

const ClientAlerts: React.FC<ClientAlertsProps> = ({ alerts, clientType }) => {
  const colorClasses = getColorClasses(clientType);
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className={`h-5 w-5 ${colorClasses.text}`} />
          <h2 className="text-xl font-bold">Alertas de Legislação</h2>
          {unreadAlerts.length > 0 && (
            <Badge className={`${colorClasses.bg} text-white`}>
              {unreadAlerts.length} novo{unreadAlerts.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          Marcar todos como lidos
        </Button>
      </div>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Nenhum alerta de legislação no momento.
              <br />
              Você receberá notificações quando houver atualizações relevantes.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className={alert.isRead ? "" : "border-l-4 " + colorClasses.border}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-medium">
                    {alert.title}
                  </CardTitle>
                  {!alert.isRead && (
                    <Badge variant="outline" className={colorClasses.text}>
                      Novo
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Fonte: {alert.source}</span>
                    <span>•</span>
                    <span>{formatDate(alert.date)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Marcar como lido
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-xs"
                      onClick={() => window.open(alert.url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ver documento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientAlerts;

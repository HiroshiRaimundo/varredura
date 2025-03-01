
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LegislationAlert } from "@/hooks/monitoring/types";

interface LegislationAlertsProps {
  alerts: LegislationAlert[];
  onMarkAsRead: (id: string) => void;
  showAlerts: boolean;
}

const LegislationAlerts: React.FC<LegislationAlertsProps> = ({ 
  alerts, 
  onMarkAsRead,
  showAlerts
}) => {
  if (!showAlerts) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Alertas de Monitoramento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-3 border rounded-md ${alert.isRead ? 'bg-gray-50' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex justify-between">
                <h3 className="font-medium">{alert.title}</h3>
                {!alert.isRead && (
                  <Badge variant="outline" className="bg-amber-100">
                    Novo
                  </Badge>
                )}
              </div>
              <p className="text-sm mt-1">{alert.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">Publicado em: {alert.date}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onMarkAsRead(alert.id)}
                >
                  {alert.isRead ? 'Arquivar' : 'Marcar como lido'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LegislationAlerts;

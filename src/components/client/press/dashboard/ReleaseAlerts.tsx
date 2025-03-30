
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export interface ReleaseAlertsProps {
  alerts: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
  }>;
}

const ReleaseAlerts: React.FC<ReleaseAlertsProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Alertas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => (
          <Alert 
            key={alert.id} 
            className={
              alert.type === 'warning' 
                ? 'bg-yellow-50 border-yellow-300' 
                : alert.type === 'success'
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-50 border-gray-300'
            }
          >
            {alert.type === 'warning' ? (
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <p>Nenhum alerta no momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseAlerts;

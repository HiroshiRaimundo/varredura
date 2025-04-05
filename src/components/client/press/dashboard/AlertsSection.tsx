
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface AlertData {
  id: string;
  title: string;
  message: string;
  type: string;
}

interface AlertsSectionProps {
  alerts: AlertData[];
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Alertas
          </CardTitle>
          <Badge variant="outline">{alerts.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-md ${
                alert.type === "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-green-50 border-green-200"
              } border`}
            >
              <h4
                className={`font-medium ${
                  alert.type === "warning" ? "text-yellow-800" : "text-green-800"
                }`}
              >
                {alert.title}
              </h4>
              <p
                className={`text-sm ${
                  alert.type === "warning" ? "text-yellow-700" : "text-green-700"
                }`}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsSection;

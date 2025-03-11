import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMonitoring } from "@/contexts/MonitoringContext";

export const MonitoringReports: React.FC = () => {
  const { monitorings } = useMonitoring();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Monitoramentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monitorings.map((monitoring) => (
              <div key={monitoring.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{monitoring.name}</h3>
                <p className="text-sm text-muted-foreground">{monitoring.description}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Status: </span>
                  <span className={`text-sm ${monitoring.active ? "text-green-600" : "text-red-600"}`}>
                    {monitoring.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

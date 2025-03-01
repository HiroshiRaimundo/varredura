
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, LineChart, Activity } from "lucide-react";

const ClientLegend: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legendas e Instruções</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Gráficos de Barras</p>
              <p className="text-sm text-muted-foreground">Mostram a distribuição de valores por categorias.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <PieChart className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Gráficos de Pizza</p>
              <p className="text-sm text-muted-foreground">Mostram a proporção de cada categoria no total.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <LineChart className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <p className="font-medium">Gráficos de Linha</p>
              <p className="text-sm text-muted-foreground">Mostram tendências ao longo do tempo.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Activity className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">Gráficos de Área</p>
              <p className="text-sm text-muted-foreground">Mostram volume de dados ao longo do tempo.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientLegend;

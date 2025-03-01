
import React from 'react';
import { FileText, ExternalLink, AlertCircle, Clock } from "lucide-react";
import DashboardCard from '../DashboardCard';

const StatisticsCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total de Releases"
        value="21"
        description="Total de releases enviados"
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Publicados"
        value="12"
        description="Releases veiculados na mídia"
        icon={<ExternalLink className="h-4 w-4 text-green-500" />}
        trend={{ value: 20, isPositive: true }}
      />
      <DashboardCard
        title="Taxa de Aprovação"
        value="85%"
        description="Releases aprovados para envio"
        icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
        trend={{ value: 5, isPositive: true }}
      />
      <DashboardCard
        title="Tempo Médio"
        value="1.5 dias"
        description="Da aprovação à publicação"
        icon={<Clock className="h-4 w-4 text-orange-500" />}
        trend={{ value: 10, isPositive: false }}
      />
    </div>
  );
};

export default StatisticsCards;

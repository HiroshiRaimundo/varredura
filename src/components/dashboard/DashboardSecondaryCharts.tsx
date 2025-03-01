
import React from "react";
import ResearchersChart from "./ResearchersChart";
import SourceTypeChart from "./SourceTypeChart";

interface DashboardSecondaryChartsProps {
  responsibleData: Array<{
    responsible: string;
    monitoramentos: number;
  }>;
  radarData: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}

export const DashboardSecondaryCharts: React.FC<DashboardSecondaryChartsProps> = ({
  responsibleData,
  radarData
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Distribuição por Responsável - Gráfico de Barras */}
      <ResearchersChart data={responsibleData} />

      {/* Cobertura por Tipo - Gráfico Radar */}
      <SourceTypeChart data={radarData} />
    </div>
  );
};

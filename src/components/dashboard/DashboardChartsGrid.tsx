
import React from "react";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";

interface DashboardChartsGridProps {
  trendData: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
  }>;
  frequencyData: Array<{
    frequency: string;
    quantidade: number;
  }>;
}

export const DashboardChartsGrid: React.FC<DashboardChartsGridProps> = ({
  trendData,
  categoryData,
  frequencyData
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Evolução de Estudos - Gráfico de Linha */}
      <StudiesChart data={trendData} />

      {/* Distribuição por Categoria - Gráfico de Pizza */}
      <CategoryChart data={categoryData} />

      {/* Frequência de Atualização - Gráfico de Barras */}
      <FrequencyChart data={frequencyData} />
    </div>
  );
};

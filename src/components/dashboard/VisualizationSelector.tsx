import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, LineChart, PieChart, Map, 
  Network, HeatMap, Scatter, Download 
} from 'lucide-react';

interface VisualizationSelectorProps {
  onVisualizationChange: (type: string) => void;
  onExport: () => void;
  currentType: string;
}

const visualizationTypes = [
  { id: 'bar', label: 'Gráfico de Barras', icon: <BarChart className="h-4 w-4" /> },
  { id: 'line', label: 'Gráfico de Linha', icon: <LineChart className="h-4 w-4" /> },
  { id: 'pie', label: 'Gráfico de Pizza', icon: <PieChart className="h-4 w-4" /> },
  { id: 'map', label: 'Mapa Geográfico', icon: <Map className="h-4 w-4" /> },
  { id: 'network', label: 'Gráfico de Rede', icon: <Network className="h-4 w-4" /> },
  { id: 'heatmap', label: 'Mapa de Calor', icon: <HeatMap className="h-4 w-4" /> },
  { id: 'scatter', label: 'Gráfico de Dispersão', icon: <Scatter className="h-4 w-4" /> },
];

const VisualizationSelector: React.FC<VisualizationSelectorProps> = ({
  onVisualizationChange,
  onExport,
  currentType
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tipo de Visualização</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={currentType} onValueChange={onVisualizationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de visualização" />
            </SelectTrigger>
            <SelectContent>
              {visualizationTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    {type.icon}
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            {visualizationTypes.map((type) => (
              <Button
                key={type.id}
                variant={currentType === type.id ? "default" : "outline"}
                className="flex items-center gap-2 justify-start"
                onClick={() => onVisualizationChange(type.id)}
              >
                {type.icon}
                <span className="text-sm">{type.label}</span>
              </Button>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={onExport}
          >
            <Download className="h-4 w-4" />
            Exportar Visualização
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationSelector; 
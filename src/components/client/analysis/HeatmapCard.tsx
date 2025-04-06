
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { ResponsiveContainer, Tooltip, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Cell } from 'recharts';

interface HeatmapCardProps {
  title?: string;
  description?: string;
  data?: Array<{ hour: number, day: number, value: number }>;
  loading?: boolean;
}

// Dados de exemplo caso não sejam fornecidos
const generateMockData = () => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const data = [];
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Simular padrões realistas
      let value = Math.floor(Math.random() * 60);
      
      // Mais menções durante o horário comercial em dias úteis
      if (day >= 1 && day <= 5 && hour >= 8 && hour <= 18) {
        value += Math.floor(Math.random() * 40);
      }
      
      // Picos em horários específicos
      if ((hour === 8 || hour === 12 || hour === 18) && day >= 1 && day <= 5) {
        value += Math.floor(Math.random() * 30);
      }
      
      data.push({
        hour,
        day,
        value,
        dayName: days[day]
      });
    }
  }
  
  return data;
};

const getColorByValue = (value: number) => {
  // Escala de cores de azul claro a azul escuro
  if (value < 20) return '#e3f2fd';
  if (value < 40) return '#90caf9';
  if (value < 60) return '#42a5f5';
  if (value < 80) return '#1976d2';
  return '#0d47a1';
};

const HeatmapCard: React.FC<HeatmapCardProps> = ({
  title = "Mapa de Calor de Menções",
  description = "Visualize horários com maior quantidade de menções",
  data,
  loading = false
}) => {
  const heatmapData = data || generateMockData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                type="number" 
                dataKey="hour" 
                name="Hora" 
                domain={[0, 23]}
                tickCount={24}
                tickFormatter={(hour) => `${hour}h`}
              />
              <YAxis 
                type="number" 
                dataKey="day" 
                name="Dia" 
                tickCount={7}
                domain={[0, 6]} 
                tickFormatter={(day) => {
                  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
                  return days[day];
                }}
              />
              <ZAxis 
                type="number" 
                dataKey="value" 
                range={[30, 800]} 
                name="Menções" 
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "Menções") return [value, name];
                  if (name === "Hora") return [`${value}:00`, name];
                  if (name === "Dia") {
                    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
                    return [days[value as number], name];
                  }
                  return [value, name];
                }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter data={heatmapData} shape="square">
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByValue(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default HeatmapCard;


import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

interface PredictiveAnalysisCardProps {
  title?: string;
  description?: string;
  historicalData?: Array<{ date: string, value: number }>;
  predictedData?: Array<{ date: string, value: number, isEstimate?: boolean }>;
  loading?: boolean;
}

// Função para gerar dados de exemplo
const generateMockData = () => {
  const today = new Date();
  const historicalData = [];
  const predictedData = [];
  
  // Dados históricos (30 dias para trás)
  for (let i = 30; i >= 1; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Tendência de crescimento com algumas flutuações aleatórias
    const value = 50 + i * 2 + Math.random() * 20 - 10;
    
    historicalData.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value)
    });
  }
  
  // Dados previstos (7 dias para frente)
  const lastValue = historicalData[historicalData.length - 1].value;
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    // Continuando a tendência com mais variação
    const trend = lastValue + i * 3;
    const randomFactor = Math.random() * 15 - 7.5;
    const value = trend + randomFactor;
    
    predictedData.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
      isEstimate: true
    });
  }
  
  return { historicalData, predictedData };
};

const PredictiveAnalysisCard: React.FC<PredictiveAnalysisCardProps> = ({
  title = "Análise Preditiva de Menções",
  description = "Projeção de menções para os próximos 7 dias",
  historicalData,
  predictedData,
  loading = false
}) => {
  // Usar dados fornecidos ou gerar dados de exemplo
  const mockData = useMemo(() => generateMockData(), []);
  const historical = historicalData || mockData.historicalData;
  const predicted = predictedData || mockData.predictedData;
  
  // Combinar dados históricos e previstos
  const combinedData = [...historical, ...predicted];
  
  // Encontrar o valor máximo para definir o domínio do eixo Y
  const maxValue = Math.max(...combinedData.map(item => item.value)) * 1.1;
  
  // Encontrar o valor mínimo para definir o domínio do eixo Y
  const minValue = Math.min(...combinedData.map(item => item.value)) * 0.9;
  
  // Encontrar o índice onde começa a previsão
  const todayIndex = historical.length - 1;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Histórico</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Previsão</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
                tick={{ fontSize: 12 }}
                minTickGap={15}
              />
              <YAxis 
                domain={[minValue, maxValue]} 
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                labelFormatter={(label) => {
                  const d = new Date(label);
                  return `Data: ${d.toLocaleDateString('pt-BR')}`;
                }}
                formatter={(value, name) => {
                  return [value, name === "value" ? "Menções" : name];
                }}
              />
              <Legend />
              
              {/* Linha do valor histórico */}
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Menções" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                connectNulls 
              />
              
              {/* Linha de previsão (dado futuro) */}
              <Line 
                type="monotone" 
                dataKey="value" 
                data={predicted} 
                name="Previsão" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, stroke: '#10b981', fill: '#10b981' }}
              />
              
              {/* Linha de referência para hoje */}
              <ReferenceLine 
                x={historical[todayIndex]?.date} 
                stroke="#f43f5e" 
                strokeDasharray="3 3"
                label={{ 
                  value: 'Hoje', 
                  position: 'insideTopLeft',
                  fill: '#f43f5e',
                  fontSize: 12
                }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalysisCard;

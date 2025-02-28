
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ResearchersChartProps {
  data: Array<{
    responsible: string;
    monitoramentos: number;
  }>;
}

const ResearchersChart: React.FC<ResearchersChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Pesquisadores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="responsible" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="monitoramentos" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchersChart;

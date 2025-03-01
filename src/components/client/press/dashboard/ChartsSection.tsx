
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, PieChart } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart as RePieChart } from 'recharts';

const chartData = [
  { name: 'Jan', value: 2 },
  { name: 'Fev', value: 3 },
  { name: 'Mar', value: 5 },
  { name: 'Abr', value: 4 },
  { name: 'Mai', value: 7 },
  { name: 'Jun', value: 6 },
];

const pieData = [
  { name: 'Publicados', value: 12, color: '#10B981' },
  { name: 'Aprovados', value: 5, color: '#3B82F6' },
  { name: 'Pendentes', value: 3, color: '#F59E0B' },
  { name: 'Rejeitados', value: 1, color: '#EF4444' },
];

const ChartsSection: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Publicações por Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Status dos Releases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;

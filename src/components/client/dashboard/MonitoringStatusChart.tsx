
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    term: "Sustentabilidade",
    mentions: 45,
  },
  {
    term: "Inovação",
    mentions: 32,
  },
  {
    term: "ESG",
    mentions: 28,
  },
  {
    term: "Tecnologia",
    mentions: 24,
  },
  {
    term: "Mercado",
    mentions: 18,
  },
];

const MonitoringStatusChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="term" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="mentions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonitoringStatusChart;

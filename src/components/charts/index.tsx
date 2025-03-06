import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ChartProps {
  data: any[];
  height?: number;
}

interface LineChartProps extends ChartProps {
  xField: string;
  yFields: string[];
}

interface BarChartProps extends ChartProps {
  xField: string;
  yField: string;
}

interface PieChartProps extends ChartProps {
  nameField: string;
  valueField: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xField,
  yFields,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xField} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yFields.map((field, index) => (
          <Line
            key={field}
            type="monotone"
            dataKey={field}
            stroke={COLORS[index % COLORS.length]}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xField,
  yField,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xField} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yField} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  nameField,
  valueField,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey={nameField}
          dataKey={valueField}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

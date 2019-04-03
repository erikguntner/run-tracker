import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const data = [
  {
    name: 'S',
    uv: 3000,
  },
  {
    name: 'M',
    uv: 3000,
  },
  {
    name: 'T',
    uv: 2000,
  },
  {
    name: 'W',
    uv: 2780,
  },
  {
    name: 'T',
    uv: 1890,
  },
  {
    name: 'F',
    uv: 2390,
  },
  {
    name: 'S',
    uv: 3490,
  },
];

const DistanceChart = props => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DistanceChart;

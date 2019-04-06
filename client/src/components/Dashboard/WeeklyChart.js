import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

const data = [
  {
    day: 'S',
    temperature: 5,
  },
  {
    day: 'M',
    temperature: 10,
  },
  {
    day: 'T',
    temperature: 15,
  },
  {
    day: 'W',
    temperature: 12,
  },
  {
    day: 'T',
    temperature: 12,
  },
  {
    day: 'F',
    temperature: 16,
  },
  {
    day: 'S',
    temperature: 3,
  },
];

const DistanceChart = props => {
  return (
    <AreaChart
      width={300}
      height={125}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <XAxis dataKey="day" />
      <YAxis />
      <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
      <Tooltip />
    </AreaChart>
  );
};

export default DistanceChart;

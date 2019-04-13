import React from 'react';
import { XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

const data = [
  {
    day: 'S',
    distance: 0,
  },
  {
    day: 'M',
    distance: 0,
  },
  {
    day: 'T',
    distance: 0,
  },
  {
    day: 'W',
    distance: 0,
  },
  {
    day: 'T',
    distance: 0,
  },
  {
    day: 'F',
    distance: 0,
  },
  {
    day: 'S',
    distance: 0,
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
      <Area dataKey="distance" stroke="#8884d8" fill="#8884d8" />
      <Tooltip />
    </AreaChart>
  );
};

export default DistanceChart;

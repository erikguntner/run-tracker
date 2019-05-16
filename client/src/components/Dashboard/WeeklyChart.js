import React from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

import { parseDates } from '../../utils/parseDates';

const DistanceChart = ({ thisWeeksRuns }) => {
  const newData = parseDates(thisWeeksRuns);

  return (
    <AreaChart
      width={300}
      height={125}
      data={newData}
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

DistanceChart.propTypes = {
  thisWeeksRuns: PropTypes.array,
};

export default DistanceChart;

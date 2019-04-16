import React, { Component } from 'react';
import { XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import dateFns from 'date-fns';

const data = [
  {
    day: 'M',
    distance: 0,
    isoDate: 1,
  },
  {
    day: 'T',
    distance: 0,
    isoDate: 2,
  },
  {
    day: 'W',
    distance: 0,
    isoDate: 3,
  },
  {
    day: 'T',
    distance: 0,
    isoDate: 4,
  },
  {
    day: 'F',
    distance: 0,
    isoDate: 5,
  },
  {
    day: 'S',
    distance: 0,
    isoDate: 6,
  },
  {
    day: 'S',
    distance: 0,
    isoDate: 7,
  },
];

class DistanceChart extends Component {
  parseDates = runs => {
    const runData = [...data];
    for (let i = 0; i < runs.length; i++) {
      const splitDate = runs[i].date.split('-');
      splitDate[2] = splitDate[2].substring(0, 2);
      splitDate[1] = parseInt(splitDate[1]) - 1;

      var result = dateFns.getISODay(new Date(...splitDate));

      runData[result - 1].distance = runs[i].distance;
    }
    return runData;
  };

  render() {
    const { thisWeeksRuns } = this.props;

    const newData = this.parseDates(thisWeeksRuns);

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
  }
}

export default DistanceChart;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../../stylesheets/Donut.module.scss';

class DonutChart extends Component {
  render() {
    const { size, strokewidth, value, goal } = this.props;

    const distanceRan = value >= goal ? goal : value;

    const percentageOfGoal = (distanceRan / goal) * 100;

    const halfsize = size * 0.5;
    const radius = halfsize - strokewidth * 0.5;
    const circumference = 2 * Math.PI * radius;
    const strokeval = (percentageOfGoal * circumference) / 120;
    const trackStrokeval = (83 * circumference) / 100;
    const dashval = strokeval + ' ' + circumference;

    const trackstyle = {
      strokeWidth: strokewidth,
      strokeDasharray: trackStrokeval + ' ' + circumference,
    };
    const indicatorstyle = {
      strokeWidth: strokewidth,
      strokeDasharray: dashval,
    };
    const rotateval = 'rotate(120 ' + halfsize + ',' + halfsize + ')';
    return (
      <div>
        <svg width={size} height={size} className={styles.donutchart}>
          <circle
            r={radius}
            cx={halfsize}
            cy={halfsize}
            transform={rotateval}
            style={trackstyle}
            className={styles.donutchartTrack}
            strokeLinecap="round"
          />
          <circle
            r={radius}
            cx={halfsize}
            cy={halfsize}
            transform={rotateval}
            strokeLinecap="round"
            style={indicatorstyle}
            className={styles.donutchartIndicator}
          />
          <text
            className={styles.donutchartText}
            x={halfsize}
            y={halfsize}
            style={{ textAnchor: 'middle' }}
          >
            <DonutText value={value} halfsize={halfsize} goal={goal} />
          </text>
        </svg>
      </div>
    );
  }
}

DonutChart.defaultProps = {
  size: 125,
  strokewidth: 10,
};

DonutChart.propTypes = {
  size: PropTypes.number,
  strokewidth: PropTypes.number,
  value: PropTypes.number,
  goal: PropTypes.number,
};

export default DonutChart;

const DonutText = ({ value, halfsize, goal }) => (
  <>
    <tspan className={styles.donutchartTextVal}>{value}</tspan>
    <tspan className={styles.donutchartTextPercent}>/</tspan>
    <tspan
      className={styles.donutchartTextLabel}
      x={halfsize}
      y={halfsize + 20}
    >
      {`${goal} miles`}
    </tspan>
  </>
);

import React from 'react';
import styles from '../../stylesheets/Dashboard.module.scss';
import { Link } from 'react-router-dom';

const Stats = ({
  weeklyTotals: { totalDistance, totalHrs, totalMins, totalDays },
}) => {
  let hours = totalHrs;
  let mins = totalMins;

  if (mins >= 60) {
    hours += Math.floor(mins / 60);
    mins = mins % 60;
  }

  return (
    <div className={styles.userProgress}>
      <div className={styles.userProgressCircle}>S</div>
      <ul className={styles.userProgressTable}>
        <li className={styles.userProgressCol}>
          <div>Time</div>
          <div>{`${hours.toString()}hr${mins.toString()}min`}</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Distance</div>
          <div>{totalDistance} miles</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Days</div>
          <div>{totalDays}</div>
        </li>
      </ul>
    </div>
  );
};

export default Stats;

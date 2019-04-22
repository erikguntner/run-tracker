import React from 'react';
import styles from '../../stylesheets/Dashboard.module.scss';
import { Link } from 'react-router-dom';

const Stats = ({
  weeklyTotals: { totalDistance, totalHrs, totalMins, totalDays },
}) => {
  return (
    <div className={styles.userProgress}>
      <div className={styles.userProgressCircle}>S</div>
      <ul className={styles.userProgressTable}>
        <li className={styles.userProgressCol}>
          <div>Time</div>
          <div>{`${totalHrs.toString()}hr${totalMins.toString()}min`}</div>
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

import React from 'react';
import styles from '../../stylesheets/UserProfile.module.scss';
import { Link } from 'react-router-dom';

const Stats = ({ weeklyData: { hrs, mins, secs, days, distance } }) => {
  return (
    <div className={styles.userProgress}>
      <div className={styles.userProgressCircle}>S</div>
      <ul className={styles.userProgressTable}>
        <li className={styles.userProgressCol}>
          <div>Time</div>
          <div>{`${hrs.toString()}hr${mins.toString()}min`}</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Distance</div>
          <div>{distance} miles</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Days</div>
          <div>{days}</div>
        </li>
      </ul>
      <Link to="/log">
        <button>Log a run</button>
      </Link>
    </div>
  );
};

export default Stats;

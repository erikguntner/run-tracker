import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../stylesheets/Dashboard.module.scss';

const Stats = ({
  weeklyTotals: { totalDistance, totalHrs, totalMins, totalSecs, totalDays },
  username,
}) => {
  let hours = totalHrs;
  let mins = totalMins;
  let secs = totalSecs;

  if (mins >= 60) {
    hours += Math.floor(mins / 60);
    mins = mins % 60;
  }

  if (secs >= 60) {
    mins += Math.floor(secs / 60);
    secs = secs % 60;
  }

  return (
    <div className={styles.userProgress}>
      <div>
        <div className={styles.userProgressCircle}>
          {username && username.split('')[0].toUpperCase()}
        </div>
      </div>
      <ul className={styles.userProgressTable}>
        <li className={styles.userProgressCol}>
          <div>Time</div>
          <div>{`${hours.toString()}:${mins.toString()}:${secs.toString()}`}</div>
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

Stats.propTypes = {
  weeklyTotals: PropTypes.object,
};

export default Stats;

import React from 'react';
import styles from '../../stylesheets/UserProfile.module.scss';

export default function Stats() {
  return (
    <div className={styles.userProgress}>
      <div className={styles.userProgressCircle}>S</div>
      <ul className={styles.userProgressTable}>
        <li className={styles.userProgressCol}>
          <div>Time</div>
          <div>2hr4min</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Distance</div>
          <div>30</div>
        </li>
        <li className={styles.userProgressCol}>
          <div>Days</div>
          <div>4</div>
        </li>
      </ul>
      <button>Log a run</button>
    </div>
  );
}

import React from 'react';
import styles from '../stylesheets/Tooltip.module.scss';

const Start = ({ x, y }) => {
  return (
    <div
      className={styles.tooltip}
      style={{ position: 'absolute', left: x + 10, top: y }}
    >
      Start
    </div>
  );
};

export default Start;

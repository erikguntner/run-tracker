import React from 'react';
import styles from '../../stylesheets/Donut.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const SetGoal = ({
  setGoal,
  updateSetGoal,
  onGoalChange,
  newGoal,
  updateGoal,
}) => {
  return (
    <div className={styles.setGoalContainer}>
      <div className={styles.setGoalInner}>
        {setGoal ? (
          <>
            <input
              className={styles.setGoalInput}
              style={{
                width: `${23 + newGoal.toString().length * 23}px`,
              }}
              onChange={onGoalChange}
              min="0"
              type="number"
              placeholder="5"
            />
            <button onClick={updateGoal}>Save Goal</button>
          </>
        ) : (
          <div className={styles.setGoal} onClick={updateSetGoal}>
            <div>Set Goal</div>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SetGoal;

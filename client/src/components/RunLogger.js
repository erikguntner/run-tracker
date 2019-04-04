import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styles from '../stylesheets/UserProfile.module.scss';
import pickerStyles from '../stylesheets/DayPicker.module.scss';

const RunLogger = ({ milesRan, updateMilesRan, handleDayChange }) => {
  return (
    <h2>
      I ran{' '}
      <span
        style={{ width: `${milesRan.toString().length * 23}px` }}
        className={styles.inputContainer}
      >
        <input
          style={{ width: `${milesRan.toString().length * 23}px` }}
          onChange={updateMilesRan}
          placeholder="5"
          className={styles.input}
          type="text"
        />
      </span>{' '}
      miles on
      <span className={styles.inputContainer}>
        <DayPickerInput
          component={props => (
            <input className={pickerStyles.container} {...props} />
          )}
          onDayChange={handleDayChange}
          dayPickerProps={{
            disabledDays: {
              after: new Date(),
            },
            fromMonth: new Date(2019, 0),
            toMonth: new Date(),
          }}
        />
      </span>
    </h2>
  );
};

export default RunLogger;

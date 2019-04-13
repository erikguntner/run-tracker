import React from 'react';
import { connect } from 'formik';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styles from '../../stylesheets/UserProfile.module.scss';
import pickerStyles from '../../stylesheets/DayPicker.module.scss';

const RunLogger = ({
  field,
  milesRan,
  updateMilesRan,
  handleDayChange,
  formik,
}) => {
  const inputWidth = formik.values.distance
    ? formik.values.distance.length
    : formik.values.distance.length + 1;
  return (
    <div className={styles.runLogger}>
      on
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
      I ran{' '}
      <span
        style={{ width: `${inputWidth * 23}px` }}
        className={styles.inputContainer}
      >
        <input
          {...field}
          style={{ width: `${inputWidth * 23}px` }}
          placeholder="5"
          className={styles.input}
          type="text"
        />
      </span>{' '}
      miles
    </div>
  );
};

export default connect(RunLogger);

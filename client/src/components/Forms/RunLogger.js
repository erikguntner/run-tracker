import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';

import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
import styles from '../../stylesheets/RunningForm.module.scss';
import pickerStyles from '../../stylesheets/DayPicker.module.scss';

const RunLogger = ({
  field,
  updateMilesRan,
  handleDayChange,
  form,
  formik,
}) => {
  const inputWidth = formik.values.distance
    ? formik.values.distance.toString().length
    : formik.values.distance.toString().length + 1;

  return (
    <div className={styles.formGroup}>
      on
      <span className={styles.inputContainer}>
        <DayPickerInput
          component={props => (
            <input className={pickerStyles.container} {...props} />
          )}
          onDayChange={handleDayChange}
          dayPickerProps={{
            fromMonth: new Date(2019, 0),
            toMonth: new Date(),
          }}
        />
      </span>
      I ran{' '}
      <span
        style={{ width: `${inputWidth * 23}px` }}
        className={`${styles.inputContainer} ${
          form.touched[field.name] && form.errors[field.name]
            ? styles.error
            : ''
        }`}
      >
        <input
          {...field}
          style={{ width: `${inputWidth * 23}px` }}
          placeholder="5"
          className={styles.input}
          type="number"
        />
      </span>{' '}
      miles
    </div>
  );
};

RunLogger.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  formik: PropTypes.object,
  updateMilesRan: PropTypes.func,
  handleDayChange: PropTypes.func,
};

export default connect(RunLogger);

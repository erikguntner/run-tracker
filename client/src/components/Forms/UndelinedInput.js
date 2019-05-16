import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../stylesheets/RunningForm.module.scss';

const UnderlinedInput = ({ field, form, id }) => {
  const value = field.value;
  const inputWidth = value
    ? value.toString().length
    : value.toString().length + 2;
  return (
    <div
      style={{ width: `${inputWidth * 23}px` }}
      className={`${styles.inputContainer} ${
        form.touched[field.name] && form.errors[field.name] ? styles.error : ''
      }`}
    >
      <input
        {...field}
        type="number"
        min="0"
        placeholder="00"
        maxLength="2"
        style={{ width: `${inputWidth * 23}px` }}
        className={styles.input}
      />
    </div>
  );
};

export default UnderlinedInput;

UnderlinedInput.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  id: PropTypes.string,
};

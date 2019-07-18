import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../stylesheets/ControlButton.module.scss';

const ControlButton = ({ disabled, click, icon, tooltip, activeState }) => {
  return (
    <button disabled={disabled} className={styles.button}>
      <div
        disabled={disabled}
        className={activeState ? styles.innerButtonActive : styles.innerButton}
        onClick={click}
      >
        <FontAwesomeIcon disabled={disabled} icon={icon} />
      </div>
      <div className={styles.tooltip}>{tooltip}</div>
    </button>
  );
};

ControlButton.defaultProps = {
  activeState: false,
  disabled: false,
};

ControlButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default ControlButton;

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/Tooltip.module.scss';

const Tooltip = (props) => {
  const { distance, x, y } = props;

  return (
    <div className={styles.tooltip} style={{ position: 'absolute', left: x + 10, top: y }}>
      {distance}
    </div>
  );
};

Tooltip.propTypes = {
  distance: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Tooltip;

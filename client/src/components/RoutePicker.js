import React, { useState } from 'react';

import Modal from './Utilities/Modal';
import RouteList from './RouteList';

import styles from '../stylesheets/RoutePicker.module.scss';

const RoutePicker = () => {
  const [open, toggle] = useState(false);

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => toggle(!open)}>
        <span>+</span>
        <span>Add Route</span>
      </button>
      <Modal open={open} toggle={() => toggle(!open)}>
        <RouteList deleteBtn={false} type="list" />
      </Modal>
    </div>
  );
};

export default RoutePicker;

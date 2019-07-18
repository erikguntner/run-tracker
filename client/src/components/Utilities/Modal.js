import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal';
import Icon from './Icon';

import styles from '../../stylesheets/Modal.module.scss';

const Modal = ({ children, toggle, open }) => {

  return (
    <Portal>
      {open && (
        <div key={'modal'} className={styles.modalWrapper}>
          <div className={styles.background} onClick={toggle} />
          <div className={styles.modalCard}>
            <button className={styles.close} onClick={toggle}>
              <Icon name="close" />
            </button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  toggle: PropTypes.func,
  open: PropTypes.bool,
};

export default Modal;

import React, { Component } from 'react';
import Portal from './Portal';
import styles from '../stylesheets/Modal.module.scss';

class Modal extends Component {
  render() {
    const { children, toggle, open } = this.props;

    return (
      <Portal>
        {open && (
          <div className={styles.modalWrapper}>
            <div className={styles.background} onClick={toggle} />
            <div>{children}</div>
          </div>
        )}
      </Portal>
    );
  }
}

export default Modal;

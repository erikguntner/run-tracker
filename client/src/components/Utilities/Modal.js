import React from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import Portal from './Portal';
import Icon from './Icon';
import styles from '../../stylesheets/Modal.module.scss';

const Modal = ({ children, toggle, open }) => {
  const transition = useTransition(open, null, {
    from: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    leave: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
  });

  return (
    <Portal>
      {transition.map(({ item, key, props: animation }) => {
        return (
          item && (
            <div className={styles.modalWrapper}>
              <div className={styles.background} onClick={toggle} />
              <animated.div className={styles.modalCard} style={animation}>
                <button className={styles.close} onClick={toggle}>
                  <Icon name="close" />
                </button>
                <div>{children}</div>
              </animated.div>
            </div>
          )
        );
      })}
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.array,
  toggle: PropTypes.func,
  open: PropTypes.bool,
};

export default Modal;

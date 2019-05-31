import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

import Portal from './Utilities/Portal';
import Icon from './Utilities/Icon';
import styles from '../stylesheets/SideMenu.module.scss';
import PathList from './PathList';

const SideMenuWrapper = ({ children, toggle, open, username }) => {
  const transition = useTransition(open, null, {
    from: { transform: 'translate3d(-100%, 0, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(-100%, 0, 0)' },
  });

  const pointerEvents = open ? 'all' : 'none';

  return (
    <Portal>
      {transition.map(({ item, key, props: animation }) => {
        return (
          item && (
            <div key={'gjieorgoie'} className={styles.modalWrapper}>
              <div
                className={styles.background}
                onClick={toggle}
                style={{ pointerEvents }}
              />
              <animated.div
                key={'324'}
                style={animation}
                className={styles.menuCard}
              >
                <button className={styles.close} onClick={toggle}>
                  <Icon name="close" />
                </button>
                <div className={styles.circle} />
                <h3>{username}</h3>
                <PathList open={open} type={'list'} />
              </animated.div>
            </div>
          )
        );
      })}
    </Portal>
  );
};

SideMenuWrapper.propTypes = {
  toggle: PropTypes.func,
  open: PropTypes.bool,
  username: PropTypes.string,
};

export default SideMenuWrapper;

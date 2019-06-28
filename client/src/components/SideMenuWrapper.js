import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import Icon from './Utilities/Icon';
import styles from '../stylesheets/SideMenu.module.scss';
import PathList from './PathList';

const SideMenuWrapper = ({ children, toggle, open, username }) => {
  const { x, y, z } = useSpring({
    x: open ? 0 : 100,
    y: open ? 0.2 : 0,
  });

  return (
    <>
      {/* <animated.div
        className={styles.background}
        onClick={toggle}
        style={{
          opacity: y.interpolate(y => y),
        }}
      /> */}
      <animated.div
        className={styles.menuCard}
        style={{
          transform: x.interpolate(x => `translate3d(-${x}%, 0, 0)`),
        }}
      >
        <button className={styles.close} onClick={toggle}>
          <Icon name="close" />
        </button>
        <div className={styles.circle} />
        <h3>{username}</h3>
        <PathList open={open} type={'list'} />
      </animated.div>
    </>
  );
};

SideMenuWrapper.propTypes = {
  toggle: PropTypes.func,
  open: PropTypes.bool,
  username: PropTypes.string,
};

export default SideMenuWrapper;

import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import Icon from './Utilities/Icon';
import RouteList from './RouteList';

import styles from '../stylesheets/SideMenu.module.scss';

const SideMenuWrapper = ({ children, toggle, open, username }) => {
  const { x, y } = useSpring({
    x: open ? 0 : 100,
    y: open ? 0.3 : 0,
  });

  return (
    <>
      <animated.div
        className={styles.background}
        onClick={toggle}
        style={{
          opacity: y.interpolate(y => y),
          pointerEvents: open ? 'auto' : 'none',
        }}
      />
      <animated.div
        className={styles.menuCard}
        style={{
          transform: x.interpolate(x => `translate3d(-${x}%, 0, 0)`),
        }}
      >
        <button className={styles.close} onClick={toggle}>
          <Icon name="close" />
        </button>
        <div className={styles.circle}>
          {username && username.split('')[0].toUpperCase()}
        </div>
        <h3>{username}</h3>
        <RouteList open={open} type={'list'} deleteBtn={false} />
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

import React, { Component } from 'react';
import Portal from './Utilities/Portal';
import Icon from './Utilities/Icon';
import styles from '../stylesheets/SideMenu.module.scss';
import PathList from './PathList';

class SideMenuWrapper extends Component {
  render() {
    const { children, toggle, open, username } = this.props;
    return (
      <Portal>
        {open && (
          <div className={styles.modalWrapper}>
            <div className={styles.background} onClick={toggle} />
            <div
              className={
                `${styles.menuCard} ` + `${open ? styles.openCard : ''}`
              }
            >
              <button className={styles.close} onClick={toggle}>
                <Icon name="close" />
              </button>
              <div className={styles.circle} />
              <h3>{username}</h3>
              <PathList open={open} />
            </div>
          </div>
        )}
      </Portal>
    );
  }
}

export default SideMenuWrapper;

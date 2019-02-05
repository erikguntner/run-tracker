import React, { Component, Fragment } from 'react';
import Toggle from './Toggle';
import Portal from './Portal';
import Modal from './Modal';
import styles from '../stylesheets/Header.module.scss';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Toggle>
          {({ open, toggle }) => (
            <Fragment>
              <button onClick={toggle}>Login</button>
              <Modal open={open} toggle={toggle}>
                <h1>Still in MOdal</h1>
              </Modal>
            </Fragment>
          )}
        </Toggle>
      </header>
    );
  }
}

export default Header;

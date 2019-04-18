import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Dropdown.module.scss';

const Dropdown = props => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownList}>
        <Link className={styles.dropdownBtn} to="/profile/stats">
          view stats
        </Link>
        <Link className={styles.dropdownBtn} to="/profile/routes">
          view routes
        </Link>
        <Link className={styles.dropdownBtn} to="/profile/log">
          view runs
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;

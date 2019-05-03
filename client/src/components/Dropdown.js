import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Dropdown.module.scss';

const Dropdown = ({ dropdownOpen }) => {
  return (
    <div className={`${styles.dropdown} ${dropdownOpen ? styles.visible : ''}`}>
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

Dropdown.propTypes = {
  dropdownOpen: PropTypes.bool,
};

export default Dropdown;

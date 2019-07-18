import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import styles from '../../stylesheets/DashboardLink.module.scss';

const DashboardLink = ({ title, icon, link, id, path }) => (
  <Link to={link}>
    <button
      className={`${styles.navBtn} ${id === path[2] ? styles.activeBtn : ''}`}
    >
      <FontAwesomeIcon icon={icon} />
      <b>{title}</b>
    </button>
  </Link>
);

export default DashboardLink;

DashboardLink.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  link: PropTypes.string,
  id: PropTypes.string,
  path: PropTypes.array,
};

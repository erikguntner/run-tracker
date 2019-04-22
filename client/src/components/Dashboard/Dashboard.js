import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PathList from '../PathList';
import StatsContainer from './StatsContainer';
import RunLog from './RunLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRoute,
  faChartLine,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../requireAuth';
import styles from '../../stylesheets/Dashboard.module.scss';

class Dashboard extends Component {
  state = {
    milesRan: 0,
  };

  componentDidUpdate() {
    console.log(this.props.history);
  }

  render() {
    const { location } = this.props;
    const path = location.pathname.split('/');

    return (
      <section className={styles.profileGrid}>
        <nav className={styles.profileSidebar}>
          <ul>
            <li>
              <DashboardLink
                id={'stats'}
                title={'stats'}
                icon={faChartLine}
                link={'/profile/stats'}
                path={path}
              />
            </li>
            <li>
              <DashboardLink
                id={'routes'}
                title={'my routes'}
                icon={faRoute}
                link={'/profile/routes'}
                path={path}
              />
            </li>
            <li>
              <DashboardLink
                id={'log'}
                title={'my runs'}
                icon={faWalking}
                link={'/profile/log'}
                path={path}
              />
            </li>
          </ul>
          <div className={styles.btn}>
            <Link to="/log">
              <button>Log a run</button>
            </Link>
          </div>
        </nav>
        <div className={styles.profileContent}>
          {path[2] === 'stats' && <StatsContainer />}
          {path[2] === 'routes' && (
            <div className={styles.pathListContainer}>
              <PathList type={'grid'} />
            </div>
          )}
          {path[2] === 'log' && <RunLog />}
        </div>
      </section>
    );
  }
}

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

export default requireAuth(Dashboard);

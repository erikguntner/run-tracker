import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PathList from '../PathList';
import StatsContainer from './StatsContainer';
import RunLog from './RunLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faChartLine } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../requireAuth';
import styles from '../../stylesheets/UserProfile.module.scss';

class Dashboard extends Component {
  state = {
    milesRan: 0,
  };

  render() {
    const { location } = this.props;
    const path = location.pathname.split('/');

    return (
      <section className={styles.profileGrid}>
        <nav className={styles.profileSidebar}>
          <ul>
            <li>
              <DashboardLink
                title={'stats'}
                icon={faChartLine}
                link={'/profile/stats'}
              />
            </li>
            <li>
              <DashboardLink
                title={'routes'}
                icon={faRoute}
                link={'/profile/routes'}
              />
            </li>
            <li>
              <DashboardLink
                title={'run log'}
                icon={faRoute}
                link={'/profile/log'}
              />
            </li>
          </ul>
        </nav>
        <div className={styles.profileContent}>
          {path[2] === 'stats' && <StatsContainer />}
          {path[2] === 'routes' && (
            <div className={styles.pathListContainer}>
              <PathList />
            </div>
          )}
          {path[2] === 'log' && <RunLog />}
        </div>
      </section>
    );
  }
}

const DashboardLink = ({ title, icon, link }) => (
  <Link to={link}>
    <button>
      <FontAwesomeIcon icon={icon} />
      <b>{title}</b>
    </button>
  </Link>
);

export default requireAuth(Dashboard);

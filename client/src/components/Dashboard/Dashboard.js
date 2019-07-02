import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  faRoute,
  faChartLine,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';

import DashboardLink from './DashboardLink';
import PathList from '../PathList';
import StatsContainer from './StatsContainer';
import RunLog from './RunLog';
import UpdatedRunForm from '../Forms/UpdatedRunForm';
import requireAuth from '../requireAuth';

import styles from '../../stylesheets/Dashboard.module.scss';

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
            <li>
              <DashboardLink
                id={'run-form'}
                title={'log run'}
                icon={faWalking}
                link={'/profile/run-form'}
                path={path}
              />
            </li>
          </ul>
        </nav>
        <div className={styles.profileContent}>
          {path[2] === 'stats' && <StatsContainer />}
          {path[2] === 'routes' && (
            <div className={styles.pathListContainer}>
              <PathList type={'grid'} />
            </div>
          )}
          {path[2] === 'log' && <RunLog />}
          {path[2] === 'run-form' && <UpdatedRunForm />}
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  location: PropTypes.object,
};

export default requireAuth(Dashboard);

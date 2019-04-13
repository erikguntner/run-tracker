import React, { Component } from 'react';
import { connect } from 'react-redux';
import PathList from '../PathList';
import StatsContainer from './StatsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faChartLine } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../requireAuth';
import styles from '../../stylesheets/UserProfile.module.scss';

class Dashboard extends Component {
  state = {
    milesRan: 0,
    tab: 'dashboard',
  };

  handleChangeTab = tabTitle => {
    this.setState({
      tab: tabTitle,
    });
  };

  render() {
    const { milesRan, tab } = this.state;
    return (
      <section className={styles.profileGrid}>
        <div className={styles.profileSidebar}>
          <ul>
            <li>
              <button onClick={() => this.handleChangeTab('dashboard')}>
                <FontAwesomeIcon icon={faChartLine} />
                <b>stats</b>
              </button>
            </li>
            <li>
              <button onClick={() => this.handleChangeTab('routes')}>
                <FontAwesomeIcon icon={faRoute} />
                <b>routes</b>
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.profileContent}>
          {tab === 'dashboard' && <StatsContainer />}
          {tab === 'routes' && (
            <div className={styles.pathListContainer}>
              <PathList />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default requireAuth(Dashboard);

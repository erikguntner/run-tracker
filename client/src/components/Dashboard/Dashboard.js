import React, { Component } from 'react';
import PathList from '../PathList';
import StatsContainer from './StatsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faChartLine } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../requireAuth';
import styles from '../../stylesheets/UserProfile.module.scss';

class Dashboard extends Component {
  state = {
    milesRan: 0,
    date: null,
    tab: 'dashboard',
  };

  updateMilesRan = e => {
    if (e.target.value === '') {
      this.setState({
        milesRan: 0,
      });
    } else {
      this.setState({
        milesRan: e.target.value,
      });
    }
  };

  handleDayChange = day => {
    console.log(day);
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

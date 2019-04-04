import React, { Component } from 'react';
import DistanceChart from './DistanceChart';
import Donut from './Donut';
import PathList from './PathList';
import RunLogger from './RunLogger';

import requireAuth from './requireAuth';
import styles from '../stylesheets/UserProfile.module.scss';

class UserProfile extends Component {
  state = {
    milesRan: 0,
    date: null,
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

  render() {
    const { milesRan } = this.state;
    return (
      <section className={styles.profileGrid}>
        <div className={styles.profileSidebar}>
          <div className={styles.pathListContainer}>
            <PathList />
          </div>
        </div>
        <div className={styles.profileContent}>
          <div className={styles.row}>
            <div className={styles.userCircle}>S</div>
            <Donut />
          </div>
          <div>
            <RunLogger
              milesRan={milesRan}
              handleDayChange={this.handleDayChange}
              updateMilesRan={this.updateMilesRan}
            />
            <DistanceChart />
          </div>
        </div>
      </section>
    );
  }
}

export default requireAuth(UserProfile);

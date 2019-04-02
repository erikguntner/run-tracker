import React, { Component } from 'react';
import DistanceChart from './DistanceChart';
import Donut from './Donut';
import PathList from './PathList';
import requireAuth from './requireAuth';
import styles from '../stylesheets/UserProfile.module.scss';

class UserProfile extends Component {
  render() {
    return (
      <section className={styles.profileGrid}>
        <div className={styles.profileSidebar}>
          <div className={styles.pathListContainer}>
            <PathList />
          </div>
        </div>
        <div className={styles.profileContent}>
          <DistanceChart />
          <Donut />
        </div>
      </section>
    );
  }
}

export default requireAuth(UserProfile);

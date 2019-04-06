import React from 'react';
import DistanceChart from './DistanceChart';
import WeeklyChart from './WeeklyChart';
import Donut from './Donut';
import Stats from './Stats';
import RunLogger from './RunLogger';
import styles from '../../stylesheets/UserProfile.module.scss';

const StatsContainer = () => {
  return (
    <>
      <section className={styles.row}>
        <Stats />
        <div className={styles.row}>
          <WeeklyChart />
          <Donut />
        </div>
      </section>
      <section className={styles.chart}>
        {/* <RunLogger
              milesRan={milesRan}
              handleDayChange={this.handleDayChange}
              updateMilesRan={this.updateMilesRan}
            /> */}
        <DistanceChart />
      </section>
    </>
  );
};

export default StatsContainer;

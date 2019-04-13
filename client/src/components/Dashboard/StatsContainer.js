import React, { Component } from 'react';
import { connect } from 'react-redux';
import DistanceChart from './DistanceChart';
import WeeklyChart from './WeeklyChart';
import Donut from './Donut';
import Stats from './Stats';
import { getWeeklyRuns } from '../../actions/runLog';

import styles from '../../stylesheets/UserProfile.module.scss';

class StatsContainer extends Component {
  componentDidMount() {
    this.props.getWeeklyRuns();
  }

  render() {
    const { thisWeeksRuns } = this.props;
    const weeklyData = reduceWeeklyData(thisWeeksRuns);

    return (
      <>
        <section className={styles.row}>
          <Stats weeklyData={weeklyData} />
          <div className={styles.row}>
            <WeeklyChart runs={thisWeeksRuns} />
            <Donut />
          </div>
        </section>
        <section className={styles.chart}>
          <DistanceChart />
        </section>
      </>
    );
  }
}
// const mapStateToProps = store => ({});

const reduceWeeklyData = data => {
  return data.reduce(
    (accum, curr) => {
      accum.hrs = accum.hrs += parseInt(curr.hrs);
      accum.mins = accum.mins += parseInt(curr.mins);
      accum.secs = accum.secs += parseInt(curr.secs);
      accum.distance = accum.distance += parseInt(curr.distance);
      accum.days = accum.days += 1;
      return accum;
    },
    {
      hrs: 0,
      mins: 0,
      secs: 0,
      days: 0,
      distance: 0,
    }
  );
};

const mapDispatchToProps = dispatch => ({
  getWeeklyRuns: () => dispatch(getWeeklyRuns()),
});

const mapStateToProps = store => ({
  thisWeeksRuns: store.runLog.thisWeeksRuns,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContainer);

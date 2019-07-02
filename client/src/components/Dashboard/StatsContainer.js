import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DistanceChart from './DistanceChart';
import WeeklyChart from './WeeklyChart';
import Donut from './Donut';
import Stats from './Stats';
import { getWeeklyRuns } from '../../actions/runLog';

import styles from '../../stylesheets/Dashboard.module.scss';

class StatsContainer extends Component {
  componentDidMount() {
    this.props.getWeeklyRuns();
  }

  render() {
    const { thisWeeksRuns, weeklyTotals } = this.props;

    return (
      <div className={styles.stats}>
        <div className={styles.statsContainer}>
          <Stats weeklyTotals={weeklyTotals} />
        </div>
        <div className={styles.weeklyContainer}>
          <div className={styles.row}>
            <WeeklyChart thisWeeksRuns={thisWeeksRuns} />
            <Donut />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <DistanceChart />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWeeklyRuns: () => dispatch(getWeeklyRuns()),
});

const mapStateToProps = store => ({
  thisWeeksRuns: store.runLog.thisWeeksRuns,
  weeklyTotals: store.runLog.weeklyTotals,
});

StatsContainer.propTypes = {
  thisWeeksRuns: PropTypes.array,
  weeklyTotals: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContainer);

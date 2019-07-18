import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { getMonthlyRuns } from '../../actions/runLog';
import dateFns from 'date-fns';

import CustomSelect from '../Utilities/CustomSelect';

import styles from '../../stylesheets/Chart.module.scss';

class DistanceChart extends Component {
  state = {
    month: dateFns.getMonth(new Date()),
    title: 'Choose Month',
    months: [
      { id: 0, selected: false, title: 'January' },
      { id: 1, selected: false, title: 'February' },
      { id: 2, selected: false, title: 'March' },
      { id: 3, selected: false, title: 'April' },
      { id: 4, selected: false, title: 'May' },
      { id: 5, selected: false, title: 'June' },
      { id: 6, selected: false, title: 'July' },
      { id: 7, selected: false, title: 'August' },
      { id: 8, selected: false, title: 'September' },
      { id: 9, selected: false, title: 'October' },
      { id: 10, selected: false, title: 'November' },
      { id: 11, selected: false, title: 'December' },
    ],
  };

  // When the month is updated, make a call to the database to retrieve new data
  componentDidUpdate(prevProps, prevState) {
    const { month } = this.state;
    const { getMonthlyRuns } = this.props;
    if (prevState.month !== month) {
      getMonthlyRuns(month);
    }
  }

  // Get the data for the current month
  componentDidMount() {
    const { month } = this.state;
    const { getMonthlyRuns } = this.props;
    getMonthlyRuns(month);
    this.setSelected(month);
  }

  setSelected = id => {
    const { months } = this.state;

    const arr = [...months];
    arr.forEach(month => (month.selected = false));
    arr[id].selected = true;
    this.setState({
      months: arr,
      month: id,
    });
  };

  parseDataForChart = data => {
    const { month } = this.state;
    const runs = [];
    const daysInMonth = {
      0: 31,
      1: 28,
      2: 31,
      3: 30,
      4: 31,
      5: 30,
      6: 31,
      7: 31,
      8: 30,
      9: 31,
      10: 30,
      11: 31,
    };

    for (let i = 1; i <= daysInMonth[month]; i++) {
      runs.push({
        date: i,
        distance: 0,
      });
    }

    if (data.length === 0) return runs;

    data.forEach(run => {
      const dayOfMonth = dateFns.getDate(new Date(run.date));
      runs[dayOfMonth].distance =
        parseInt(runs[dayOfMonth].distance) + parseInt(run.distance);
    });

    return runs;
  };

  render() {
    const { months, month } = this.state;
    const { chartedRuns } = this.props;

    return (
      <section className={styles.container}>
        <div className={styles.row}>
          <CustomSelect
            setSelected={this.setSelected}
            headerTitle={months[month].title}
            options={months}
          />
        </div>
        <ResponsiveContainer width="90%" height={250}>
          <BarChart data={this.parseDataForChart(chartedRuns)}>
            <XAxis dataKey="date" />
            <YAxis dataKey="distance" />
            <Tooltip />
            <Legend />
            <Bar dataKey="distance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonthlyRuns: month => dispatch(getMonthlyRuns(month)),
});

const mapStateToProps = store => ({
  chartedRuns: store.runLog.chartedRuns,
});

DistanceChart.propTypes = {
  chartedRuns: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistanceChart);

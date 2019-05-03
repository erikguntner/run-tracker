import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import styles from '../../stylesheets/RunLog.module.scss';

const reduceDatesByMonth = runs => {
  return runs.reduce((accum, curr) => {
    const month = dateFns.format(new Date(0, curr.month + 1, 0), 'MMMM');
    if (accum[month]) {
      accum[month].push(curr);
      return accum;
    } else {
      accum[month] = [];
      accum[month].push(curr);
      return accum;
    }
  }, {});
};

class RunLog extends Component {
  render() {
    const { runs } = this.props;
    // Filter runs by date
    const filteredRuns = runs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    // Create an objet with an array of dates for each month
    const datesbyMonth = reduceDatesByMonth(filteredRuns);

    return (
      <section className={styles.list}>
        {Object.keys(datesbyMonth).map((month, i) => {
          return (
            <div key={`month-${i}`} style={{ width: '100%' }}>
              <h2 className={styles.month}>
                <span className={styles.text}>{month}</span>
              </h2>
              <div className={styles.container}>
                {datesbyMonth[month].map((run, i) => {
                  const jsDate = new Date(run.date);
                  const dateAdjustedForTZ = jsDate.setTime(
                    jsDate.getTime() + jsDate.getTimezoneOffset() * 60 * 1000
                  );
                  const date = dateFns.format(dateAdjustedForTZ, 'MM/DD/YYYY');

                  return (
                    <article className={styles.run} key={`run-${i}`}>
                      <h3>{date}</h3>
                      <h4>{run.distance} miles</h4>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = store => ({
  runs: store.runLog.runs,
});

RunLog.propTypes = {
  runs: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null
)(RunLog);

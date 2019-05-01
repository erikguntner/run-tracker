import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import styles from '../../stylesheets/RunLog.module.scss';

// const months = {
//   0: 'january',
//   1: 'february',
//   2: 'march',
//   3: 'april',
//   4: 'may',
//   5: 'june',
//   6: 'july',

// }

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
        {Object.keys(datesbyMonth).map(month => {
          return (
            <>
              <h2 className={styles.month}>
                <span className={styles.text}>{month}</span>
              </h2>
              <div className={styles.container}>
                {datesbyMonth[month].map((run, i) => {
                  const jsDate = new Date(run.date);
                  const dateAdjustedForTZ = jsDate.setTime(
                    jsDate.getTime() + jsDate.getTimezoneOffset() * 60 * 1000
                  );

                  console.log(dateFns.getMonth(new Date(dateAdjustedForTZ)));

                  const date = dateFns.format(dateAdjustedForTZ, 'MM/DD/YYYY');

                  return (
                    <article className={styles.run} key={`run-${i}`}>
                      <h3>{date}</h3>
                      <h4>{run.distance} miles</h4>
                    </article>
                  );
                })}
              </div>
            </>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = store => ({
  runs: store.runLog.runs,
});

export default connect(
  mapStateToProps,
  null
)(RunLog);

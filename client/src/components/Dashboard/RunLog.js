import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../stylesheets/RunLog.module.scss';

class RunLog extends Component {
  render() {
    const { runs } = this.props;
    return (
      <section className={styles.list}>
        {runs.map((run, i) => {
          return (
            <article key={`run-${i}`}>
              <h3>{new Date(run.date).toLocaleDateString()}</h3>
              <h4>{run.distance} miles</h4>
            </article>
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

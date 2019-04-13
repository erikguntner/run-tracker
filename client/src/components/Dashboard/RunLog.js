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
              <h3>date</h3>
              <h4>distance</h4>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGoal } from '../../actions/goal';

import DonutChart from './DonutChart';
import SetGoal from './SetGoal';

import styles from '../../stylesheets/Donut.module.scss';

class Donut extends Component {
  state = {
    newGoal: 0,
    setGoal: false,
  };

  onGoalChange = e => {
    if (e.target.value === '') {
      this.setState({
        newGoal: 0,
      });
    } else {
      this.setState({
        newGoal: e.target.value,
      });
    }
  };

  cancelUpdateGoal = () => {
    this.setState(prevState => ({
      newGoal: 0,
      setGoal: !prevState.setGoal,
    }));
  };

  updateGoal = () => {
    const { newGoal } = this.state;
    const { setGoal } = this.props;
    setGoal(newGoal);

    this.setState(prevState => ({
      newGoal: 0,
      setGoal: !prevState.setGoal,
    }));
  };

  updateSetGoal = () => {
    this.setState(prevState => ({
      setGoal: !prevState.setGoal,
    }));
  };

  render() {
    const { setGoal, newGoal } = this.state;
    const {
      goal,
      weeklyTotals: { totalDistance },
    } = this.props;

    return (
      <div className={styles.donutContainer}>
        {goal && !setGoal ? (
          <DonutChart
            goal={goal}
            value={totalDistance}
            setGoal={setGoal}
            onGoalChange={this.onGoalChange}
            updateSetGoal={this.updateSetGoal}
            updateGoal={this.updateGoal}
          />
        ) : (
          ''
        )}{' '}
        {(goal && setGoal) || !goal ? (
          <SetGoal
            newGoal={newGoal}
            setGoal={setGoal}
            updateSetGoal={this.updateSetGoal}
            onGoalChange={this.onGoalChange}
            updateGoal={this.updateGoal}
          />
        ) : (
          ''
        )}
        {!setGoal && goal ? (
          <button className={styles.btn} onClick={this.updateSetGoal}>
            change goal
          </button>
        ) : (
          ''
        )}
        {setGoal && goal ? (
          <button className={styles.btnCancel} onClick={this.cancelUpdateGoal}>
            cancel
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGoal: goal => dispatch(setGoal(goal)),
});

const mapStateToProps = store => ({
  goal: store.goal.goal,
  weeklyTotals: store.runLog.weeklyTotals,
});

Donut.propTypes = {
  goal: PropTypes.number,
  weeklyTotals: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donut);

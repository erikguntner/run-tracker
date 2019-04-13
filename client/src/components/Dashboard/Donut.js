import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonutChart from './DonutChart';
import SetGoal from './SetGoal';
import { setGoal } from '../../actions/goal';
import styles from '../../stylesheets/Donut.module.scss';

class Donut extends Component {
  state = {
    donutVal: parseInt(10),
    goal: null,
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

  updateGoal = () => {
    console.log('new Goal', this.state.newGoal);
    this.props.setGoal(this.state.newGoal);

    this.setState(prevState => ({
      goal: this.state.newGoal,
      newGoal: null,
      setGoal: !prevState.setGoal,
    }));
  };

  updateSetGoal = () => {
    this.setState(prevState => ({
      setGoal: !prevState.setGoal,
    }));
  };

  updateVal = e => {
    this.setState({ donutVal: parseInt(e.target.value) });
  };

  render() {
    const { donutVal, setGoal, newGoal } = this.state;
    const { goal } = this.props;

    return (
      <div className={styles.donutContainer}>
        <h4>Weekly Goal</h4>
        {goal ? (
          <DonutChart
            goal={goal}
            value={donutVal}
            setGoal={setGoal}
            onGoalChange={this.onGoalChange}
            updateSetGoal={this.updateSetGoal}
            updateGoal={this.updateGoal}
          />
        ) : (
          <SetGoal
            newGoal={newGoal}
            setGoal={setGoal}
            updateSetGoal={this.updateSetGoal}
            onGoalChange={this.onGoalChange}
            updateGoal={this.updateGoal}
          />
        )}
        <br />
        {goal && !setGoal && (
          <button onClick={this.updateSetGoal}>Change Goal</button>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donut);

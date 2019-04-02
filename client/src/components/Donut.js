import React, { Component } from 'react';
import DonutChart from './DonutChart';
import styles from '../stylesheets/Donut.module.scss';

class Donut extends Component {
  state = {
    donutVal: parseInt(10),
    goal: null,
    newGoal: null,
    setGoal: false,
  };

  onGoalChange = e => {
    this.setState({
      newGoal: e.target.value,
    });
  };

  updateGoal = () => {
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
    const { goal, donutVal, setGoal } = this.state;

    return (
      <div className={styles.donutContainer}>
        <h4>Weekly Goal</h4>
        <DonutChart
          goal={goal}
          value={donutVal}
          setGoal={setGoal}
          onGoalChange={this.onGoalChange}
          updateSetGoal={this.updateSetGoal}
        />
        <br />
        {goal && !setGoal && (
          <button onClick={this.updateSetGoal}>Change Goal</button>
        )}
        {setGoal && (
          <button onClick={() => this.updateGoal()}>Update Goal</button>
        )}
      </div>
    );
  }
}

export default Donut;

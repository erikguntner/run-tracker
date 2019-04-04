import React, { Component } from 'react';
import DistanceChart from './DistanceChart';
import Donut from './Donut';
import PathList from './PathList';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import requireAuth from './requireAuth';
import styles from '../stylesheets/UserProfile.module.scss';
import pickerStyles from '../stylesheets/DayPicker.module.scss';

class UserProfile extends Component {
  state = {
    milesRan: 0,
    date: null,
  };

  updateMilesRan = e => {
    if (e.target.value === '') {
      this.setState({
        milesRan: 0,
      });
    } else {
      this.setState({
        milesRan: e.target.value,
      });
    }
  };

  handleDayChange = day => {
    console.log(day);
  };

  render() {
    const { milesRan } = this.state;
    return (
      <section className={styles.profileGrid}>
        <div className={styles.profileSidebar}>
          <div className={styles.pathListContainer}>
            <PathList />
          </div>
        </div>
        <div className={styles.profileContent}>
          <div>
            <h2>
              I ran{' '}
              <span
                style={{ width: `${milesRan.toString().length * 23}px` }}
                className={styles.inputContainer}
              >
                <input
                  style={{ width: `${milesRan.toString().length * 23}px` }}
                  onChange={this.updateMilesRan}
                  placeholder="5"
                  className={styles.input}
                  type="text"
                />
              </span>{' '}
              miles on
              <span className={styles.inputContainer}>
                <DayPickerInput
                  component={props => (
                    <input className={pickerStyles.container} {...props} />
                  )}
                  onDayChange={this.handleDayChange}
                  dayPickerProps={{
                    disabledDays: {
                      after: new Date(),
                    },
                    fromMonth: new Date(2019, 0),
                    toMonth: new Date(),
                  }}
                />
              </span>
            </h2>
            <DistanceChart />
          </div>
          <Donut />
        </div>
      </section>
    );
  }
}

export default requireAuth(UserProfile);

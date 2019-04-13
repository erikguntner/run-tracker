import React from 'react';
import reducers from '../../reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import RunLogger from './RunLogger';
import { logRun } from '../../actions/runLog';
import styles from '../../stylesheets/RunningForm.module.scss';
import dateFns from 'date-fns';

class RunForm extends React.Component {
  state = {
    date: '',
  };

  handleDayChange = date => {
    this.setState({
      date,
    });
  };
  render() {
    const { history } = this.props;

    return (
      <section style={{ width: '80%' }}>
        <Formik
          initialValues={{
            distance: '',
            date: '',
            hrs: '',
            mins: '',
            secs: '',
          }}
          validate={values => {}}
          onSubmit={(values, { setSubmitting }) => {
            //turn string into year/day/month string
            const datesArr = this.state.date.toLocaleDateString().split('/');
            //reformat date for
            const formattedDate = formatDate(datesArr);
            // find isoweek/month values for selected date
            const week = dateFns.getISOWeek(new Date(this.state.date));
            const month = dateFns.getMonth(new Date(this.state.date));
            //set date, month, and week values in values object
            values.date = formattedDate;
            values.week = week;
            values.month = month;

            this.props.logRun(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="distance"
                render={({ field }) => (
                  <RunLogger
                    updateMilesRan={this.updateMilesRan}
                    handleDayChange={this.handleDayChange}
                    field={field}
                  />
                )}
              />
              <div className={styles.formGroup}>
                in
                <Field
                  type="text"
                  name="hrs"
                  render={({ field }) => (
                    <UnderlinedInput field={field} id="hrs" />
                  )}
                />
                hours
                <Field
                  type="text"
                  name="mins"
                  render={({ field }) => (
                    <UnderlinedInput field={field} id="mins" />
                  )}
                />
                minutes
                <Field
                  type="text"
                  name="secs"
                  render={({ field }) => (
                    <UnderlinedInput field={field} id="secs" />
                  )}
                />
                seconds
              </div>
              <button
                className={styles.submitBtn}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...Submitting' : 'Log Run'}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    );
  }
}

const formatDate = dateArr => {
  const formattedDate = dateArr.reduce((accum, curr, i) => {
    if (curr.length === 1) curr = `0${curr}`;
    if (i === 1) {
      return accum + `-${curr}`;
    } else if (i === 2) {
      return `${curr}-` + accum;
    } else {
      return accum + `${curr}`;
    }
  }, '');

  return formattedDate;
};

const UnderlinedInput = ({ field, id }) => {
  const value = field.value;
  const inputWidth = value ? value.length : value.length + 2;
  return (
    <div
      style={{ width: `${inputWidth * 23}px` }}
      className={styles.inputContainer}
    >
      <input
        {...field}
        placeholder="00"
        maxLength="2"
        style={{ width: `${inputWidth * 23}px` }}
        className={styles.input}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logRun: (values, setSubmitting) => dispatch(logRun(values, setSubmitting)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RunForm)
);

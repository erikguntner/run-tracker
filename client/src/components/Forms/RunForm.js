import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import RunLogger from './RunLogger';
import { logRun } from '../../actions/runLog';
import styles from '../../stylesheets/RunningForm.module.scss';
import dateFns from 'date-fns';
import * as Yup from 'yup';

const RunSchema = Yup.object().shape({
  distance: Yup.string().required(),
  hrs: Yup.number()
    .min(0)
    .required(),
  mins: Yup.number()
    .min(0)
    .required(),
  secs: Yup.number()
    .min(0)
    .required(),
});

class RunForm extends React.Component {
  state = {
    date: '',
  };

  handleDayChange = date => {
    this.setState({
      date,
    });
  };

  formatDate = dateArr => {
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

  render() {
    return (
      <section className={styles.section}>
        <Formik
          initialValues={{
            distance: '',
            date: '',
            hrs: '',
            mins: '',
            secs: '',
          }}
          validationSchema={RunSchema}
          onSubmit={(values, { setSubmitting }) => {
            //turn string into year/day/month string
            const datesArr = this.state.date.toLocaleDateString().split('/');
            //reformat date for
            const formattedDate = this.formatDate(datesArr);
            // find isoweek/month values for selected date
            const week = dateFns.getISOWeek(new Date(this.state.date));
            const month = dateFns.getMonth(new Date(this.state.date));
            //set date, month, and week values in values object

            values.date = formattedDate;
            values.week = week;
            values.month = month;
            //const updatedValues = parseValues(values);
            this.props.logRun(values, setSubmitting, this.props.history);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="distance"
                render={({ field, form }) => (
                  <RunLogger
                    updateMilesRan={this.updateMilesRan}
                    handleDayChange={this.handleDayChange}
                    field={field}
                    form={form}
                  />
                )}
              />
              <div className={styles.formGroup}>
                in
                <Field
                  type="text"
                  name="hrs"
                  render={({ field, form }) => (
                    <UnderlinedInput field={field} form={form} id="hrs" />
                  )}
                />
                hours
                <Field
                  type="text"
                  name="mins"
                  render={({ field, form }) => (
                    <UnderlinedInput field={field} form={form} id="mins" />
                  )}
                />
                minutes
                <Field
                  type="text"
                  name="secs"
                  render={({ field, form }) => (
                    <UnderlinedInput field={field} form={form} id="secs" />
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

const UnderlinedInput = ({ field, form, id }) => {
  const value = field.value;
  const inputWidth = value
    ? value.toString().length
    : value.toString().length + 2;
  return (
    <div
      style={{ width: `${inputWidth * 23}px` }}
      className={`${styles.inputContainer} ${
        form.touched[field.name] && form.errors[field.name] ? styles.error : ''
      }`}
    >
      <input
        {...field}
        type="number"
        min="0"
        placeholder="00"
        maxLength="2"
        style={{ width: `${inputWidth * 23}px` }}
        className={styles.input}
      />
    </div>
  );
};

UnderlinedInput.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  id: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  logRun: (values, setSubmitting, history) =>
    dispatch(logRun(values, setSubmitting, history)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RunForm)
);

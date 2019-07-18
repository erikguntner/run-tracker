import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import dateFns from 'date-fns';
import { logRun } from '../../actions/runLog';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import Input from './Input';
import RoutePicker from '../RoutePicker';

import inputStyles from '../../stylesheets/Input.module.scss';
import styles from '../../stylesheets/UpdatedRunningForm.module.scss';
import 'react-day-picker/lib/style.css';

const RunSchema = Yup.object().shape({
  distance: Yup.number()
    .typeError('value must be a number')
    .min(0)
    .required('This value is required'),
  date: Yup.date().required('You must select a date'),
  hrs: Yup.number()
    .typeError('value must be a number')
    .min(0)
    .required('This value is required'),
  mins: Yup.number()
    .typeError('value must be a number')
    .min(0)
    .required('This value is required'),
  secs: Yup.number()
    .typeError('value must be a number')
    .min(0)
    .required('This value is required'),
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
            const { date } = values;
            const { history, logRun } = this.props;
            //turn string into year/day/month string
            const datesArr = date.toLocaleDateString().split('/');
            //reformat date for
            const formattedDate = this.formatDate(datesArr);
            // find isoweek/month values for selected date
            const week = dateFns.getISOWeek(new Date(date));
            const month = dateFns.getMonth(new Date(date));
            //set date, month, and week values in values object
            values.date = formattedDate;
            values.week = week;
            values.month = month;
            //const updatedValues = parseValues(values);
            logRun(values, setSubmitting, history);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.container}>
              <Field
                type="number"
                name="distance"
                render={({ field, form }) => (
                  <Input
                    type="number"
                    field={field}
                    form={form}
                    id="distance"
                    label="distance"
                    placeholder="24"
                  />
                )}
              />
              <Field
                type="text"
                name="date"
                render={({ field, form }) => (
                  <DayPickerInput
                    onDayChange={selectedDay => {
                      form.setFieldValue('date', selectedDay);
                    }}
                    dayPickerProps={{
                      fromMonth: new Date(2019, 0),
                      toMonth: new Date(),
                    }}
                    component={props => {
                      const { name } = field;
                      const { touched, errors } = form;
                      return (
                        <div>
                          <div className={inputStyles.inputGroup}>
                            <input {...props} className={inputStyles.input} />
                            <label
                              className={`${inputStyles.label} ${
                                touched[name] && errors[name]
                                  ? inputStyles.error
                                  : ''
                              }`}
                              htmlFor={name}
                            >
                              date
                            </label>
                          </div>
                          {touched[name] && errors[name] && (
                            <div className={inputStyles.errorMessage}>
                              {errors[name]}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                )}
              />
              <Field
                type="number"
                name="hrs"
                render={({ field, form }) => (
                  <Input
                    type="number"
                    field={field}
                    form={form}
                    id="hrs"
                    label="hours"
                  />
                )}
              />
              <Field
                type="number"
                name="mins"
                render={({ field, form }) => (
                  <Input
                    type="number"
                    field={field}
                    form={form}
                    id="mins"
                    label="minutes"
                  />
                )}
              />
              <Field
                type="number"
                name="secs"
                render={({ field, form }) => (
                  <Input
                    type="number"
                    field={field}
                    form={form}
                    id="secs"
                    label="seconds"
                  />
                )}
              />
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

RunForm.propTypes = {
  logRun: PropTypes.func.isRequired,
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

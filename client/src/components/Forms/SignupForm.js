import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Input from './Input';

import styles from '../../stylesheets/Forms.module.scss';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('username is required')
    .min(4, 'username must be between 4-16 characters')
    .max(16, 'username must be between 4-16 characters'),
  password: Yup.string().required('password is required'),
});

const SignupForm = ({ signup, history }) => (
  <div className={styles.formContainer}>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        signup(values, history);

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="username"
            render={({ field, form }) => (
              <Input
                type="text"
                field={field}
                form={form}
                id="username"
                label="username"
              />
            )}
          />
          <Field
            type="password"
            name="password"
            render={({ field, form }) => (
              <Input
                type="password"
                field={field}
                form={form}
                id="password"
                label="password"
              />
            )}
          />
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  signup: (values, history) =>
    dispatch({
      type: 'SIGN_UP_USER',
      payload: { values, history },
    }),
});

SignupForm.propTypes = {
  signup: PropTypes.func,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignupForm)
);

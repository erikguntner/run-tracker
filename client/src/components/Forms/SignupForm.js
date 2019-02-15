import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../../stylesheets/Forms.module.scss';

const SignupForm = props => (
  <div className={styles.formContainer}>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.username) {
          errors.username = 'Username Required';
        }
        if (!values.password) {
          errors.password = 'Password Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        console.log(props);
        props.signup(values);
        console.log('passed signup');
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage name="username">
            {msg => <div className={styles.formError}>{msg}</div>}
          </ErrorMessage>
          <Field type="password" name="password" />
          <ErrorMessage name="password">
            {msg => <div className={styles.formError}>{msg}</div>}
          </ErrorMessage>
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  signup: values =>
    dispatch({
      type: 'SIGN_UP_USER',
      payload: values,
    }),
});

export default connect(
  null,
  mapDispatchToProps
)(SignupForm);

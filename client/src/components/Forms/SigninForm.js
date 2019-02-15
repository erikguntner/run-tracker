import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../../stylesheets/Forms.module.scss';

const SigninForm = props => (
  <div className={styles.formContainer}>
    <h1>Welcome Back!</h1>
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
        props.signin(values);
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
            Sign In
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  signin: values =>
    dispatch({
      type: 'SIGN_IN_USER',
      payload: values,
    }),
});

export default connect(
  null,
  mapDispatchToProps
)(SigninForm);

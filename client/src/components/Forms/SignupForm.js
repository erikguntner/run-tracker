import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../../stylesheets/Forms.module.scss';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('password is required'),
});

const SignupForm = props => (
  <div className={styles.formContainer}>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.signup(values, props.history);

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.formGroup}>
            <Field
              type="text"
              name="username"
              placeholder="username"
              label="username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <ErrorMessage name="username">
            {msg => <div className={styles.formError}>{msg}</div>}
          </ErrorMessage>
          <div className={styles.formGroup}>
            <Field
              type="password"
              name="password"
              placeholder="password"
              label="password"
            />
            <label htmlFor="pasword">Passsword</label>
          </div>
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
  signup: (values, history) =>
    dispatch({
      type: 'SIGN_UP_USER',
      payload: { values, history },
    }),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignupForm)
);

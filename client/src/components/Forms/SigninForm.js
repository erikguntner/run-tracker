import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../../stylesheets/Forms.module.scss';
import * as Yup from 'yup';

const SigninSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('password is required'),
});

class SigninForm extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.authentication !== prevProps.authentication) {
    }
  }

  render() {
    const { history } = this.props;

    return (
      <div className={styles.formContainer}>
        <h1>Welcome Back!</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={SigninSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.props.signin(values, history);
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
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signin: (values, history) =>
    dispatch({
      type: 'SIGN_IN_USER',
      payload: { values, history },
    }),
  authUser: token =>
    dispatch({
      type: 'AUTH_USER',
      payload: token,
    }),
});

const mapStateToProps = store => ({
  authentication: store.auth.authentication,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SigninForm)
);

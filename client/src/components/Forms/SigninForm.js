import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../../stylesheets/Forms.module.scss';

class SigninForm extends React.Component {
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
            this.props.signin(values, history);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="username" placeholder="username" />
              <ErrorMessage name="username">
                {msg => <div className={styles.formError}>{msg}</div>}
              </ErrorMessage>
              <Field type="password" name="password" placeholder="password" />
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

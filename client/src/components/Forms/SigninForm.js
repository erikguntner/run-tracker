import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Input from './Input';
import styles from '../../stylesheets/Forms.module.scss';

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
            const { signin } = this.props;
            signin(values, history);
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

SigninForm.propTypes = {
  history: PropTypes.object,
  authentication: PropTypes.string,
  authUser: PropTypes.func,
  signin: PropTypes.func,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SigninForm)
);

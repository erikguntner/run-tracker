import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupForm = () => (
  <div>
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignupForm;

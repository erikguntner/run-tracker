import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Input from './Input';
import styles from '../../stylesheets/Forms.module.scss';

const NewRouteSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

class NewRoute extends Component {
  render() {
    const { saveRoute, routeData, toggleModal } = this.props;

    return (
      <div className={styles.formContainer}>
        <Formik
          initialValues={{ title: '' }}
          validationSchema={NewRouteSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { title } = values;
            const data = { title, ...routeData };
            setSubmitting(true);
            saveRoute(data, setSubmitting, toggleModal);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="title"
                render={({ field, form }) => (
                  <Input
                    type="text"
                    field={field}
                    form={form}
                    id="title"
                    label="title"
                    placeholder="My Fun Run"
                  />
                )}
              />
              <button type="submit" disabled={isSubmitting}>
                {!isSubmitting ? 'Save Run' : 'submitting route'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = store => ({});

NewRoute.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRoute);

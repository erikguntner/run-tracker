import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SigninForm from './Forms/SigninForm';
import SignupForm from './Forms/SignupForm';
import styles from '../stylesheets/SigninContainer.module.scss';

class Signin extends Component {
  renderFormChangeMessage = (path, history) => {
    return path === '/signup' ? (
      <div className={styles.message}>
        <div>Already have an account?</div>
        <button onClick={() => history.push('/signin')}>Signin</button>
      </div>
    ) : (
      <div className={styles.message}>
        <div>Want to Signup for a new account?</div>
        <button onClick={() => history.push('/signup')}>Signup</button>
      </div>
    );
  };

  render() {
    const { match, history } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {match.path === '/signin' ? <SigninForm /> : <SignupForm />}
          {this.renderFormChangeMessage(match.path, history)}
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default Signin;

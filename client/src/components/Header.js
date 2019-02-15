import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signout } from '../actions/authActions';
import { Toggle, Modal } from './Utilities';
import { Link } from 'react-router-dom';
import SignupForm from './Forms/SignupForm';
import SigninForm from './Forms/SigninForm';
import styles from '../stylesheets/Header.module.scss';

class Header extends Component {
  state = {
    signup: true,
  };

  changeForm = () => {
    this.setState(prevState => ({
      signup: !prevState.signup,
    }));
  };

  renderFormChangeMessage = formType => {
    return formType === true ? (
      <div className={styles.formChange}>
        <div>Already have an account?</div>
        <button onClick={this.changeForm}>
          {formType ? 'signin' : 'signup'}
        </button>
      </div>
    ) : (
      <div className={styles.formChange}>
        <div>Want to Signup for a new account?</div>
        <button onClick={this.changeForm}>
          {formType ? 'signin' : 'signup'}
        </button>
      </div>
    );
  };

  render() {
    const { signup } = this.state;

    return (
      <header className={styles.header}>
        <Link to="/">Home</Link>
        <div>
          <Toggle>
            {({ open, toggle }) => (
              <Fragment>
                {this.props.authenticated ? (
                  <button onClick={this.props.signout}>Sign Out</button>
                ) : (
                  <button onClick={toggle}>Login</button>
                )}
                <Modal open={open} toggle={toggle}>
                  {signup ? (
                    <SignupForm toggle={toggle} />
                  ) : (
                    <SigninForm toggle={toggle} />
                  )}
                  {this.renderFormChangeMessage(signup)}
                </Modal>
              </Fragment>
            )}
          </Toggle>
          {this.props.authenticated && (
            <Link to="/profile">View User Profile</Link>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = store => {
  return {
    authenticated: store.auth.authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch(signout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

import React, { Component, Fragment } from 'react';
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

  render() {
    const { signup } = this.state;

    return (
      <header className={styles.header}>
        <Link to="/">Home</Link>
        <Toggle>
          {({ open, toggle }) => (
            <Fragment>
              <button onClick={toggle}>Login</button>
              <Modal open={open} toggle={toggle}>
                {signup ? <SignupForm /> : <SigninForm />}
                <button onClick={this.changeForm}>signin</button>
              </Modal>
            </Fragment>
          )}
        </Toggle>
        <Link to="/profile">View User Profile</Link>
      </header>
    );
  }
}

export default Header;

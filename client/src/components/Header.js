import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signout } from '../actions/authActions';
import { Toggle } from './Utilities';
import { Link } from 'react-router-dom';
import SideMenuWrapper from './SideMenuWrapper';
import PathList from './PathList';
import styles from '../stylesheets/Header.module.scss';

class Header extends Component {
  render() {
    const { location, history, authenticated } = this.props;
    const urlParams = location.pathname.split('/');

    return (
      <header className={styles.header}>
        <Link to={`/${authenticated ? urlParams[1] : ''}`}>Home</Link>
        <div>
          <Toggle>
            {({ open, toggle }) => (
              <Fragment>
                {this.props.authenticated ? (
                  <>
                    <button onClick={() => this.props.signout(history)}>
                      Sign Out
                    </button>
                    <button onClick={toggle}>Menu</button>
                  </>
                ) : (
                  <button onClick={() => history.push('/signin')}>Login</button>
                )}
                <SideMenuWrapper open={open} toggle={toggle}>
                  This, is the side menu wrapper
                  <PathList />
                </SideMenuWrapper>
              </Fragment>
            )}
          </Toggle>
          {this.props.authenticated && (
            <Link to={`${urlParams[1]}/profile`}>View User Profile</Link>
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
    signout: history => dispatch(signout(history)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { Toggle } from './Utilities';
import { Link } from 'react-router-dom';
import SideMenuWrapper from './SideMenuWrapper';
import PathList from './PathList';
import styles from '../stylesheets/Header.module.scss';

library.add(farUser);

class Header extends Component {
  render() {
    const {
      location,
      history,
      authenticated,
      username,
      loadingUser,
    } = this.props;
    const urlParams = location.pathname.split('/');

    return (
      <header className={styles.header}>
        <Link className={styles.home} to="/">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </Link>
        <div className={styles.headerRight}>
          <Toggle>
            {({ open, toggle }) => (
              <>
                {this.props.authenticated ? (
                  <>
                    <button onClick={() => this.props.signout(history)}>
                      sign out
                    </button>
                  </>
                ) : (
                  <button onClick={() => history.push('/signin')}>Login</button>
                )}
                <SideMenuWrapper
                  open={open}
                  toggle={toggle}
                  username={username}
                />
                {this.props.authenticated && (
                  <Link className={styles.userIcon} to="/profile/stats">
                    {loadingUser ? '...Loading' : username}{' '}
                    <span>
                      <FontAwesomeIcon icon={farUser} />
                    </span>
                  </Link>
                )}

                {!urlParams.includes('profile') && this.props.authenticated && (
                  <div className={styles.menuButton} onClick={toggle}>
                    <div className={styles.bar1} />
                    <div className={styles.bar2} />
                    <div className={styles.bar3} />
                  </div>
                )}
              </>
            )}
          </Toggle>
        </div>
      </header>
    );
  }
}

const mapStateToProps = store => {
  return {
    authenticated: store.auth.authenticated,
    username: store.auth.username,
    loadingUser: store.auth.loadingUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signout: history =>
      dispatch({
        type: 'SIGN_OUT_USER',
        payload: history,
      }),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

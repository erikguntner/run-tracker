import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { Toggle } from './Utilities';
import { Link } from 'react-router-dom';
import SideMenuWrapper from './SideMenuWrapper';
import PathList from './PathList';
import styles from '../stylesheets/Header.module.scss';

library.add(farUser);

class Header extends Component {
  render() {
    const { location, history, authenticated, username } = this.props;
    const urlParams = location.pathname.split('/');

    return (
      <header className={styles.header}>
        <Link to={`/${authenticated ? urlParams[1] : ''}`}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <div className={styles.headerRight}>
          <Toggle>
            {({ open, toggle }) => (
              <>
                {this.props.authenticated ? (
                  <>
                    <button onClick={() => this.props.signout(history)}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => history.push('/signin')}>Login</button>
                )}
                <SideMenuWrapper
                  open={open}
                  toggle={toggle}
                  username={username}
                >
                  <PathList />
                </SideMenuWrapper>
                {this.props.authenticated && (
                  <Link to={`${urlParams[1]}/profile`}>
                    {username}{' '}
                    <span className={styles.userIcon}>
                      <FontAwesomeIcon icon={farUser} />
                    </span>
                  </Link>
                )}

                {!urlParams.includes('profile') && (
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

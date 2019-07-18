import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkedAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { Toggle } from './Utilities';
import SideMenuWrapper from './SideMenuWrapper';
// import PathList from './PathList';
import Dropdown from './Dropdown';
import styles from '../stylesheets/Header.module.scss';

library.add(farUser);

export class Header extends Component {
  state = {
    dropdownOpen: false,
  };

  handleOpenDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const {
      location,
      history,
      authenticated,
      username,
      loadingUser,
      signout,
    } = this.props;

    const { dropdownOpen } = this.state;
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
                {authenticated ? (
                  <>
                    <button onClick={() => signout(history)}>sign out</button>
                  </>
                ) : (
                  <button onClick={() => history.push('/signin')}>login</button>
                )}
                <SideMenuWrapper
                  open={open}
                  toggle={toggle}
                  username={username}
                />
                {authenticated && (
                  <div
                    className={styles.userIcon}
                    onClick={this.handleOpenDropdown}
                  >
                    <div className={styles.userIconLink}>
                      {loadingUser ? '...Loading' : username}{' '}
                      <span>
                        <FontAwesomeIcon icon={farUser} />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </div>
                    <Dropdown
                      history={history}
                      signout={signout}
                      dropdownOpen={dropdownOpen}
                    />
                  </div>
                )}

                {!urlParams.includes('profile') && authenticated && (
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

Header.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  authenticated: PropTypes.string,
  username: PropTypes.string,
  loadingUser: PropTypes.bool,
  signout: PropTypes.func,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

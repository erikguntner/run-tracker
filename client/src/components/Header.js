import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkedAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { Toggle } from './Utilities';
import { Link } from 'react-router-dom';
import SideMenuWrapper from './SideMenuWrapper';
// import PathList from './PathList';
import Dropdown from './Dropdown';
import styles from '../stylesheets/Header.module.scss';

library.add(farUser);

class Header extends Component {
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
                    <Dropdown dropdownOpen={dropdownOpen} />
                  </div>
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

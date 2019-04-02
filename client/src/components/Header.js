import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Toggle } from './Utilities';
import { Link } from 'react-router-dom';
import SideMenuWrapper from './SideMenuWrapper';
import PathList from './PathList';
import styles from '../stylesheets/Header.module.scss';

class Header extends Component {
  render() {
    const { location, history, authenticated, username } = this.props;
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
                    {!urlParams.includes('profile') && (
                      <button onClick={toggle}>Menu</button>
                    )}
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
              </Fragment>
            )}
          </Toggle>
          {this.props.authenticated && (
            <Link to={`${urlParams[1]}/profile`}>
              {username} <FontAwesomeIcon icon={faUserCircle} />
            </Link>
          )}
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

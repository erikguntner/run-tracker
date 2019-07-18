import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withRouter } from 'react-router-dom';

import Header from './Header';

import styles from '../stylesheets/App.module.scss';

export class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () =>
    dispatch({
      type: 'LOAD_USER',
    }),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import styles from '../stylesheets/Route.module.scss';

class PathList extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const { routes } = this.props;
    return (
      <div className={styles.routeList}>
        {routes.map((route, i) => (
          <Route key={`route-${i}`} route={route} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  routes: store.routes.routes,
});

const mapDispatchToProps = dispatch => ({
  getRoutes: () =>
    dispatch({
      type: 'GET_ROUTES',
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import styles from '../stylesheets/Route.module.scss';

class PathList extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const { routes, loadingRoutes, deleteRoute } = this.props;
    return (
      <div className={styles.routeList}>
        {loadingRoutes && routes.length === 0 && <div>...Loading</div>}
        {routes.map((route, i) => {
          return (
            <Route
              deleteRoute={deleteRoute}
              id={route._id}
              key={`route-${i}`}
              route={route}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  routes: store.routes.routes,
  loadingRoutes: store.routes.loadingRoutes,
});

const mapDispatchToProps = dispatch => ({
  getRoutes: () =>
    dispatch({
      type: 'GET_ROUTES',
    }),
  deleteRoute: id =>
    dispatch({
      type: 'DELETE_ROUTE',
      id,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathList);

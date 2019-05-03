import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Route from './Route';
import styles from '../stylesheets/Route.module.scss';

class PathList extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const listStyles = {
      grid: styles.grid,
      list: styles.list,
    };
    const { routes, loadingRoutes, deleteRoute, type } = this.props;
    return (
      <div className={listStyles[type]}>
        {loadingRoutes && routes.length === 0 && <div>...Loading</div>}
        {routes.map((route, i) => {
          return (
            <Route
              key={`route-${i}`}
              deleteRoute={deleteRoute}
              id={route._id}
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

PathList.propTypes = {
  routes: PropTypes.array,
  loadingRoutes: PropTypes.bool,
  deleteRoute: PropTypes.func,
  type: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathList);

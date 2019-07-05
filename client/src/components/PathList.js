import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteCard from './RouteCard';
import styles from '../stylesheets/Route.module.scss';

export class PathList extends PureComponent {
  componentDidMount() {
    this.props.getRoutes();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.authenticated !== this.props.authenticated &&
      this.props.authenticated !== ''
    ) {
      this.props.getRoutes();
    }
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
        {routes.map(route => {
          return (
            <RouteCard
              key={route._id}
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
  authenticated: store.auth.authenticated,
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

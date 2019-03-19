import React, { Component } from 'react';
import { connect } from 'react-redux';
import Route from './Route';

class PathList extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const { routes } = this.props;
    return (
      <div>
        {routes.map((route, i) => (
          <Route key={`route-${i}`} distance={route.distance} />
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

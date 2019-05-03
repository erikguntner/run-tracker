import React from 'react';
import PropTypes from 'prop-types';
import RouteMap from './RouteMap';
import styles from '../stylesheets/Route.module.scss';

const Route = ({ route, id, deleteRoute }) => {
  const points = route.lineFeatures
    .map(line => {
      return line.geometry.coordinates;
    })
    .flat();

  return (
    <div className={styles.routeContainer}>
      <div className={styles.mapContainer}>
        <RouteMap points={points} />
      </div>
      <div>{route.distance[route.distance.length - 1]} miles</div>
      <button onClick={() => deleteRoute(id)}>Delete</button>
    </div>
  );
};

Route.propTypes = {
  route: PropTypes.object,
  id: PropTypes.string,
  deleteRoute: PropTypes.func,
};

export default Route;

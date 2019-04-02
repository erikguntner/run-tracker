import React from 'react';
import RouteMap from './RouteMap';
import styles from '../stylesheets/Route.module.scss';

const Route = ({ route }) => {
  const points = route.lineFeatures
    .map(line => {
      return line.geometry.coordinates;
    })
    .flat();

  return (
    <div className={styles.routeContainer}>
      <RouteMap points={points} />
      <div>{route.distance[route.distance.length - 1]} miles</div>
    </div>
  );
};

export default Route;

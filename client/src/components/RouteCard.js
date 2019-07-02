import React from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import styles from '../stylesheets/Route.module.scss';

const RouteCard = ({ route, id, deleteRoute }) => {
  const { image } = route;
  const distance = route.distance[route.distance.length - 1];

  return (
    <article className={styles.routeContainer}>
      <div className={styles.mapContainer}>
        <img src={image} alt="map" />
      </div>
      <div className={styles.routeDetails}>
        <div className={styles.row}>
          <div>{route.title ? route.title : 'title'}</div>
          <div>{turf.round(distance, 2)} miles</div>
        </div>
        <button onClick={() => deleteRoute(id)}>Delete</button>
      </div>
    </article>
  );
};

RouteCard.propTypes = {
  route: PropTypes.object,
  id: PropTypes.string,
  deleteRoute: PropTypes.func,
};

export default React.memo(RouteCard);

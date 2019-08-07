import React from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';

import styles from '../stylesheets/RouteCard.module.scss';

export const RouteCard = ({ route, id, deleteRoute, deleteBtn }) => {
  const { image } = route;
  const distance = route.distance[route.distance.length - 1];

  return (
    <article className={styles.routeContainer}>
      <div className={styles.mapContainer}>
        <img src={image} alt="map" />
      </div>
      <div className={styles.routeDetails}>
        <div className={styles.row}>
          <p>{route.title ? route.title : 'title'}</p>
          <p>{turf.round(distance, 2)} miles</p>
        </div>
        {deleteBtn && (
          <button className={styles.btnDelete} onClick={() => deleteRoute(id)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

RouteCard.defaultProps = {
  deleteBtn: true,
};

RouteCard.propTypes = {
  route: PropTypes.object,
  id: PropTypes.string,
  deleteRoute: PropTypes.func,
};

export default React.memo(RouteCard);

import React from 'react';
import { Marker } from 'react-map-gl';
import styles from '../../stylesheets/Map.module.scss';

const MapMarker = ({ point }) => {
  return (
    <Marker
      latitude={point[1]}
      longitude={point[0]}
      offsetLeft={-5}
      offsetTop={-5}
      draggable
    >
      <div className={styles.marker} />
    </Marker>
  );
};

export default MapMarker;

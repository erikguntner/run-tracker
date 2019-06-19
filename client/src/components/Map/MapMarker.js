import React from 'react';
import { Marker } from 'react-map-gl';
import styles from '../../stylesheets/Map.module.scss';

const MapMarker = ({ point, handleDragEnd, id }) => {
  return (
    <Marker
      latitude={point[1]}
      longitude={point[0]}
      offsetLeft={-5}
      offsetTop={-5}
      onDragEnd={(e) => handleDragEnd(e, id)}
      draggable
    >
      <div className={styles.marker} />
    </Marker>
  );
};

export default MapMarker;

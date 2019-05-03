import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import PolylineOverlay from './PolylineOverlay';
import * as turfHelpers from '@turf/helpers';
// import center from '@turf/center';
import bbox from '@turf/bbox';

class RouteMap extends Component {
  render() {
    const { points } = this.props;
    const line = turfHelpers.lineString(points);
    var bBox = bbox(line);

    const viewport = new WebMercatorViewport({
      width: 290,
      height: 150,
    }).fitBounds([[bBox[0], bBox[1]], [bBox[2], bBox[3]]], {
      padding: 5,
      offset: [0, -20],
    });

    return (
      <ReactMapGL
        mapboxApiAccessToken={
          'pk.eyJ1IjoiZXJpa2d1bnRuZXIiLCJhIjoiY2oyNW5zZ2o1MDAydjMybTV0ZTEwaWJuaSJ9.VXWevkFfyJd_0SnGKa1PSw'
        }
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        {...viewport}
      >
        <PolylineOverlay points={points} />
      </ReactMapGL>
    );
  }
}

RouteMap.propTypes = {
  points: PropTypes.array,
};

export default RouteMap;

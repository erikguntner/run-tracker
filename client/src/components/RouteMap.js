import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import PolylineOverlay from './PolylineOverlay';
import * as turfHelpers from '@turf/helpers';
// import center from '@turf/center';
import bbox from '@turf/bbox';

class RouteMap extends Component {
  render() {
    // const pointFeatures = this.props.points.map(point =>
    //   turfHelpers.point(point)
    // );

    // const features = turfHelpers.featureCollection(pointFeatures);
    // const centerPoint = center(features);

    const line = turfHelpers.lineString(this.props.points);
    var bBox = bbox(line);

    const viewport = new WebMercatorViewport({
      width: 200,
      height: 150,
    }).fitBounds([[bBox[0], bBox[1]], [bBox[2], bBox[3]]], {
      padding: 5,
      offset: [0, -20],
    });

    console.log(viewport);

    return (
      <ReactMapGL
        mapboxApiAccessToken={
          'pk.eyJ1IjoiZXJpa2d1bnRuZXIiLCJhIjoiY2oyNW5zZ2o1MDAydjMybTV0ZTEwaWJuaSJ9.VXWevkFfyJd_0SnGKa1PSw'
        }
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        {...viewport}
      >
        <PolylineOverlay points={this.props.points} />
      </ReactMapGL>
    );
  }
}
export default RouteMap;

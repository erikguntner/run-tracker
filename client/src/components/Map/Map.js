import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactMapGL, {
  NavigationControl,
  LinearInterpolator,
  Marker,
} from 'react-map-gl';
import { GeolocateControl } from 'mapbox-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
// import lineString from '@turf/helpers';
import * as turfHelpers from '@turf/helpers';
import bbox from '@turf/bbox';

import Controls from './Controls';
import Tooltip from '../Tooltip';
import Popup from '../Utilities/Popup';
import ElevationProfile from './ElevationProfile';
import { updateViewport } from '../../actions';
import styles from '../../stylesheets/Map.module.scss';
import { hexToRGBA, getDistanceFromLatLonInMi } from '../../utils/utils';

class Map extends Component {
  state = {
    distanceFromStart: 0,
    hoveredObject: null,
    hoveredCoordinates: [],
  };

  componentDidMount() {
    const map = this.reactMap.getMap();
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  renderTooltip = () => {
    const { hoveredObject, hoveredCoordinates, x, y } = this.state;

    if (!hoveredObject) {
      return null;
    }

    const [startingLong, startingLat] = this.props.startPoint;
    const [endingLong, endingLat] = hoveredCoordinates;

    const distance = getDistanceFromLatLonInMi(
      startingLong,
      startingLat,
      endingLong,
      endingLat
    )
      .toString()
      .split('')
      .slice(0, 4)
      .join('');

    return <Tooltip distance={distance} x={x} y={y} />;
  };

  handleHover = ({ x, y, object, coordinate }) => {
    this.setState({
      x,
      y,
      hoveredObject: object,
      hoveredCoordinates: coordinate,
    });
  };

  handleClick = event => {
    const {
      updateViewport,
      viewport,
      geoJSONPoints,
      addLocation,
      transportationType,
      clipPath,
    } = this.props;

    if (event.target.classList.contains('mapboxgl-ctrl-icon')) {
      navigator.geolocation.getCurrentPosition(position => {
        updateViewport({
          ...viewport,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
      return;
    }

    const [newLong, newLat] = event.lngLat;
    const [startLong, startLat] =
      geoJSONPoints.features.length !== 0
        ? geoJSONPoints.features[geoJSONPoints.features.length - 1].geometry
            .coordinates
        : [null, null];

    const newPoint = {
      type: 'Feature',
      properties: {
        color: geoJSONPoints.features.length !== 0 ? '#0991D3' : '#4FA03F',
      },
      geometry: {
        type: 'Point',
        coordinates: [newLong, newLat],
      },
    };

    addLocation(
      newPoint,
      startLat,
      startLong,
      newLat,
      newLong,
      transportationType,
      clipPath
    );
  };

  fit = () => {
    const map = this.reactMap.getMap();
    const bBox = bbox(this.props.geoJSONPoints);
    const boundaries = map.fitBounds(bBox);
  };

  render() {
    const {
      geoJSONPoints,
      geoJSONLines,
      distance,
      viewport,
      updateViewport,
      startPoint,
      match,
    } = this.props;

    return (
      <div className={styles.mapContainer}>
        <Controls fit={this.fit} matchParams={match.params} />
        {/* <TransportationSelect /> */}
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={
            'pk.eyJ1IjoiZXJpa2d1bnRuZXIiLCJhIjoiY2oyNW5zZ2o1MDAydjMybTV0ZTEwaWJuaSJ9.VXWevkFfyJd_0SnGKa1PSw'
          }
          onViewportChange={viewport => updateViewport(viewport)}
          width={'100%'}
          style={{ display: 'flex', flex: '1' }}
          ref={reactMap => {
            this.reactMap = reactMap;
          }}
          onClick={this.handleClick}
          mapStyle="mapbox://styles/mapbox/outdoors-v10"
          transitionDuration={300}
          transitionInterpolator={
            new LinearInterpolator(['latitude', 'longitude'])
          }
        >
          <Marker
            latitude={startPoint.length > 0 ? startPoint[1] : 1}
            longitude={startPoint.length > 0 ? startPoint[0] : 1}
            offsetLeft={-39}
            offsetTop={15}
          >
            <div className={styles.startPoint}>Start</div>
          </Marker>
          <DeckGL {...viewport} controller={true}>
            <GeoJsonLayer
              id="geojson-lines-layer"
              data={geoJSONLines}
              pickable={true}
              stroked={false}
              filled={true}
              extrudedd={true}
              lineWidthScale={15}
              lineWidthMinPixels={2}
              getLineColor={[33, 121, 224, 225]}
              getRadius={100}
              getLineWidth={1}
              getElevation={30}
            />
            <GeoJsonLayer
              id="geojson-points-layer"
              data={geoJSONPoints}
              pickable={true}
              stroked={false}
              filled={true}
              extrudedd={true}
              lineWidthScale={20}
              lineWidthMinPixels={2}
              getFillColor={d => hexToRGBA(d.properties.color, 255)}
              getRadius={20}
              getLineWidth={1}
              getElevation={30}
              onHover={this.handleHover}
            />
            {this.renderTooltip}
          </DeckGL>
          <div className={styles.zoom}>
            <NavigationControl
              onViewportChange={viewport => updateViewport(viewport)}
            />
          </div>
          <div className={styles.distance}>
            Distance:{' '}
            {distance.length === 0
              ? '0'
              : turfHelpers.round(distance[distance.length - 1], 2)}{' '}
            miles
          </div>
        </ReactMapGL>
        <ElevationProfile />
        <Popup />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  geoJSONPoints: store.map.geoJSONPoints,
  geoJSONLines: store.map.geoJSONLines,
  distance: store.map.distance,
  startPoint: store.map.startPoint,
  transportationType: store.map.transportationType,
  clipPath: store.map.clipPath,
  viewport: store.map.viewport,
});

const mapDispatchToProps = dispatch => ({
  addLocation: (
    newPoint,
    startLat,
    startLong,
    newLat,
    newLong,
    transportationType,
    clipPath
  ) =>
    dispatch({
      type: 'API_CALL_PATHS',
      data: {
        newPoint,
        startLat,
        startLong,
        newLat,
        newLong,
        transportationType,
        clipPath,
      },
    }),
  updateViewport: viewport => dispatch(updateViewport(viewport)),
});

Map.propTypes = {
  geoJSONPoints: PropTypes.object,
  geoJSONLines: PropTypes.object,
  distance: PropTypes.array,
  startPoint: PropTypes.array,
  transportationType: PropTypes.string,
  clipPath: PropTypes.bool,
  viewport: PropTypes.object,
  updateViewport: PropTypes.func,
  addLocation: PropTypes.func,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map)
);

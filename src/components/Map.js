import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import ReactMapGL, { NavigationControl, LinearInterpolator } from 'react-map-gl';
import { GeolocateControl } from 'mapbox-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import explode from '@turf/explode';

import Controls from './Controls';
import Tooltip from './Tooltip';
import ElevationProfile from './ElevationProfile';
import TransportationSelect from './TransportationSelect';
import { updateViewport } from '../actions';

import styles from '../stylesheets/Map.module.scss';
import { hexToRGBA, getDistanceFromLatLonInMi } from '../utils';
import { keys } from '../config';


class Map extends Component {

  state = {
    distanceFromStart: 0,
    hoveredObject: null,
    hoveredCoordinates: [],
  };

  componentDidMount() {
    const map = this.reactMap.getMap();
    map.addControl(new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))
  }

  explode = () => {
    console.log('explode');
    console.log(this.state.geoJSONLines);
    const BOOM = explode(this.state.geoJSONLines);
    console.log(BOOM);
  }

  renderTooltip = () => {
    const { hoveredObject, hoveredCoordinates, x, y } = this.state;

    if (!hoveredObject) {
      return null;
    }

    const [startingLong, startingLat] = this.props.startPoint;
    const [endingLong, endingLat] = hoveredCoordinates;

    const distance = getDistanceFromLatLonInMi(startingLong, startingLat, endingLong, endingLat).toString().split('').slice(0, 4).join('');

    return (
      <Tooltip distance={distance} x={x} y={y} />
    );
  }

  handleHover = ({ x, y, object, coordinate }) => {
    console.log(coordinate);
    this.setState({ x, y, hoveredObject: object, hoveredCoordinates: coordinate });
  }

  handleClick = (event) => {

    if (event.target.classList.contains("mapboxgl-ctrl-icon")) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.updateViewport({
          ...this.props.viewport,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
      });
      return;
    }

    const [newLong, newLat] = event.lngLat;
    const [startLong, startLat] = this.props.geoJSONPoints.features.length !== 0 ? this.props.geoJSONPoints.features[this.props.geoJSONPoints.features.length - 1].geometry.coordinates : [null, null];

    const newPoint = {
      type: "Feature",
      properties: {
        color: this.props.geoJSONPoints.features.length !== 0 ? "#0991D3" : "#4FA03F"
      },
      geometry: {
        type: "Point",
        coordinates: [
          newLong,
          newLat
        ]
      }
    };

    this.props.addLocation(newPoint, startLat, startLong, newLat, newLong, this.props.transportationType, this.props.clipPath);

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude: newLong,
        latitude: newLat,
      },
    }))
  }

  render() {
    const { geoJSONPoints, geoJSONLines, distance, viewport, updateViewport } = this.props;

    return (
      <Fragment>
        <Controls />
        <TransportationSelect />
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={keys.mapToken}
          onViewportChange={(viewport) => updateViewport(viewport)}
          width={'100%'}
          style={{ display: 'flex', flex: '1' }}
          ref={(reactMap) => { this.reactMap = reactMap; }}
          onClick={this.handleClick}
          mapStyle='mapbox://styles/mapbox/outdoors-v10'
          transitionDuration={300}
          transitionInterpolator={new LinearInterpolator(['latitude', 'longitude'])}
        >
          <DeckGL
            {...viewport}
            controller={true}
          >
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
              onHover={this.handleHover}
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
          <div style={{ position: 'absolute', left: 40, top: 40 }}>
            <NavigationControl onViewportChange={(viewport) => updateViewport(viewport)} />
          </div>
          <div className={styles.distance}>
            Distance: {distance.length === 0 ? '0' : distance[distance.length - 1]} miles
          </div>
        </ReactMapGL>
        <ElevationProfile />
      </Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    geoJSONPoints: store.map.geoJSONPoints,
    geoJSONLines: store.map.geoJSONLines,
    distance: store.map.distance,
    startPoint: store.map.startPoint,
    transportationType: store.map.transportationType,
    clipPath: store.map.clipPath,
    viewport: store.map.viewport,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLocation: (newPoint, startLat, startLong, newLat, newLong, transportationType, clipPath) => dispatch({ type: 'API_CALL_PATHS', data: { newPoint, startLat, startLong, newLat, newLong, transportationType, clipPath } }),
    updateViewport: (viewport) => dispatch(updateViewport(viewport))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

import { call, put } from 'redux-saga/effects';
import {
  ADD_LOCATION,
  ADD_LINE,
  REMOVE_LATEST_POINT,
  CLEAR_ROUTE, CLOSE_ROUTE,
  API_CALL_ELEVATION,
  UPDATE_ELEVATION_DATA,
  CHANGE_TO_CLIP_PATH,
  SHOW_ELEVATION,
  UPDATE_TRANSPORTATION,
  UPDATE_VIEWPORT,
} from './types';
import { keys } from '../config';

import { getDistanceFromLatLonInMi, roundTo } from '../utils';

const googleMapsElevationKey = keys.googleMapsElevationKey;
const graphHopperKey = keys.graphHopperKey;

// const graphHopperKey = process.env.GRAPH_HOPPER_KEY;
// const googleMapsElevationKey = process.env.GOOGLE_MAPS_ELEVATION_KEY;

export const addLocation = (newPoint) => {
  return {
    type: ADD_LOCATION,
    payload: newPoint
  };
}

export const removeLatestPoint = () => {
  return {
    type: REMOVE_LATEST_POINT
  }
}

export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
  }
}

export const closeRoute = () => {
  return {
    type: CLOSE_ROUTE
  }
}

export const changeToClipPath = (status) => {
  return {
    type: CHANGE_TO_CLIP_PATH,
    payload: status
  }
}

export const showElevation = () => {
  return {
    type: SHOW_ELEVATION,
  }
}

export const updateTransportation = transportationType => {
  return {
    type: UPDATE_TRANSPORTATION,
    payload: transportationType
  }
}

export const updateViewport = viewport => {
  return {
    type: UPDATE_VIEWPORT,
    payload: viewport
  }
}


////////////////////////////////////// 
//
// SAGA ACTIONS
//
////////////////////////////////////// 

// makes fetch request to the url passed into 
const api = (url) => fetch(url).then(res => res.json());
const elevationApi = (url) => fetch(url).then(res => res.json());

export function* fetchPathData(action, ...args) {

  const { newPoint, startLat, startLong, newLat, newLong, transportationType, clipPath } = action.data;

  // If points exist inside the store
  if (startLat) {
    // Run on succesful api call
    try {
      let numberOfPoints;
      let pointString;
      let distance;

      if (clipPath) {
        // Path data contains the result from the api call
        const pathData = yield call(api, `https://graphhopper.com/api/1/route?point=${startLat},${startLong}&point=${newLat},${newLong}&vehicle=${transportationType}&debug=true&key=${graphHopperKey}&type=json&points_encoded=false`);
        // put acts like dispatch from redux/redux-thunk
        // this is "dispatching" the ADD_LINE action to the reducer
        numberOfPoints = pathData.paths[0].points.coordinates.length.toString();

        pointString = pathData.paths[0].points.coordinates.map(coordinate => {
          return [coordinate[1], coordinate[0]];
        }).join('|');

        distance = roundTo(pathData.paths[0].distance * 0.000621371, 2);

        yield put({
          type: ADD_LINE, payload: {
            newPoint,
            newLine: {
              "type": "Feature",
              "properties": {
                color: '#0991D3'
              },
              "geometry": {
                "type": "LineString",
                "coordinates": pathData.paths[0].points.coordinates
              }
            },
            distance
          }
        });
      } else {
        numberOfPoints = '2';

        pointString = `${startLat},${startLong}|${newLat},${newLong}`;

        distance = roundTo(getDistanceFromLatLonInMi(startLat, startLong, newLat, newLong), 2);

        yield put({
          type: ADD_LINE, payload: {
            newPoint,
            newLine: {
              "type": "Feature",
              "properties": {
                color: '#0991D3'
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [[startLong, startLat], [newLong, newLat]]
              }
            },
            distance
          }
        });

      }

      yield put({
        type: API_CALL_ELEVATION,
        data: {
          pointString,
          numberOfPoints
        },
      })

    } catch (err) {
      console.log(err);
    }
  } else {

    yield put({
      type: ADD_LOCATION,
      payload: action.data.newPoint
    })
  }
}

export function* fetchElevationData(data) {
  const { pointString, numberOfPoints } = data.data;

  const elevationData = yield call(elevationApi, `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?path=${pointString}&samples=${numberOfPoints}&key=${googleMapsElevationKey}`);

  yield put({
    type: UPDATE_ELEVATION_DATA,
    payload: elevationData
  })
}

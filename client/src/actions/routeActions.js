import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { ADD_ROUTE, ADD_ALL_ROUTES } from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPostWithHeaders = (url, body, headers) =>
  axios.post(url, body, { headers: headers });

const apiGetRequest = (url, headers) => axios.get(url, { headers: headers });

export function* saveRoute({
  type,
  payload: {
    matchParams,
    elevationData,
    startPoint,
    endPoint,
    viewport,
    geoJSONLines,
    geoJSONPoints,
    distance,
  },
}) {
  const body = {
    elevationData,
    startPoint,
    endPoint,
    viewport,
    pointFeatures: geoJSONPoints.features,
    lineFeatures: geoJSONLines.features,
    distance: distance,
  };

  const token = localStorage.getItem('token');

  try {
    const postRouteData = yield call(
      apiPostWithHeaders,
      `${server}/routes/${matchParams.id}`,
      body,
      {
        'Content-Type': 'application/json',
        authorization: token,
      }
    );

    yield put({
      type: ADD_ROUTE,
      payload: postRouteData.data,
    });
  } catch {
    console.log('there was an error');
  }
}

export function* getRoutes() {
  try {
    const token = localStorage.getItem('token');
    const getRoutesData = yield call(apiGetRequest, `${server}/routes`, {
      'Content-Type': 'application/json',
      authorization: token,
    });

    yield put({
      type: ADD_ALL_ROUTES,
      payload: getRoutesData.data,
    });
  } catch {
    console.log('there was an error');
  }
}
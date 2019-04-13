import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  ADD_ROUTE,
  ADD_ALL_ROUTES,
  LOADING_ROUTES,
  NOTIFY_SUCCESS,
  NOTIFY_FAILURE,
  DELETE_ROUTE_SUCCESS,
} from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPostWithHeaders = (url, body, headers) =>
  axios.post(url, body, { headers: headers });

const callDeleteRoute = (url, body) => axios.delete(url, body);

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
    startPoint: {
      coordinates: startPoint,
    },
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

    yield put({
      type: NOTIFY_SUCCESS,
      payload: {
        open: true,
        message: 'Your route was added successfully',
        status: 'success',
      },
    });
  } catch {
    yield put({
      type: NOTIFY_FAILURE,
      payload: {
        open: true,
        message: 'Your route was not added successfully',
        status: 'failures',
      },
    });
  }
}

export function* getRoutes() {
  yield put(setLoadingRoutes(true));

  try {
    const token = localStorage.getItem('token');
    const getRoutesData = yield call(apiGetRequest, `${server}/routes`, {
      'Content-Type': 'application/json',
      authorization: token,
    });

    const routes = getRoutesData.data.map(route => {
      return { ...route, startPoint: route.startPoint.coordinates };
    });

    yield put({
      type: ADD_ALL_ROUTES,
      payload: routes,
    });
  } catch {
    console.log('there was an error');
  }
}

export function* deleteRoute({ id }) {
  try {
    const token = localStorage.getItem('token');
    yield call(
      callDeleteRoute,
      `${server}/routes/delete`,
      {
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }
    );

    yield put({
      type: DELETE_ROUTE_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
}

const setLoadingRoutes = status => ({
  type: LOADING_ROUTES,
  payload: status,
});

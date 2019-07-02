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

const apiGetRequest = (url, headers = {}) =>
  axios.get(url, { headers: headers });

// const putToS3 = (url, body, headers) =>
//   axios.put(url, body, { headers: headers });

export function* saveRoute({
  type,
  payload: {
    routeData: {
      title,
      matchParams,
      elevationData,
      startPoint,
      endPoint,
      viewport,
      geoJSONLines,
      geoJSONPoints,
      distance,
    },
    setSubmitting,
    toggleModal,
  },
}) {
  const body = {
    title,
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
    // Post to upload to take screenshot and return the signedURL from aws
    const uploadConfig = yield call(
      apiPostWithHeaders,
      `${server}/upload`,
      { lineFeatures: body.lineFeatures },
      { 'Content-Type': 'application/json', authorization: token }
    );

    // Make put request to S3 to store image in bucket (experimental)
    // const uploadFileToS3 = yield call(
    //   putToS3,
    //   uploadConfig.data.url,
    //   uploadConfig.data.buf,
    //   {
    //     'Content-Type': 'image/jpeg',
    //   }
    // );

    const postRouteData = yield call(
      apiPostWithHeaders,
      `${server}/routes/${matchParams.id}`,
      { image: uploadConfig.data.Location, ...body },
      {
        'Content-Type': 'application/json',
        authorization: token,
      }
    );

    console.log(postRouteData.data);

    yield put({
      type: ADD_ROUTE,
      payload: postRouteData.data,
    });

    setSubmitting(false);
    toggleModal();

    yield put({
      type: NOTIFY_SUCCESS,
      payload: {
        open: true,
        message: 'Your route was added successfully',
        status: 'success',
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: NOTIFY_FAILURE,
      payload: {
        open: true,
        message: 'Your route was not added successfully',
        status: 'fail',
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
    yield call(callDeleteRoute, `${server}/routes/delete`, {
      params: { id },
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

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

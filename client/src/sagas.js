import { takeEvery, all } from 'redux-saga/effects';
import {
  API_CALL_PATHS,
  API_CALL_ELEVATION,
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER,
  LOAD_USER,
  SAVE_ROUTE,
  GET_ROUTES,
  DELETE_ROUTE,
} from './actions/types';
import { fetchPathData, fetchElevationData } from './actions';
import { saveRoute, getRoutes, deleteRoute } from './actions/routeActions';
import { signin, signup, signout, loadUser } from './actions/authActions';

function* watcherSaga() {
  yield all([
    takeEvery(API_CALL_PATHS, fetchPathData),
    takeEvery(API_CALL_ELEVATION, fetchElevationData),
    takeEvery(SIGN_IN_USER, signin),
    takeEvery(SIGN_UP_USER, signup),
    takeEvery(SIGN_OUT_USER, signout),
    takeEvery(LOAD_USER, loadUser),
    takeEvery(SAVE_ROUTE, saveRoute),
    takeEvery(GET_ROUTES, getRoutes),
    takeEvery(DELETE_ROUTE, deleteRoute),
  ]);
}

export default watcherSaga;

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
  LOG_RUN,
  GET_RUNS_BY_DATE,
  GET_WEEKLY_RUNS,
  GET_RUNS_BY_MONTH,
  SET_GOAL,
} from './actions/types';
import { fetchPathData, fetchElevationData } from './actions';
import { saveRoute, getRoutes, deleteRoute } from './actions/routeActions';
import { signin, signup, signout, loadUser } from './actions/authActions';
import {
  postRun,
  getRunsByDate,
  getThisWeeksRuns,
  getRunsByMonth,
} from './actions/runLog';
import { postNewGoal } from './actions/goal';

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
    takeEvery(LOG_RUN, postRun),
    takeEvery(GET_RUNS_BY_DATE, getRunsByDate),
    takeEvery(GET_WEEKLY_RUNS, getThisWeeksRuns),
    takeEvery(GET_RUNS_BY_MONTH, getRunsByMonth),
    takeEvery(SET_GOAL, postNewGoal),
  ]);
}

export default watcherSaga;

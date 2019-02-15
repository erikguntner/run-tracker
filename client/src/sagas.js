import { takeEvery, all } from 'redux-saga/effects';
import {
  API_CALL_PATHS,
  API_CALL_ELEVATION,
  SIGN_IN_USER,
  SIGN_UP_USER,
} from './actions/types';
import { fetchPathData, fetchElevationData } from './actions';
import { signin, signup } from './actions/authActions';

function* watcherSaga() {
  yield all([
    takeEvery(API_CALL_PATHS, fetchPathData),
    takeEvery(API_CALL_ELEVATION, fetchElevationData),
    takeEvery(SIGN_IN_USER, signin),
    takeEvery(SIGN_UP_USER, signup),
  ]);
}

export default watcherSaga;

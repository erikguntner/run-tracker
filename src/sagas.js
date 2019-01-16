import { takeEvery, all } from "redux-saga/effects";
import { API_CALL_PATHS, API_CALL_ELEVATION } from './actions/types';
import { fetchPathData, fetchElevationData } from './actions';


function* watcherSaga() {
  yield all([
    takeEvery(API_CALL_PATHS, fetchPathData),
    takeEvery(API_CALL_ELEVATION, fetchElevationData)
  ]);
}

export default watcherSaga;

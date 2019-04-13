import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  LOG_RUN,
  LOG_RUN_SUCCESS,
  GET_RUNS_BY_DATE,
  GET_WEEKLY_RUNS,
  GET_WEEKLY_RUNS_SUCCESS,
} from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPost = (url, body, config = {}) => axios.post(url, body, config);
const apiGet = (url, config = {}) => axios.get(url, config);

export const getRuns = values => {
  return {
    type: GET_RUNS_BY_DATE,
    payload: values,
  };
};

export const getWeeklyRuns = () => ({
  type: GET_WEEKLY_RUNS,
});

export const logRun = (values, setSubmitting) => {
  return {
    type: LOG_RUN,
    payload: { values, setSubmitting },
  };
};

export function* getThisWeeksRuns() {
  console.log('im getting them runs!');
  try {
    const token = localStorage.getItem('token');
    const thisWeeksRuns = yield call(apiGet, `${server}/runs/week`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    const { runs } = thisWeeksRuns.data;
    console.log(runs);

    yield put({
      type: GET_WEEKLY_RUNS_SUCCESS,
      payload: runs,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getRunsByDate() {
  try {
    const token = localStorage.getItem('token');

    const getRuns = yield call(apiGet, `${server}/runs`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* postRun({ payload: { values, setSubmitting } }) {
  try {
    const token = localStorage.getItem('token');

    const postedRun = yield call(apiPost, `${server}/runs`, values, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    console.log(postedRun);

    put({
      type: LOG_RUN_SUCCESS,
    });

    setSubmitting(false);
  } catch (err) {
    console.log(err);
    setSubmitting(false);
  }
}

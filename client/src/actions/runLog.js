import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  LOG_RUN,
  LOG_RUN_SUCCESS,
  GET_RUNS_BY_DATE,
  GET_WEEKLY_RUNS,
  GET_WEEKLY_RUNS_SUCCESS,
  GET_RUNS_BY_MONTH,
  GET_RUNS_BY_MONTH_SUCCESS,
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

export const getMonthlyRuns = month => {
  return {
    type: GET_RUNS_BY_MONTH,
    payload: month,
  };
};

export const logRun = (values, setSubmitting, history) => {
  return {
    type: LOG_RUN,
    payload: { values, setSubmitting, history },
  };
};

export function* getThisWeeksRuns() {
  try {
    const token = localStorage.getItem('token');
    const thisWeeksRuns = yield call(apiGet, `${server}/runs/week`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    const { runlog, totals } = thisWeeksRuns.data;

    yield put({
      type: GET_WEEKLY_RUNS_SUCCESS,
      payload: { runlog, totals },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getRunsByMonth({ payload }) {
  try {
    const token = localStorage.getItem('token');
    const monthlyRuns = yield call(apiGet, `${server}/runs/month/${payload}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    const { runs } = monthlyRuns.data;

    yield put({
      type: GET_RUNS_BY_MONTH_SUCCESS,
      payload: runs,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getRunsByDate() {
  try {
    const token = localStorage.getItem('token');

    yield call(apiGet, `${server}/runs`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* postRun({ payload: { values, setSubmitting, history } }) {
  try {
    const token = localStorage.getItem('token');

    const postedRun = yield call(apiPost, `${server}/runs`, values, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    yield put({
      type: LOG_RUN_SUCCESS,
      payload: values,
    });

    setSubmitting(false);
    console.log(history);
    history.push('/profile/stats');
  } catch (err) {
    console.log(err);
    setSubmitting(false);
  }
}

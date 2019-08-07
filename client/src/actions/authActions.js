import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  AUTH_USER,
  CLEAR_ROUTES,
  CLEAR_RUNS,
  CLEAR_GOAL,
  SET_USERNAME,
  LOADING_USER,
  POPULATE_RUNLOG,
  POPULATE_GOAL,
} from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPost = (url, body) => axios.post(url, body);
const apiGetRequest = (url, headers) => axios.get(url, { headers: headers });

export function* signin({ type, payload: { values, history } }) {
  try {
    const response = yield call(apiPost, `${server}/api/signin`, values);

    yield put({
      type: AUTH_USER,
      payload: {
        token: response.data.token,
        username: response.data.user.username,
      },
    });

    localStorage.setItem('token', response.data.token);

    history.push('/');
  } catch (err) {
    console.log(err);
  }
}

export function* loadUser() {
  yield put(loadingUser(true));

  const token = localStorage.getItem('token');

  if (token === null) return;

  const getUserData = yield call(apiGetRequest, `${server}/api/user`, {
    'Content-Type': 'application/json',
    authorization: token,
  });

  yield put({
    type: SET_USERNAME,
    payload: getUserData.data.username,
  });

  yield put({
    type: POPULATE_RUNLOG,
    payload: getUserData.data.runlog,
  });
  yield put({
    type: POPULATE_GOAL,
    payload: getUserData.data.goal,
  });
}

export function* signup({ type, payload: { values, history } }) {
  try {
    const response = yield call(apiPost, `${server}/api/signup`, values);

    yield put({
      type: AUTH_USER,
      payload: {
        loadingUser: false,
        token: response.data.token,
        username: response.data.user.username,
      },
    });

    localStorage.setItem('token', response.data.token);

    history.push('/');
  } catch (err) {
    console.log(err);
  }
}

export function* signout({ payload }) {
  localStorage.removeItem('token');

  yield put({
    type: AUTH_USER,
    payload: { token: '', username: '' },
  });

  yield put({
    type: CLEAR_ROUTES,
  });

  yield put({
    type: CLEAR_RUNS,
  });

  yield put({
    type: CLEAR_GOAL,
  });

  payload.push('/');
}

const loadingUser = status => ({
  type: LOADING_USER,
  payload: status,
});

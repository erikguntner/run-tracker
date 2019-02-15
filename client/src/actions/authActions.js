import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { AUTH_USER } from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPost = (url, body) => axios.post(url, body);

export function* signin({ type, payload }) {
  try {
    const response = yield call(apiPost, `${server}/signin`, payload);

    console.log(response);

    yield put({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem('token', response.data.token);
  } catch (err) {
    console.log(err);
  }
}

export function* signup({ type, payload }) {
  console.log(payload);

  try {
    const response = yield call(apiPost, `${server}/signup`, payload);

    yield put({
      type: AUTH_USER,
      payload: response.data.token,
    });

    localStorage.setItem('token', response.data.token);
  } catch (err) {
    console.log(err);
  }
}

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: ""
  };
};

import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { AUTH_USER } from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPost = (url, body) => axios.post(url, body);

export function* signin({ type, payload: { values, history } }) {
  try {
    const response = yield call(apiPost, `${server}/signin`, values);

    yield put({
      type: AUTH_USER,
      payload: response.data.token,
    });

    localStorage.setItem('token', response.data.token);

    history.push(`/${response.data.user._id}`);
  } catch (err) {
    console.log(err);
  }
}

export function* signup({ type, payload: { values, history } }) {
  try {
    const response = yield call(apiPost, `${server}/signup`, values);

    yield put({
      type: AUTH_USER,
      payload: response.data.token,
    });

    console.log(response);

    localStorage.setItem('token', response.data.token);
    history.push(`/${response.data.id}`);
  } catch (err) {
    console.log(err);
  }
}

export const signout = history => {
  localStorage.removeItem('token');

  history.push('/');
  return {
    type: AUTH_USER,
    payload: '',
  };
};

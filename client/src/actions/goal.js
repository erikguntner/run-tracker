import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SET_GOAL, SET_GOAL_SUCCESS } from './types';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://pacific-crag-45485.herokuapp.com'
    : 'http://localhost:3090';

const apiPost = (url, body, config = {}) => axios.post(url, body, config);
// const apiGet = (url, config = {}) => axios.get(url, config);

export const setGoal = goal => {
  return { type: SET_GOAL, payload: goal };
};

export function* postNewGoal({ payload }) {
  try {
    const token = localStorage.getItem('token');
    const newGoal = yield call(
      apiPost,
      `${server}/api/goal`,
      { goal: payload },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }
    );

    yield put({
      type: SET_GOAL_SUCCESS,
      payload: newGoal.data.goal,
    });
  } catch (err) {
    console.log(err);
  }
}

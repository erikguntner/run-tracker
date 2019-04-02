import { AUTH_USER, SET_USERNAME } from '../actions/types';

const initialState = {
  authenticated: '',
  username: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        username: action.payload.username,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

import { AUTH_USER, SET_USERNAME, LOADING_USER } from '../actions/types';

const initialState = {
  loadingUser: false,
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
        loadingUser: false,
        username: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loadingUser: action.payload,
      };
    default:
      return state;
  }
};

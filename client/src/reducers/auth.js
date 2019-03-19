import { AUTH_USER } from '../actions/types';

const initialState = {
  authenticated: '',
  username: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      console.log('auth reducer');
      return {
        ...state,
        authenticated: action.payload,
      };
    default:
      return state;
  }
};

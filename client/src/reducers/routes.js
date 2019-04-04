import { ADD_ROUTE, ADD_ALL_ROUTES, CLEAR_ROUTES } from '../actions/types';

const initialState = {
  routes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_ROUTES:
      return {
        routes: [...action.payload],
      };
    case ADD_ROUTE:
      return {
        routes: [...state.routes],
      };
    case CLEAR_ROUTES:
      return {
        routes: [],
      };
    default:
      return state;
  }
};
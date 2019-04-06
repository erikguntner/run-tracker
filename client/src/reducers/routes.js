import {
  ADD_ROUTE,
  ADD_ALL_ROUTES,
  CLEAR_ROUTES,
  LOADING_ROUTES,
} from '../actions/types';

const initialState = {
  loadingRoutes: false,
  routes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_ROUTES:
      return {
        loadingRoutes: false,
        routes: [...action.payload],
      };
    case ADD_ROUTE:
      return {
        routes: [...state.routes],
      };
    case LOADING_ROUTES:
      return {
        ...state,
        loadingRoutes: action.payload,
      };
    case CLEAR_ROUTES:
      return {
        routes: [],
      };
    default:
      return state;
  }
};

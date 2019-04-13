import { LOG_RUN_SUCCESS, GET_WEEKLY_RUNS_SUCCESS } from '../actions/types';

const initialState = {
  thisWeeksRuns: [],
  runs: [],
  loadingRuns: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_RUN_SUCCESS:
      return {
        ...state,
      };
    case GET_WEEKLY_RUNS_SUCCESS:
      console.log('the reducer');
      return {
        ...state,
        thisWeeksRuns: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}

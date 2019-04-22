import {
  LOG_RUN_SUCCESS,
  GET_WEEKLY_RUNS_SUCCESS,
  POPULATE_RUNLOG,
} from '../actions/types';

const initialState = {
  weeklyTotals: {
    totalDistance: 0,
    totalHrs: 0,
    totalMins: 0,
    totalDays: 0,
  },
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
      return {
        ...state,
        thisWeeksRuns: [...action.payload.runlog],
        weeklyTotals: {
          ...action.payload.totals,
        },
      };
    case POPULATE_RUNLOG:
      return {
        ...state,
        runs: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}

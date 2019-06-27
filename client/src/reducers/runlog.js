import {
  LOG_RUN_SUCCESS,
  GET_WEEKLY_RUNS_SUCCESS,
  GET_RUNS_BY_MONTH_SUCCESS,
  POPULATE_RUNLOG,
} from '../actions/types';

const initialState = {
  weeklyTotals: {
    totalDistance: 0,
    totalHrs: 0,
    totalMins: 0,
    totalDays: 0,
    totalSecs: 0,
  },
  thisWeeksRuns: [],
  chartedRuns: [],
  runs: [],
  loadingRuns: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_RUN_SUCCESS:
      return {
        ...state,
        runs: [...state.runs, action.payload],
      };
    case GET_WEEKLY_RUNS_SUCCESS:
      return {
        ...state,
        thisWeeksRuns: [...action.payload.runlog],
        weeklyTotals: {
          ...action.payload.totals,
        },
      };
    case GET_RUNS_BY_MONTH_SUCCESS:
      return {
        ...state,
        chartedRuns: [...action.payload],
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

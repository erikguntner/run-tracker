import { SET_GOAL_SUCCESS, POPULATE_GOAL, CLEAR_GOAL } from '../actions/types';

const initialState = {
  goal: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GOAL_SUCCESS:
      return {
        ...state,
        goal: action.payload,
      };
    case POPULATE_GOAL:
      return {
        ...state,
        goal: action.payload,
      };
    case CLEAR_GOAL:
      return {
        goal: 0,
      };
    default:
      return {
        ...state,
      };
  }
}

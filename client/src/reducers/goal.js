import { SET_GOAL_SUCCESS } from '../actions/types';

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
    default:
      return {
        ...state,
      };
  }
}

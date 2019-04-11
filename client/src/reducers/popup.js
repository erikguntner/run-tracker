import { NOTIFY_SUCCESS, NOTIFY_FAILURE, CLOSE_POPUP } from '../actions/types';

const initialState = {
  open: false,
  message: '',
  status: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_SUCCESS:
      return {
        open: action.payload.open,
        message: action.payload.message,
        status: action.payload.status,
      };
    case NOTIFY_FAILURE:
      return {
        open: action.payload.open,
        message: action.payload.message,
        status: action.payload.status,
      };
    case CLOSE_POPUP:
      return {
        open: false,
        message: '',
        status: '',
      };
    default:
      return {
        ...state,
      };
  }
}

import { UPDATE_VIEWPORT } from '../actions/types';

const initialState = {
  latitude: 34.105999576,
  longitude: -117.718497126,
  zoom: 14,
  bearing: 0,
  pitch: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

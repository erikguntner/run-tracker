import { combineReducers } from 'redux';
import mapReducer from './map';
import auth from './auth';

export default combineReducers({
  map: mapReducer,
  auth,
});

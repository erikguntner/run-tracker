import { combineReducers } from 'redux';
import mapReducer from './map';
import auth from './auth';
import routes from './routes';

export default combineReducers({
  map: mapReducer,
  auth,
  routes,
});

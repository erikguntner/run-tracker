import { combineReducers } from 'redux';
import mapReducer from './map';
import auth from './auth';
import routes from './routes';
import popup from './popup';
import runLog from './runlog';
import goal from './goal';

export default combineReducers({
  map: mapReducer,
  auth,
  routes,
  popup,
  runLog,
  goal,
});

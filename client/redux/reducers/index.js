import { combineReducers } from 'redux';

import auth from './auth';
import charts from './charts';

export default combineReducers({
  auth,
  charts
}); 

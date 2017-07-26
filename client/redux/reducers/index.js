import { combineReducers } from 'redux';

import authenticated from './authenticated';
import fetching from './fetching';
import errorMessage from './errorMessage';
import langData from './langData';
import navData from './navData';
import officeData from './officeData';
import zipData from './zipData';

export default combineReducers({
  authenticated,
  fetching,
  errorMessage,
  langData,
  navData,
  officeData,
  zipData
});

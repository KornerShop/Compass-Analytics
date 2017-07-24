import {
  POPULATE_LANG_DATA,
  POPULATE_OFFICE_DATA,
  POPULATE_ZIP_DATA,
  POPULATE_NAV_DATA,
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.charts, { type, payload }) => {
  switch (type) {
    case POPULATE_LANG_DATA:
      return {
        ...state,
        payload,
      };
    case POPULATE_OFFICE_DATA:
      return {
        ...state,
        payload,
      };
    case POPULATE_NAV_DATA:
      return {
        ...state,
        payload,
      };
    case POPULATE_ZIP_DATA:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

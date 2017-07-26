import {
  POPULATE_NAV_DATA
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.navData, { type, payload }) => {
  switch (type) {
    case POPULATE_NAV_DATA:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

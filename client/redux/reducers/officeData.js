import {
  POPULATE_OFFICE_DATA
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.officeData, { type, payload }) => {
  switch (type) {
    case POPULATE_OFFICE_DATA:
      return payload;
    default:
      return state;
  }
};

import {
  POPULATE_ZIP_DATA
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.zipData, { type, payload }) => {
  switch (type) {
    case POPULATE_ZIP_DATA:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

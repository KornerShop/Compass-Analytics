import {
  POPULATE_LANG_DATA
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.langData, { type, payload }) => {
  switch (type) {
    case POPULATE_LANG_DATA:
      return payload;
    default:
      return state;
  }
};

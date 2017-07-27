import {
  TOGGLE_AUTHENTICATED
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.authenticated, { type, payload }) => {
  switch (type) {
    case TOGGLE_AUTHENTICATED:
      return payload;
    default:
      return state;
  }
};

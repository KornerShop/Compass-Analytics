import {
  TOGGLE_FETCHING
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.fetching, { type, payload }) => {
  switch (type) {
    case TOGGLE_FETCHING:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

import {
  UPDATE_ERROR_MESSAGE
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.errorMessage, { type, payload }) => {
  switch (type) {
    case UPDATE_ERROR_MESSAGE:
      return payload;
    default:
      return state;
  }
};

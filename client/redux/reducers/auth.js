import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_ERROR_MESSAGE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        payload,
      };
    case RESET_ERROR_MESSAGE:
      return {
        ...state,
        payload
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        payload
      }
    default:
      return state;
  }
};

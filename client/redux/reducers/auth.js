import * as types from '../actions/types';
import { auth as initAuthState } from '../initialState';

export default (
  state = initAuthState,
  action,
) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        fetching: action.fetching,
        authenticated: action.authenticated,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        fetching: action.fetching,
        authenticated: action.authenticated,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        fetching: action.fetching,
        authenticate: action.authenticated,
        errorMessage: action.errorMessage,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        fetching: action.fetching,
        authenticated: action.authenticated,
      };
    default:
      return state;
  }
};

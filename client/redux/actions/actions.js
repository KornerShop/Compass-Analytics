import * as types from './types';

export const requestLogin = () => ({
  type: types.LOGIN_REQUEST,
  payload: {
    fetching: true,
    authenticated: false,
  },
});

export const receiveLogin = () => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    fetching: false,
    authenticated: true,
  },
});

export const loginError = errorMessage => ({
  type: types.LOGIN_FAILURE,
  payload: {
    fetching: false,
    authenticated: false,
    errorMessage,
  },
});

export const requestLogout = () => ({
  type: types.LOGOUT_REQUEST,
  payload: {
    fetching: true,
    authenticated: true,
  },
});

export const receiveLogout = () => ({
  type: types.LOGOUT_SUCCESS,
  payload: {
    fetching: false,
    authenticated: false,
  },
});

export const populateLangData = langData => ({
  type: types.POPULATE_LANG_DATA,
  payload: { langData },
});

export const populateOfficeData = officeData => ({
  type: types.POPULATE_OFFICE_DATA,
  payload: { officeData },
});

export const populateNavData = navData => ({
  type: types.POPULATE_NAV_DATA,
  payload: { navData },
});

export const populateZipData = zipData => ({
  type: types.POPULATE_ZIP_DATA,
  payload: { zipData },
});

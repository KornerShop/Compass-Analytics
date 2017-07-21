/* eslint-disable no-console */

import * as types from './types';

import { config } from '../../utilities/fetch';

export const requestLogin = () => ({
  type: types.LOGIN_REQUEST,
  fetching: true,
  authenticated: false,
});

export const receiveLogin = () => ({
  type: types.LOGIN_SUCCESS,
  fetching: false,
  authenticated: true,
});

export const loginError = errorMessage => ({
  type: types.LOGIN_FAILURE,
  fetching: false,
  authenticated: false,
  errorMessage,
});

export const loginUser = ({ username, password }) => async dispatch => {
  dispatch(requestLogin());
  try {
    const response = await fetch('/auth/login', config('POST', {
      username,
      password
    }));
    if (response.status >= 200 && response.status < 300) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      dispatch(receiveLogin());
    } else {
      dispatch(loginError(response.statusText));
    }
  } catch(err) {
    console.error(err)
  }
};

export const requestLogout = () => ({
  type: types.LOGOUT_REQUEST,
  fetching: true,
  authenticated: true,
});

export const receiveLogout = () => ({
  type: types.LOGOUT_SUCCESS,
  fetching: false,
  authenticated: false,
});

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  dispatch(receiveLogout());
};

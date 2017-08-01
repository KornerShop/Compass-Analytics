import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';

import {
  toggleAuthenticated,
  toggleFetching,
  updateErrorMessage,
  populateLangData,
  populateOfficeData,
  populateNavData,
  populateZipData,
} from './actions';

const serverURL =
  process.env.NODE_ENV === 'production'
    ? 'https://compass-analytics.now.sh'
    : 'http://localhost:8080';

const langSocket = io(serverURL);
const officeSocket = io(serverURL);
const navSocket = io(serverURL);
const zipSocket = io(serverURL);

// Need to move localStorage interactions to middleware

const storeToken = token => localStorage.setItem('token', token);

const getToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

export const requestLogin = dispatch => {
  dispatch(toggleFetching(true));
};

export const receiveLogin = dispatch => {
  dispatch(toggleAuthenticated(true));
  dispatch(toggleFetching(false));
  dispatch(updateErrorMessage(''));
};

export const unAuthenticated = dispatch => {
  dispatch(toggleFetching(false));
};

export const loginError = (dispatch, errorMessage) => {
  dispatch(toggleAuthenticated(false));
  dispatch(toggleFetching(false));
  dispatch(updateErrorMessage(errorMessage));
};

export const requestLogout = dispatch => {
  dispatch(toggleFetching(true));
};

export const receiveLogout = dispatch => {
  dispatch(toggleAuthenticated(false));
  dispatch(toggleFetching(false));
};

export const updateLangData = (dispatch, langData) =>
  dispatch(populateLangData(langData));

export const updateOfficeData = (dispatch, officeData) =>
  dispatch(populateOfficeData(officeData));

export const updateNavData = (dispatch, navData) =>
  dispatch(populateNavData(navData));

export const updateZipData = (dispatch, zipData) =>
  dispatch(populateZipData(zipData));

export const loginUser = ({
  username,
  password,
}) => async dispatch => {
  requestLogin(dispatch);
  try {
    const response = await fetch(`${serverURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.status >= 200 && response.status < 300) {
      const { token } = await response.json();
      storeToken(token);
      receiveLogin(dispatch);
    } else {
      const { errorMessage } = await response.json();
      loginError(dispatch, errorMessage);
    }
  } catch (err) {
    console.error(err);
  }
};

export const verifyToken = () => async dispatch => {
  requestLogin(dispatch);
  const token = getToken();
  if (token) {
    try {
      const response = await fetch(`${serverURL}/users/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const { token: newToken } = await response.json();
        storeToken(newToken);
        return receiveLogin(dispatch);
      }
      const { errorMessage } = await response.json();
      return loginError(dispatch, errorMessage);
    } catch (err) {
      console.error(err);
    }
  }
  return unAuthenticated(dispatch);
};

export const logoutUser = () => dispatch => {
  requestLogout(dispatch);
  removeToken();
  receiveLogout(dispatch);
};

export const listenForChartData = () => dispatch => {
  langSocket.on('populate-lang-data', langData =>
    updateLangData(dispatch, langData),
  );
  officeSocket.on('populate-office-data', officeData =>
    updateOfficeData(dispatch, officeData),
  );
  navSocket.on('populate-nav-data', navData =>
    updateNavData(dispatch, navData),
  );
  zipSocket.on('populate-zip-data', zipData =>
    updateZipData(dispatch, zipData),
  );
};

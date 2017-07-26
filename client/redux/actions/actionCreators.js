import {
  toggleAuthenticated,
  toggleFetching,
  updateErrorMessage,
  populateLangData,
  populateOfficeData,
  populateNavData,
  populateZipData,
} from './actions';

export const requestLogin = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  fetching === false && dispatch(toggleFetching(true));
  authenticated === true && dispatch(toggleAuthenticated(false));
};

export const receiveLogin = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  fetching === true && dispatch(toggleFetching(false));
  authenticated === false && dispatch(toggleAuthenticated(true));
};

export const loginError = (dispatch, getState, errorMessage) => {
  const { fetching, authenticated } = getState();
  fetching === true && dispatch(toggleFetching(false));
  authenticated === true && dispatch(toggleAuthenticated(false));
  dispatch(updateErrorMessage(errorMessage));
};

export const requestLogout = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  fetching === false && dispatch(toggleFetching(true));
  authenticated === false && dispatch(toggleAuthenticated(true));
};

export const receiveLogout = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  fetching == true && dispatch(toggleFetching(false));
  authenticated === true && dispatch(toggleAuthenticated(false));
};

export const populateLangData = (dispatch, langData) =>
  dispatch(populateLangData(langData));

export const populateOfficeData = (dispatch, officeData) =>
  dispatch(populateOfficeData(officeData));

export const populateNavData = (dispatch, navData) =>
  dispatch(populateNavData(navData));

export const populateZipData = (dispatch, zipData) =>
  dispatch(populateZipData(zipData));

export const loginUser = ({ username, password }) => async (
  dispatch,
  getState,
) => {
  requestLogin(dispatch, getState);
  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.status >= 200 && response.status < 300) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      receiveLogin(dispatch, getState);
    } else {
      loginError(dispatch, getState, 'Wrong credentials');
    }
  } catch (err) {
    console.error(err);
  }
};

export const verifyToken = () => async (dispatch, getState) => {
  requestLogin(dispatch, getState);
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('/users/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const { token: { newToken } } = await response.json();
        localStorage.setItem('token', newToken);
        dispatch(receiveLogin());
        receiveLogin(dispatch, getState);
      } else {
        loginError(dispatch, getState, response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }
  loginError(dispatch, getState, 'No token found');
};

export const logoutUser = () => (dispatch, getState) => {
  requestLogout(dispatch, getState);
  localStorage.removeItem('token');
  receiveLogout(dispatch, getState);
};

export const listenForChartData = socket => dispatch => {
  socket.on('populate-lang-data', langData =>
    populateLangData(dispatch, langData),
  );
  socket.on('populate-office-data', officeData =>
    populateOfficeData(dispatch, officeData),
  );
  socket.on('populate-Nav-data', navData =>
    populateNavData(dispatch, navData),
  );
  socket.on('populate-zip-data', zipData =>
    populateOfficeData(dispatch, zipData),
  );
};

export const resetErrorMessage = () => dispatch => dispatch();

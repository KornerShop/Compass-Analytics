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
  authenticated === false && dispatch(toggleAuthenticated(true));
  fetching === true && dispatch(toggleFetching(false));
};

export const loginError = (dispatch, getState, errorMessage) => {
  const { fetching, authenticated } = getState();
  fetching === true && dispatch(toggleFetching(false));
  authenticated === true && dispatch(toggleAuthenticated(false));
  errorMessage && dispatch(updateErrorMessage(errorMessage));
};

export const requestLogout = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  fetching === false && dispatch(toggleFetching(true));
  authenticated === false && dispatch(toggleAuthenticated(true));
};

export const receiveLogout = (dispatch, getState) => {
  const { fetching, authenticated } = getState();
  authenticated === true && dispatch(toggleAuthenticated(false));
  fetching == true && dispatch(toggleFetching(false));
};

export const updateLangData = (dispatch, langData) =>
  dispatch(populateLangData(langData));

export const updateOfficeData = (dispatch, officeData) =>
  dispatch(populateOfficeData(officeData));

export const updateNavData = (dispatch, navData) =>
  dispatch(populateNavData(navData));

export const updateZipData = (dispatch, zipData) =>
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
        const { token: newToken } = await response.json();
        localStorage.setItem('token', newToken);
        return receiveLogin(dispatch, getState);
      }
      return loginError(dispatch, getState, response.statusText);
    } catch (err) {
      console.error(err);
    }
  }
  return loginError(dispatch, getState);
};

export const logoutUser = () => (dispatch, getState) => {
  requestLogout(dispatch, getState);
  localStorage.removeItem('token');
  receiveLogout(dispatch, getState);
};

export const listenForChartData = socket => dispatch => {
  socket.on('populate-lang-data', langData =>
    updateLangData(dispatch, langData),
  );
  socket.on('populate-office-data', officeData =>
    updateOfficeData(dispatch, officeData),
  );
  socket.on('populate-nav-data', navData =>
    updateNavData(dispatch, navData),
  );
  socket.on('populate-zip-data', zipData =>
    updateZipData(dispatch, zipData),
  );
};

export const resetErrorMessage = () => dispatch =>
  dispatch(updateErrorMessage(''));

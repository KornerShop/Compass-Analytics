import {
  requestLogin,
  receiveLogin,
  loginError,
  requestLogout,
  receiveLogout,
  populateLangData,
  populateOfficeData,
  populateNavData,
  populateZipData,
} from './actions';

export const loginUser = ({
  username,
  password,
}) => async dispatch => {
  dispatch(requestLogin());
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
      this.setState(this.receiveLogin);
      dispatch(receiveLogin());
    } else {
      this.setState(this.loginError('Wrong credentials'));
      dispatch(loginError('Wrong credentials'));
    }
  } catch (err) {
    console.error(err);
  }
};

export const verifyToken = () => async dispatch => {
  dispatch(requestLogin());
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
        return dispatch(receiveLogin());
      }
      return dispatch(loginError(response.statusText));
    } catch (err) {
      console.error(err);
    }
  }
  dispatch(loginError('No token found'));
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  dispatch(receiveLogout);
};

export const listenForChartData = socket => dispatch => {
  socket.on('populate-lang-data', langData => {
    dispatch(populateLangData(langData));
  });
  socket.on('populate-office-data', officeData => {
    dispatch(populateOfficeData(officeData));
  });
  socket.on('populate-Nav-data', navData => {
    dispatch(populateNavData(navData));
  });
  socket.on('populate-zip-data', zipData => {
    dispatch(populateOfficeData(zipData));
  });
};

export const resetErrorMessage = () => dispatch => dispatch()

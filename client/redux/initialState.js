export default {
  auth: {
    authenticated: localStorage.getItem('token'),
    fetching: false,
    errorMessage: '',
  },
};
